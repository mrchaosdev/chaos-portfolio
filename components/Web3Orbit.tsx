"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Web3Orbit({ paused }: { paused: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "web3-orbit-canvas";
    mount.prepend(renderer.domElement);

    const protocol = new THREE.Group();
    scene.add(protocol);

    const coreGeometry = new THREE.IcosahedronGeometry(0.82, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x4c1d95,
      emissive: 0x35106e,
      emissiveIntensity: 1.8,
      metalness: 0.68,
      roughness: 0.25,
      flatShading: true,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    protocol.add(core);

    const shellGeometry = new THREE.IcosahedronGeometry(1.22, 2);
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: 0xb890ff,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    protocol.add(shell);

    const ringMaterials = [0xa879ff, 0x49d6e9, 0x7950f2].map(
      (color) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.62 }),
    );
    const rings = ringMaterials.map((material, index) => {
      const geometry = new THREE.TorusGeometry(1.55 + index * 0.23, 0.012, 8, 180);
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.set(0.45 + index * 0.64, 0.2 + index * 0.5, index * 0.33);
      protocol.add(ring);
      return { ring, geometry };
    });

    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const y = 1 - (index / (particleCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * index;
      const distance = 2.15 + ((index * 17) % 13) / 40;
      particlePositions[index * 3] = Math.cos(theta) * radius * distance;
      particlePositions[index * 3 + 1] = y * distance;
      particlePositions[index * 3 + 2] = Math.sin(theta) * radius * distance;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc7b1ff,
      size: 0.026,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    protocol.add(particles);

    scene.add(new THREE.AmbientLight(0x8b5cf6, 1.4));
    const keyLight = new THREE.PointLight(0x75e8f0, 18, 10);
    keyLight.position.set(2.5, 2, 3);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xb04cff, 22, 10);
    rimLight.position.set(-2.5, -1, 2);
    scene.add(rimLight);

    const pointer = { x: 0, y: 0 };
    const handlePointer = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.6;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.45;
    };
    const resetPointer = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    mount.addEventListener("pointermove", handlePointer);
    mount.addEventListener("pointerleave", resetPointer);

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const render = () => {
      const elapsed = performance.now() * 0.001;
      protocol.rotation.y += (pointer.x - protocol.rotation.y) * 0.035;
      protocol.rotation.x += (-pointer.y - protocol.rotation.x) * 0.035;
      if (!paused && !reducedMotion) {
        core.rotation.x = elapsed * 0.22;
        core.rotation.y = elapsed * 0.34;
        shell.rotation.x = -elapsed * 0.08;
        shell.rotation.y = elapsed * 0.12;
        rings.forEach(({ ring }, index) => {
          ring.rotation.z += 0.0015 + index * 0.0007;
        });
        particles.rotation.y = -elapsed * 0.035;
      }
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", handlePointer);
      mount.removeEventListener("pointerleave", resetPointer);
      coreGeometry.dispose();
      coreMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      rings.forEach(({ geometry }) => geometry.dispose());
      ringMaterials.forEach((material) => material.dispose());
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [paused]);

  return (
    <div className="web3-orbit" ref={mountRef} aria-hidden="true">
      <div className="orbit-corner orbit-corner-top">PROTOCOL GRAPH / LIVE</div>
      <div className="orbit-corner orbit-corner-bottom">POINTER / ROTATE SIGNAL</div>
      <span className="orbit-axis orbit-axis-x" />
      <span className="orbit-axis orbit-axis-y" />
      <div className="orbit-readout"><strong>03</strong><span>CHAIN<br />LAYERS</span></div>
    </div>
  );
}
