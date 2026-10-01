import type { Method } from "axios";

/**
 * ตัวกลางเรียก Backend API ด้วย axios
 *
 * TODO ขั้นที่ 5: แทนที่ทั้งไฟล์ตาม README
 *   5.1 สร้าง axios instance `http` + request interceptor แนบ Authorization: Bearer <token>
 *   5.2 เขียนฟังก์ชัน api() — แกะ { success, data } และแปลง error เป็น ApiError
 *
 */
export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v3";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(
  path: string,
  options: { method?: Method; body?: unknown; auth?: boolean } = {},
): Promise<T> {
  throw new ApiError(
    0,
    `TODO ขั้นที่ 5: ยังไม่ได้เขียน api() (${options.method ?? "GET"} ${API_URL}${path})`,
  );
}
