import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/lib/types";

type AuthState = {
  token: string | null;
  username: string | null;
  role: User["role"] | null;
  studentId: string | null;
};

type AuthStore = AuthState & {
  setAuth: (token: string) => void;
  clear: () => void;
};

type JwtPayload = {
  username?: string;
  role?: User["role"];
  studentId?: string | null;
  exp?: number; // วินาที (Unix time)
};

const emptyAuth: AuthState = {
  token: null,
  username: null,
  role: null,
  studentId: null,
};

// ถอด payload (ส่วนกลางของ header.payload.signature) — base64url → JSON
function decodeJwt(token: string): JwtPayload | null {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as JwtPayload;
  } catch {
    return null;
  }
}

// token → state ทั้งก้อน (token เสีย/หมดอายุ → ถือว่ายังไม่ Login)
function authFromToken(token: string | null | undefined): AuthState {
  if (!token) return emptyAuth;
  const payload = decodeJwt(token);
  if (!payload) return emptyAuth;
  if (payload.exp && payload.exp * 1000 <= Date.now()) return emptyAuth;
  return {
    token,
    username: payload.username ?? null,
    role: payload.role ?? null,
    studentId: payload.studentId ?? null,
  };
}

// TODO ขั้นที่ 6: ครอบด้วย persist(..., { name, partialize, merge })
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...emptyAuth,
      setAuth: (token) => set(authFromToken(token)), // Login สำเร็จ → ถอด token เป็น state
      clear: () => set(emptyAuth), // Logout / token หมดอายุ
    }),
    {
      name: "lecture18-auth", // key ใน localStorage
      // เขียนลง localStorage แค่ token
      partialize: (state) => ({ token: state.token }),
      // ตอนโหลดกลับ (รีเฟรชหน้า) → ถอดค่าที่เหลือจาก token
      merge: (persisted, current) => ({
        ...current,
        ...authFromToken((persisted as Partial<AuthState> | undefined)?.token),
      }),
    },
  ),
);
