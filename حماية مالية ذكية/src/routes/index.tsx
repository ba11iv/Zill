import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sun,
  Moon,
  Brain,
  ShieldAlert,
  Sparkles,
  Gauge,
  Smartphone,
  BarChart3,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { BrandMark } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { applyTheme, getStoredPref, resolveTheme, type ThemePref } from "@/lib/theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ظل — رفيقك الذكي للحماية المالية" },
      { name: "description", content: "ظل: منصة الحماية المالية الذكية من بنك الإنماء." },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    icon: Brain,
    title: "التحليل الذكي للعمليات",
    desc: "يقوم بتحليل كل عملية مالية قبل تنفيذها واكتشاف أي سلوك غير طبيعي.",
  },
  {
    icon: ShieldAlert,
    title: "اكتشاف الاحتيال الفوري",
    desc: "يكشف الروابط والرسائل والتحويلات المشبوهة لحظيًا باستخدام الذكاء الاصطناعي.",
  },
  {
    icon: Sparkles,
    title: "ظل المساعد الذكي",
    desc: "مساعد ذكي يشرح للمستخدم سبب تصنيف العملية ويقدم توصيات للحماية.",
  },
  {
    icon: Gauge,
    title: "تقييم درجة الخطورة",
    desc: "إعطاء نسبة خطورة واضحة مع توضيح أسباب القرار.",
  },
  {
    icon: Smartphone,
    title: "الأجهزة الموثوقة",
    desc: "إدارة الأجهزة المصرح لها ومنع تسجيل الدخول من الأجهزة المشبوهة.",
  },
  {
    icon: BarChart3,
    title: "التقارير والإحصائيات",
    desc: "عرض مستوى الحماية، العمليات المحمية، والمحاولات التي تم إيقافها.",
  },
];

const visionPoints = [
  "رفع مستوى الأمن السيبراني المالي",
  "تعزيز التحول الرقمي في القطاع البنكي",
  "حماية المستخدمين من الاحتيال المالي",
];

function LandingPage() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLang();
  const [theme, setTheme] = useState<ThemePref>(() => getStoredPref());
  const [isLeaving, setIsLeaving] = useState(false);
  const resolved = resolveTheme(theme);

  const handleStart = () => {
    setIsLeaving(true);
    setTimeout(() => navigate({ to: "/login" }), 420);
  };
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");
  const toggleTheme = () => {
    const next = resolved === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  return (
    <div
      className={`relative w-full overflow-x-hidden bg-hero text-foreground transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isLeaving ? "opacity-0 -translate-y-5 scale-[0.98]" : "opacity-100 translate-y-0 scale-100"
      }`}
      style={{
        minHeight: "100dvh",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Top controls */}
      <div className="absolute top-4 end-4 z-20 flex items-center gap-2">
        <button
          onClick={toggleLang}
          className="flex h-9 items-center justify-center rounded-full border border-white/15 bg-white/10 px-3 text-[11px] font-bold text-white shadow-soft backdrop-blur-md transition-all active:scale-95"
        >
          {lang === "ar" ? "EN" : "AR"}
        </button>
        <button
          onClick={toggleTheme}
          aria-label={t("تبديل المظهر")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-soft backdrop-blur-md transition-all active:scale-95"
        >
          {resolved === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* ==================== HERO ==================== */}
      <section className="relative flex flex-col items-center px-6 pt-24 pb-14 text-center">
        <div
          className="pointer-events-none absolute -top-24 start-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,166,81,0.35), transparent 65%)" }}
        />

        <div className="relative animate-welcome-logo">
          <span
            className="absolute inset-0 rounded-3xl animate-pulse-ring"
            style={{ background: "rgba(0,166,81,0.25)" }}
          />
          <BrandMark size={92} />
        </div>

        <div className="mt-6 text-[10px] font-medium tracking-[0.32em] text-white/45">
          بنك الإنماء
        </div>
        <h1 className="animate-welcome-text mt-2 text-[46px] font-black leading-none tracking-tight text-white">
          ظِـل
        </h1>

        <h2
          className="animate-welcome-text mt-6 max-w-[300px] text-[24px] font-black leading-tight text-white"
          style={{ animationDelay: "160ms" }}
        >
          رفيقك الذكي <span style={{ color: "#6BBE45" }}>للحماية المالية</span>
        </h2>

        <p
          className="animate-welcome-text mt-4 max-w-[320px] text-[13px] leading-relaxed text-white/65"
          style={{ animationDelay: "300ms" }}
        >
          يراقب ظل عملياتك المالية ويكشف محاولات الاحتيال قبل تنفيذها باستخدام
          الذكاء الاصطناعي، ليمنحك طبقة حماية ذكية في كل لحظة.
        </p>

        <button
          onClick={handleStart}
          disabled={isLeaving}
          className="animate-welcome-button mt-8 flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-[15px] font-bold text-primary-foreground shadow-glow-gold transition-all active:scale-[0.97] disabled:opacity-80 disabled:scale-[0.98]"
          style={{ animationDelay: "480ms" }}
        >
          ابدأ الآن
          <ArrowLeft size={18} />
        </button>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="relative px-5 pt-6 pb-10">
        <div className="mb-6 text-center">
          <div className="text-[10.5px] font-bold tracking-[0.28em] text-primary/90">
            المميزات
          </div>
          <h3 className="mt-2 text-[24px] font-black text-white">
            مميزات منصة ظل
          </h3>
          <p className="mx-auto mt-2 max-w-[290px] text-[12px] leading-relaxed text-white/55">
            تقنيات ذكاء اصطناعي متقدمة تعمل خلف الكواليس لحماية كل عملية مالية.
          </p>
        </div>

        <div className="grid gap-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl p-4"
              style={{
                background: "rgba(19,48,76,0.72)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 6px 22px rgba(0,0,0,0.20)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    background: "rgba(0,166,81,0.14)",
                    border: "1px solid rgba(0,166,81,0.28)",
                    color: "#6BBE45",
                  }}
                >
                  <f.icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-bold text-white">{f.title}</div>
                  <div className="mt-1 text-[12px] leading-relaxed text-white/60">
                    {f.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== VISION 2030 ==================== */}
      <section className="relative px-5 pt-4 pb-10">
        <div
          className="relative overflow-hidden rounded-3xl p-6"
          style={{
            background:
              "linear-gradient(135deg, #00A651 0%, #00843D 55%, #006B31 100%)",
            boxShadow: "0 20px 40px -12px rgba(0,166,81,0.45)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-16 -end-16 h-56 w-56 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #fff, transparent 65%)" }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
              رؤية المملكة 2030
            </div>

            <h3 className="mt-4 text-[22px] font-black leading-tight text-white">
              متوافق مع مستهدفات رؤية 2030
            </h3>

            <p className="mt-3 text-[12.5px] leading-relaxed text-white/85">
              يساهم ظل في رفع مستوى الأمن المالي والتحول الرقمي من خلال تقنيات
              الذكاء الاصطناعي لحماية المستخدمين وتقليل عمليات الاحتيال المالي.
            </p>

            <div className="mt-5 space-y-2.5">
              {visionPoints.map((p, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="shrink-0 text-white" />
                  <span className="text-[12.5px] font-semibold text-white">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="relative px-6 pt-4 pb-14 text-center">
        <div
          className="pointer-events-none absolute bottom-0 start-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0,166,81,0.5), transparent 65%)" }}
        />

        <div className="relative">
          <h3 className="mx-auto max-w-[300px] text-[26px] font-black leading-tight text-white">
            جاهز لحماية معاملاتك المالية؟
          </h3>
          <p className="mx-auto mt-4 max-w-[300px] text-[13px] leading-relaxed text-white/60">
            ابدأ باستخدام ظل واجعل جميع عملياتك المالية تمر عبر طبقة حماية ذكية
            قبل التنفيذ.
          </p>

          <button
            onClick={handleStart}
            disabled={isLeaving}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-[15px] font-bold text-primary-foreground shadow-glow-gold transition-all active:scale-[0.97] disabled:opacity-80 disabled:scale-[0.98]"
          >
            ابدأ الآن
            <ArrowLeft size={18} />
          </button>

          <div className="mt-8 text-[10px] font-medium tracking-[0.28em] text-white/35">
            مدعوم من بنك الإنماء
          </div>
        </div>
      </section>
    </div>
  );
}
