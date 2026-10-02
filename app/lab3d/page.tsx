import Link from "next/link";
import PortraitLab from "@/components/PortraitLab";
import "./style.css";

export default function Lab3D() {
  return (
    <main className="portrait-lab">
      <header className="lab-nav"><Link href="/">← Về portfolio</Link><span>CHAOS / PORTRAIT STUDY 01</span></header>
      <section className="lab-intro"><p>THỬ NGHIỆM TỪ AVATAR</p><h1>Cùng một gương mặt.<br /><em>Thêm một chiều.</em></h1><p>Kéo để xoay nhẹ. Chuyển sang “Xem khối” để xem chiều sâu của khuôn mặt, tóc và áo.</p></section>
      <PortraitLab />
      <p className="lab-note">Bản thử dạng phù điêu: chiều sâu được ước lượng từ một ảnh chính diện. Góc xoay giới hạn ±30°; chưa có mặt sau hay các chi tiết bị khuất của nhân vật.</p>
    </main>
  );
}
