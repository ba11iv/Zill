import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  ScanFace,
  Globe,
  Sun,
  Moon,
  AtSign,
} from "lucide-react";
import { BrandMark } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { applyTheme, getStoredPref, resolveTheme, type ThemePref } from "@/lib/theme";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "ظل — تسجيل الدخول" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { lang, setLang, t } = useLang();
  const [theme, setTheme] = useState<ThemePref>(() => getStoredPref());
  const [showPass, setShowPass] = useState(false);
  const [entered, setEntered] = useState(false);

  const resolved = resolveTheme(theme);

  useEffect(() => {
    applyTheme(theme);
    const timer = setTimeout(() => setEntered(true), 30);
    return () => clearTimeout(timer);
  }, [theme]);

  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");
  const toggleTheme = () => {
    const next = resolved === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  return (
    <div
      className={`relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-hero px-6 text-foreground transition-all duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        entered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.98]"
      }`}
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-20 h-72 w-72 rounded-full blur-[110px]"
          style={{ background: resolved === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,166,81,0.10)" }}
        />
        <div
          className="absolute bottom-0 -left-20 h-56 w-56 rounded-full blur-[110px]"
          style={{ background: resolved === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,166,81,0.07)" }}
        />
      </div>

      {/* Top controls */}
      <div className="absolute top-5 end-5 z-20 flex items-center gap-2 animate-rise">
        <button
          onClick={toggleLang}
          aria-label={t("تغيير اللغة")}
          className="flex h-9 items-center justify-center gap-1 rounded-full border border-border/60 bg-card/60 px-3 text-[11px] font-bold text-foreground shadow-soft backdrop-blur-md transition-all active:scale-95"
        >
          <Globe className="h-3.5 w-3.5" /> {lang === "ar" ? "EN" : "AR"}
        </button>
        <button
          onClick={toggleTheme}
          aria-label={t("تبديل المظهر")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/60 text-foreground shadow-soft backdrop-blur-md transition-all active:scale-95"
        >
          {resolved === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex w-full max-w-[360px] flex-col items-center text-center">
        <div className="animate-welcome-logo">
          <BrandMark size={72} />
        </div>

        <h1
          className="animate-welcome-text mt-5 text-[34px] font-black leading-none tracking-tight text-foreground"
          style={{ animationDelay: "120ms" }}
        >
          {t("ظل")}
        </h1>

        <p
          className="animate-welcome-text mt-3 text-[22px] font-bold leading-tight text-foreground"
          style={{ animationDelay: "220ms" }}
        >
          {t("تسجيل الدخول")}
        </p>

        <p
          className="animate-welcome-text mt-2 max-w-[280px] text-[13px] leading-relaxed text-muted-foreground"
          style={{ animationDelay: "320ms" }}
        >
          {t("أدخل بياناتك للوصول إلى منصة الحماية المالية")}
        </p>

        <form className="animate-welcome-text mt-8 w-full space-y-4 text-start" style={{ animationDelay: "420ms" }}>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">
              {t("اسم المستخدم أو رقم الهوية")}
            </label>
            <div className="glass-input flex items-center gap-3 rounded-2xl px-4 py-3.5">
              <AtSign className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                defaultValue="mohammed.a"
                dir="ltr"
                inputMode="text"
                className="w-full flex-1 bg-transparent text-[15px] font-semibold text-foreground outline-none placeholder:text-muted-foreground/60"
                placeholder={t("اسم المستخدم أو رقم الهوية")}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">
              {t("كلمة المرور")}
            </label>
            <div className="glass-input flex items-center gap-3 rounded-2xl px-4 py-3.5">
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="text-muted-foreground transition active:scale-95"
                aria-label={showPass ? t("إخفاء") : t("إظهار")}
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <input
                type={showPass ? "text" : "password"}
                defaultValue="Alinma@2026"
                dir="ltr"
                className="w-full flex-1 bg-transparent text-[15px] font-semibold tracking-widest text-foreground outline-none placeholder:text-muted-foreground/60"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Link
            to="/dashboard"
            className="animate-welcome-button mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-[15px] font-bold text-primary-foreground shadow-glow-gold transition-all active:scale-[0.98]"
            style={{ animationDelay: "540ms" }}
          >
            <ShieldCheck className="h-4 w-4" />
            {t("تسجيل الدخول")}
          </Link>

          <Link
            to="/dashboard"
            className="animate-welcome-button flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-transparent py-3 text-[14px] font-semibold text-primary transition-all active:scale-[0.98]"
            style={{ animationDelay: "640ms" }}
          >
            <ScanFace className="h-4 w-4" />
            {t("دخول باستخدام Face ID")}
          </Link>
        </form>

        <div
          className="animate-welcome-button mt-6 flex items-center justify-center gap-4 text-[12px]"
          style={{ animationDelay: "720ms" }}
        >
          <button type="button" className="text-muted-foreground transition active:scale-95">
            {t("نسيت كلمة المرور؟")}
          </button>
          <span className="h-4 w-px bg-border" />
          <Link to="/" className="font-semibold text-primary transition active:scale-95">
            {t("فتح حساب جديد")}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 z-10 px-6 text-center text-[10px] text-muted-foreground/70">
        {t("محمي بتشفير AES-256")} • {t("مرخّص من البنك المركزي السعودي (ساما)")}
      </div>
    </div>
  );
}
