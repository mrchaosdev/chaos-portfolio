"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RotateCcw, MoveHorizontal } from "lucide-react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/** A real, lit human mesh. Hair and cybernetic elements are authored geometry. */
export default function ChaosSculpture({
  dark,
  paused,
}: {
  dark: boolean;
  paused: boolean;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const settings = useRef({ dark, paused });
  const reset = useRef<() => void>(() => {});
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    settings.current = { dark, paused };
  }, [dark, paused]);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      queueMicrotask(() => setStatus("unavailable"));
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0.28, 7.7);
    camera.lookAt(0, 0.05, 0);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.45;
    room.dispose();
    const white = new THREE.DirectionalLight(0xffffff, 1.6);
    white.position.set(-3, 5, 5);
    const rim = new THREE.DirectionalLight(0xa487ff, 2.5);
    rim.position.set(3, 2, -3);
    const cyan = new THREE.PointLight(0x75ffff, 2, 15);
    cyan.position.set(-3, 0.2, 2);
    scene.add(white, rim, cyan, new THREE.AmbientLight(0xc0b9df, 0.25));
    const character = new THREE.Group();
    character.rotation.y = -0.22;
    scene.add(character);
    const porcelain = new THREE.MeshPhysicalMaterial({
      color: 0x9f86d0,
      metalness: 0.12,
      roughness: 0.43,
      clearcoat: 0.3,
      clearcoatRoughness: 0.35,
    });
    const graphite = new THREE.MeshPhysicalMaterial({
      color: 0x242037,
      metalness: 0.58,
      roughness: 0.25,
      clearcoat: 0.7,
    });
    const alloy = new THREE.MeshStandardMaterial({
      color: 0x8c78be,
      metalness: 0.85,
      roughness: 0.24,
    });
    const glow = new THREE.MeshStandardMaterial({
      color: 0x9bffff,
      emissive: 0x49dbff,
      emissiveIntensity: 1.8,
      roughness: 0.22,
    });
    const purple = new THREE.MeshPhysicalMaterial({
      color: 0x7b43ef,
      metalness: 0.5,
      roughness: 0.19,
      clearcoat: 1,
    });
    const geometries: THREE.BufferGeometry[] = [];
    const add = (
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      parent: THREE.Object3D = character,
    ) => {
      geometries.push(geometry);
      const mesh = new THREE.Mesh(geometry, material);
      parent.add(mesh);
      return mesh;
    };
    const tube = (
      points: number[][],
      radius: number,
      material: THREE.Material,
      parent: THREE.Object3D = character,
    ) =>
      add(
        new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(
            points.map((p) => new THREE.Vector3(...p)),
          ),
          48,
          radius,
          10,
          false,
        ),
        material,
        parent,
      );
    // Sculpted locks arch over the crown, then fall around the face.
    for (let i = 0; i < 17; i++) {
      const x = ((i - 8) / 8) * 0.63;
      const crown = Math.sqrt(1 - (x / 0.75) ** 2);
      const points = [
        [x, 0.98 + crown * 0.22, 0.57],
        [x * 1.12, 1.15 + crown * 0.4, 0.25],
        [x * 1.12, 1.12 + crown * 0.38, -0.25],
        [x * 1.17, 0.86 + crown * 0.25, -0.62],
        [x * 1.24, -0.13 + (i % 3) * 0.12, -0.66],
      ];
      const lock = tube(
        points,
        0.074 + (i % 3) * 0.008,
        i % 5 === 0 ? purple : graphite,
      );
      lock.userData.lock = true;
      const ring = add(
        new THREE.TorusGeometry(0.086, 0.015, 6, 14),
        i % 4 === 0 ? glow : alloy,
      );
      ring.position.set(x * 1.2, 0.35 + (i % 4) * 0.16, -0.66);
      ring.rotation.x = Math.PI / 2;
    }
    for (const side of [-1, 1]) {
      for (let i = 0; i < 3; i++) {
        tube(
          [
            [side * 0.54, 1.16 - i * 0.08, 0.22 - i * 0.2],
            [side * 0.72, 1.05, 0.25 - i * 0.21],
            [side * 0.77, 0.48, 0.22 - i * 0.2],
            [side * (0.78 + i * 0.04), -0.13 - i * 0.06, 0.15 - i * 0.21],
          ],
          0.075,
          graphite,
        );
      }
    }
    // Mechanical neck and illuminated seam lines.
    const neck = add(
      new THREE.CylinderGeometry(0.29, 0.39, 0.63, 40),
      graphite,
    );
    neck.position.set(0, -0.54, -0.04);
    for (let i = 0; i < 5; i++) {
      const ring = add(
        new THREE.TorusGeometry(0.32 + i * 0.008, 0.015, 6, 40),
        alloy,
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, -0.32 - i * 0.095, -0.04);
    }
    for (const side of [-1, 1]) {
      tube(
        [
          [side * 0.19, -0.25, 0.21],
          [side * 0.21, -0.49, 0.28],
          [side * 0.26, -0.78, 0.29],
        ],
        0.012,
        glow,
      );
      const ear = add(new THREE.TorusGeometry(0.066, 0.014, 8, 24), alloy);
      ear.position.set(side * 0.59, 0.11, 0.26);
      // A single curved visor follows the face instead of painted-on eyes.
      tube([[side * .49, .58, .62], [side * .6, .57, .3], [side * .62, .55, .08]], .035, graphite);
      for (let i = 0; i < 3; i++) {
        const mark = add(new THREE.BoxGeometry(0.067, 0.017, 0.012), glow);
        mark.position.set(side * 0.43, 0.36 - i * 0.034, 0.62);
        mark.rotation.y = side * 0.42;
      }
    }
    const visorGeometry = new THREE.PlaneGeometry(1.08, .17, 40, 4);
    const visorPosition = visorGeometry.getAttribute('position');
    for (let i = 0; i < visorPosition.count; i++) {
      const x = visorPosition.getX(i);
      visorPosition.setZ(i, .78 - (x / .6) ** 2 * .17);
      visorPosition.setY(i, visorPosition.getY(i) + .57 + Math.abs(x) * .045);
    }
    visorGeometry.computeVertexNormals();
    const visorMaterial = new THREE.MeshPhysicalMaterial({ color: 0x171024, metalness: .74, roughness: .12, clearcoat: 1, side: THREE.DoubleSide });
    add(visorGeometry, visorMaterial);
    const visorEdge = Array.from({ length: 9 }, (_, i) => { const x = (i - 4) / 4 * .54; return [x, .658 + Math.abs(x) * .045, .783 - (x / .6) ** 2 * .17]; });
    tube(visorEdge, .007, alloy);
    for (const side of [-1, 1]) tube([[side * .14, .573, .778], [side * .29, .58, .752], [side * .43, .586, .701]], .008, glow);
    const collar = add(new THREE.TorusGeometry(0.34, 0.045, 10, 48), alloy);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(0, -0.27, -0.02);
    const plinth = add(
      new THREE.CylinderGeometry(0.83, 0.9, 0.13, 64),
      graphite,
      scene,
    );
    plinth.position.set(0, -1.52, 0);
    const rimRing = add(
      new THREE.TorusGeometry(0.83, 0.018, 8, 80),
      glow,
      scene,
    );
    rimRing.rotation.x = Math.PI / 2;
    rimRing.position.set(0, -1.45, 0);
    // An elliptical chrome halo occupies real depth, passing behind the portrait.
    const halo = new THREE.Group();
    halo.rotation.set(0.38, -0.25, -0.28);
    scene.add(halo);
    const orbit = add(
      new THREE.TorusGeometry(1.74, 0.018, 8, 140),
      alloy,
      halo,
    );
    orbit.scale.y = 1.04;
    const orbit2 = add(
      new THREE.TorusGeometry(1.86, 0.009, 6, 140),
      purple,
      halo,
    );
    orbit2.rotation.y = 0.14;
    const satellites = [-0.5, 2.15, 3.9].map((angle, i) => {
      const satellite = add(
        new THREE.SphereGeometry(0.07 + i * 0.015, 20, 16),
        i === 1 ? glow : purple,
        halo,
      );
      satellite.position.set(Math.cos(angle) * 1.74, Math.sin(angle) * 1.74, 0);
      return satellite;
    });
    let disposed = false;
    new GLTFLoader().load(
      "/models/head-study.glb",
      (gltf) => {
        if (disposed) {
          gltf.scene.traverse((object) => {
            if (object instanceof THREE.Mesh) object.geometry.dispose();
          });
          return;
        }
        gltf.scene.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          const geometry = object.geometry.clone();
          geometry.scale(0.34, 0.34, 0.34);
          // Remove the scan's shoulder silhouette; build an intentional bust below.
          const position = geometry.getAttribute("position");
          const indices: number[] = [];
          const source = geometry.index;
          for (let i = 0; i < (source?.count ?? position.count); i += 3) {
            const tri = [0, 1, 2].map((j) =>
              source ? source.getX(i + j) : i + j,
            );
            if (tri.every((index) => position.getY(index) > -0.31))
              indices.push(...tri);
          }
          geometry.setIndex(indices);
          geometry.computeVertexNormals();
          add(geometry, porcelain);
          object.geometry.dispose();
        });
        // Tailored jacket: a smooth shoulder volume, collar and lapels.
        const coat = new THREE.MeshPhysicalMaterial({
          color: 0xe7e2f5,
          roughness: 0.44,
          metalness: 0.08,
          clearcoat: 0.25,
        });
        const torso = add(new THREE.SphereGeometry(1, 56, 40), coat);
        torso.scale.set(1.16, 0.59, 0.43);
        torso.position.set(0, -1.03, -0.07);
        const shirt = add(new THREE.SphereGeometry(1, 36, 24), graphite);
        shirt.scale.set(0.4, 0.51, 0.08);
        shirt.position.set(0, -1.05, 0.37);
        for (const side of [-1, 1]) {
          const shape = new THREE.Shape();
          shape.moveTo(side * 0.33, -0.49);
          shape.lineTo(side * 0.69, -0.86);
          shape.lineTo(side * 0.47, -0.85);
          shape.lineTo(side * 0.63, -1.14);
          shape.lineTo(side * 0.18, -1.55);
          shape.lineTo(side * 0.27, -0.89);
          shape.closePath();
          const lapel = add(
            new THREE.ExtrudeGeometry(shape, {
              depth: 0.035,
              bevelEnabled: true,
              bevelSize: 0.035,
              bevelThickness: 0.025,
              bevelSegments: 3,
              steps: 1,
            }),
            coat,
          );
          lapel.position.z = 0.36;
        }
        setStatus("ready");
      requestRender();
      },
      undefined,
      () => {
        if (!disposed) setStatus("unavailable");
      },
    );

    let targetX = 0,
      targetY = -0.22,
      dragged = false,
      previousX = 0,
      visible = true,
      raf = 0;
    let start = performance.now(),
      lastFrame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerMove = (event: PointerEvent) => {
      if (dragged) {
        targetY += (event.clientX - previousX) * 0.009;
        previousX = event.clientX;
      } else if (!reduced.matches && !settings.current.paused) {
        const rect = host.getBoundingClientRect();
        targetY =
          -0.22 + ((event.clientX - rect.left) / rect.width - 0.5) * 0.5;
        targetX = ((event.clientY - rect.top) / rect.height - 0.5) * 0.13;
      }
      requestRender();
    };
    const down = (event: PointerEvent) => {
      dragged = true;
      previousX = event.clientX;
      host.setPointerCapture(event.pointerId);
    };
    const up = () => {
      dragged = false;
    };
    const leave = () => {
      if (!dragged) {
        targetX = 0;
        targetY = -0.22;
      }
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        targetY += event.key === "ArrowLeft" ? -0.25 : 0.25;
        requestRender();
      }
      if (event.key === "Home") {
        targetY = -0.22;
        targetX = 0;
        requestRender();
      }
    };
    reset.current = () => {
      targetY = -0.22;
      targetX = 0;
      requestRender();
    };
    function render(now: number) {
      raf = 0;
      if (disposed || !visible || document.hidden) return;
      if (now - lastFrame < 1000 / 30) {
        raf = requestAnimationFrame(render);
        return;
      }
      lastFrame = now;
      const animate = !reduced.matches && !settings.current.paused;
      const t = (now - start) / 1000;
      character.rotation.y = THREE.MathUtils.lerp(
        character.rotation.y,
        targetY,
        0.08,
      );
      character.rotation.x = THREE.MathUtils.lerp(
        character.rotation.x,
        targetX,
        0.08,
      );
      character.position.y = animate ? Math.sin(t * 0.8) * 0.035 : 0;
      halo.rotation.z = -0.28 + (animate ? Math.sin(t * 0.2) * 0.06 : 0);
      satellites.forEach((satellite, i) => {
        satellite.scale.setScalar(animate ? 1 + Math.sin(t + i) * 0.08 : 1);
      });
      renderer.toneMappingExposure = settings.current.dark ? 0.85 : 0.95;
      renderer.render(scene, camera);
      if (
        animate ||
        Math.abs(character.rotation.y - targetY) > 0.001 ||
        Math.abs(character.rotation.x - targetX) > 0.001
      )
        raf = requestAnimationFrame(render);
    }
    function requestRender() {
      if (!raf && visible && !document.hidden)
        raf = requestAnimationFrame(render);
    }
    const resize = new ResizeObserver(() => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height);
        camera.aspect = width / Math.max(height, 1);
        camera.position.z = Math.max(7.7, 3.9 / (2 * Math.tan(THREE.MathUtils.degToRad(16)) * camera.aspect));
      camera.updateProjectionMatrix();
      requestRender();
    });
    resize.observe(host);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        start = performance.now();
        requestRender();
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    observer.observe(host);
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else requestRender();
    };
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", requestRender);
    host.addEventListener("pointermove", pointerMove);
    host.addEventListener("pointerdown", down);
    host.addEventListener("pointerup", up);
    host.addEventListener("pointercancel", up);
    host.addEventListener("pointerleave", leave);
    host.addEventListener("keydown", key);
    const settingsObserver = new MutationObserver(requestRender);
    settingsObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-appearance", "data-motion"],
    });
    requestRender();
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resize.disconnect();
      observer.disconnect();
      settingsObserver.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", requestRender);
      host.removeEventListener("pointermove", pointerMove);
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointerup", up);
      host.removeEventListener("pointercancel", up);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("keydown", key);
      geometries.forEach((geometry) => geometry.dispose());
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          const list = Array.isArray(object.material)
            ? object.material
            : [object.material];
          list.forEach((material) => materials.add(material));
        }
      });
      materials.forEach((material) => material.dispose());
      environment.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="sculpture-stage" data-status={status}>
      <div
        ref={mount}
        className="sculpture-canvas"
        tabIndex={0}
        role="img"
        aria-label="Interactive 3D cyberpunk bust. Drag or swipe horizontally, or use left and right arrow keys to rotate. Home resets the view."
      />
      {status === "loading" && (
        <span className="sculpture-loading">ASSEMBLING IDENTITY…</span>
      )}
      {status === "unavailable" && (
        <div className="sculpture-fallback">
          <Image
            src="/chaos-avatar-3d.png"
            alt="Chaosdev avatar"
            fill
            sizes="(max-width: 760px) 70vw, 400px"
          />
          <span>3D view unavailable on this device</span>
        </div>
      )}
      <div className="sculpture-controls">
        <span>
          <MoveHorizontal size={14} /> DRAG TO DISCOVER
        </span>
        <button onClick={() => reset.current()} aria-label="Reset 3D portrait">
          <RotateCcw size={15} />
        </button>
      </div>
    </div>
  );
}
