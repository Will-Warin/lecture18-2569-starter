import { Outlet } from "react-router";
import type { User } from "@/lib/types";

export default function RequireRole({ role }: { role: User["role"] }) {
  // TODO ขั้นที่ 9.3: อ่าน role ปัจจุบันจาก useAuthStore — ไม่ตรงกับ prop role → <Navigate to="/" replace />
  // (ตอนนี้ปล่อยผ่านทุก role — ลบบรรทัด void role ออกเมื่อเขียนเสร็จ)
  void role;
  return <Outlet />;
}
