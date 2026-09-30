import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { ThemeProvider } from "@/components/theme-provider";
import RequireRole from "@/layouts/require-role";
import RootLayout from "@/layouts/root-layout";
import HomePage from "@/pages/home";
import AdminEnrollmentsPage from "@/pages/admin/enrollments";
import AdminCoursesPage from "@/pages/admin/courses";
import LoginPage from "@/pages/login";
import StudentEnrollmentsPage from "@/pages/student/enrollments";

import "./index.css";

const router = createBrowserRouter([
  // หน้า Login อยู่นอก RootLayout (ไม่มี Sidebar) — RootLayout จะพามาที่นี่ถ้ายังไม่ Login
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      // ADMIN: จัดการวิชาเรียน (ครบ GET, POST, PUT, DELETE) / การลงทะเบียน
      {
        path: "admin",
        element: <RequireRole role="ADMIN" />,
        children: [
          { path: "enrollments", element: <AdminEnrollmentsPage /> },
          { path: "courses", element: <AdminCoursesPage /> },
        ],
      },
      // STUDENT: ลงทะเบียนเรียนของตัวเอง (GET, POST /enrollments)
      {
        path: "student",
        element: <RequireRole role="STUDENT" />,
        children: [
          { path: "enrollments", element: <StudentEnrollmentsPage /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
