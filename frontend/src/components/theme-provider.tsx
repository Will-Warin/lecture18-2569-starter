import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  useEffect(() => {
    // ใส่ class "dark"/"light" ทั้งที่ <html> (ตามปกติ ให้ CSS selector ทั้งหมด
    // ที่เขียนไว้แบบ `.dark { ... }` ยังทำงาน) และที่ <body> ด้วย — ไม่ใช่แค่ความสวยงาม:
    // Dialog/DropdownMenu/Select ของ base-ui portal เนื้อหาไปแปะไว้เป็นลูกตรงของ <body>
    // เลย (แยกกิ่งจาก <div id="root">) ถ้า .dark อยู่แค่ที่ <html> เพียวๆ เจอบั๊ก Chromium
    // ที่ custom property อย่าง --popover ที่ inherit ลงมาไกลผ่าน portal จะเพี้ยนกลาย
    // เป็นโปร่งใส (เห็นพื้นหลังทะลุ) พอใส่ class ไว้ที่ <body> ด้วย เท่ากับลดระยะทาง
    // inherit ให้สั้นลง (ประกาศอยู่ที่ parent ตรงของ portal เลย) บั๊กก็หายไป
    const root = window.document.documentElement;
    const body = window.document.body;

    root.classList.remove("light", "dark");
    body.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      body.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
    body.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // localStorage อาจใช้ไม่ได้ (private mode) — ยังสลับธีมของหน้าปัจจุบันได้ตามปกติ
      }
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
