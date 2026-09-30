import { create } from "zustand";

import type { Course, Enrollment, Student, User } from "@/lib/types";

// TODO ขั้นที่ 10.1: type ApiStudent / ApiEnrollment และฟังก์ชันแปลงข้อมูล
//   fromApiStudent / toCourse / fromApiEnrollment

type EnrollmentStore = {
  students: Student[];
  courses: Course[];
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
  /** โหลดข้อมูลจาก Backend (GET 3 endpoint พร้อมกัน) ตาม role ของผู้ใช้ */
  getAll: (role: User["role"], studentId?: string | null) => Promise<void>;
  /** ล้างข้อมูลทั้งหมด (ตอน Logout — กันข้อมูลของ user ก่อนหน้าค้างอยู่) */
  reset: () => void;
  /** POST /courses — throw ApiError ถ้า Backend ไม่รับ */
  addCourse: (course: Course) => Promise<void>;
  /** PUT /courses — แก้ชื่อวิชา/ผู้สอน (courseId แก้ไม่ได้) */
  updateCourse: (course: Course) => Promise<void>;
  /** DELETE /courses — Backend ลบการลงทะเบียนของวิชานี้ให้ด้วย */
  removeCourse: (courseId: string) => Promise<void>;
  /** POST /enrollments — throw ApiError ถ้า Backend ไม่รับ */
  enroll: (studentId: string, courseId: string) => Promise<void>;
};

export const useEnrollmentStore = create<EnrollmentStore>()((set) => ({
  students: [],
  courses: [],
  enrollments: [],
  loading: false,
  error: null,

  // TODO ขั้นที่ 10.1: GET /students, /courses, /enrollments พร้อมกัน (Promise.all) ตาม role
  getAll: async () => {
    set({
      loading: false,
      error: "TODO ขั้นที่ 10.1: ยังไม่ได้เขียน getAll()",
    });
  },

  reset: () =>
    set({
      students: [],
      courses: [],
      enrollments: [],
      loading: false,
      error: null,
    }),

  // TODO ขั้นที่ 12.1: POST /courses → เพิ่มวิชาที่ Backend ตอบกลับลง state
  addCourse: async () => {
    throw new Error("TODO ขั้นที่ 12.1: ยังไม่ได้เขียน addCourse()");
  },

  // TODO ขั้นที่ 12.1: PUT /courses → แทนที่วิชาเดิมใน state
  updateCourse: async () => {
    throw new Error("TODO ขั้นที่ 12.1: ยังไม่ได้เขียน updateCourse()");
  },

  // TODO ขั้นที่ 12.1: DELETE /courses → ตัดวิชา (และ enrollments ของวิชานั้น) ออกจาก state
  removeCourse: async () => {
    throw new Error("TODO ขั้นที่ 12.1: ยังไม่ได้เขียน removeCourse()");
  },

  // TODO ขั้นที่ 11.2: POST /enrollments → เพิ่มการลงทะเบียนที่ Backend ตอบกลับลง state
  enroll: async () => {
    throw new Error("TODO ขั้นที่ 11.2: ยังไม่ได้เขียน enroll()");
  },
}));
