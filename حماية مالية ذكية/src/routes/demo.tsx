import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  MessageSquareWarning,
  Upload,
  Sparkles,
  ShieldOff,
  LinkIcon,
  ArrowLeftRight,
  Cpu,
  ShieldCheck,
  Info,
  Check,
  X,
  PartyPopper,
  Play,
  Pause,
  ChevronLeft,
} from "lucide-react";
import { BrandMark } from "@/components/AppShell";
import { GlassCard, RingScore, Chip, PrimaryButton, RiskBar } from "@/components/kit";

export const Route = createFileRoute("/demo")({
  head: () => ({ meta: [{ title: "تشغيل المحاكاة — ظل" }] }),
  component: DemoPage,
});

type Step = {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  tone: "info" | "warning" | "danger" | "success";
  render: () => React.ReactNode;
};

function DemoPage() {
  const nav = useNavigate();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);

  const steps = useMemo<Step[]>(
    () => [
      {
        title: "١. وصول رسالة احتيالية",
        subtitle: "من رقم غير معروف يدّعي أنه من بنك الإنماء",
        icon: MessageSquareWarning,
        tone: "warning",
        render: () => (
          <MessageBubble
            sender="+٩٦٦ ٥٥٥ ٧٢١ ٤٤٠"
            time="٢:٤١ ص"
            text="عزيزي عميل بنك الإنماء، تم تسجيل عملية غير مصرح بها. لإلغائها فورًا: https://alinma-verify.xyz/secure وأدخل رمز OTP الذي سيصلك."
          />
        ),
      },
      {
        title: "٢. المستخدم يرفع Screenshot",
        subtitle: "لفحص الرسالة داخل ظل",
        icon: Upload,
        tone: "info",
        render: () => (
          <div
            className="flex flex-col items-center justify-center rounded-3xl px-6 py-8"
            style={{ background: "rgba(255,255,255,0.04)", border: "1.5px dashed rgba(255,255,255,0.18)" }}
          >
            <Upload className="h-8 w-8 text-white/50" />
            <div className="mt-3 text-[12.5px] font-semibold text-white/80">screenshot_2026-06-14.png</div>
            <div className="mt-1 text-[10.5px] text-white/45">١٫٢ ميجابايت — تم الرفع</div>
          </div>
        ),
      },
      {
        title: "٣. الذكاء الاصطناعي يحلّل",
        subtitle: "قراءة بصرية + مقارنة مع أنماط الاحتيال",
        icon: Sparkles,
        tone: "info",
        render: () => (
          <div className="flex items-center justify-center py-6">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "rgba(0,166,81,0.35)" }} />
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(135deg, #00A651, #00843D)" }}
              >
                <Cpu className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "٤. اكتشاف انتحال بنك",
        subtitle: "٥ إشارات احتيال في رسالة واحدة",
        icon: ShieldOff,
        tone: "danger",
        render: () => (
          <div className="space-y-2">
            {["انتحال جهة رسمية", "طلب OTP", "أسلوب استعجال", "رابط مشبوه", "طلب تحويل"].map((s, k) => (
              <div key={s} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "rgba(248,113,113,0.10)", border: "1px solid rgba(248,113,113,0.28)" }}>
                <X className="h-3.5 w-3.5" style={{ color: "#F87171" }} />
                <span className="text-[12px] text-white/85">{s}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "٥. المستخدم يفحص الرابط",
        subtitle: "قبل الضغط عليه",
        icon: LinkIcon,
        tone: "info",
        render: () => (
          <div className="rounded-2xl p-3.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-[10.5px] text-white/50">الرابط قيد الفحص</div>
            <div dir="ltr" className="mt-1 truncate font-mono text-[12px] text-white/90">alinma-verify.xyz/secure</div>
          </div>
        ),
      },
      {
        title: "٦. رابط تصيّد",
        subtitle: "نطاق عمره ٣ أيام يحاكي اسم البنك",
        icon: ShieldOff,
        tone: "danger",
        render: () => (
          <div className="flex items-center justify-between rounded-2xl p-4" style={{ background: "rgba(220,38,38,0.14)", border: "1px solid rgba(248,113,113,0.35)" }}>
            <div>
              <Chip tone="danger">احتيالي</Chip>
              <div className="mt-2 text-[12.5px] font-bold text-white">درجة الخطورة</div>
            </div>
            <RingScore value={96} color="#F87171" size={80} thickness={7} />
          </div>
        ),
      },
      {
        title: "٧. محاولة تحويل ٥٠٬٠٠٠ ريال",
        subtitle: "من جهاز جديد إلى مستفيد جديد",
        icon: ArrowLeftRight,
        tone: "warning",
        render: () => (
          <div className="rounded-2xl p-4" style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(251,191,36,0.28)" }}>
            <div className="text-[10.5px] text-white/55">تحويل جاري</div>
            <div className="mt-1 arabic-num text-[26px] font-black text-white">٥٠٬٠٠٠ <span className="text-[13px] text-white/60">ريال</span></div>
            <div className="mt-1 text-[11px] text-white/60">إلى عبدالرحمن ن. — ٢:٤٣ فجراً</div>
          </div>
        ),
      },
      {
        title: "٨. التوأم المالي يحلل",
        subtitle: "مقارنة مع سلوكك المعتاد",
        icon: Sparkles,
        tone: "info",
        render: () => (
          <div className="space-y-2.5">
            {[
              { l: "الجهاز", v: 92 },
              { l: "المستفيد", v: 88 },
              { l: "المبلغ", v: 95 },
              { l: "الوقت", v: 78 },
            ].map((r) => (
              <div key={r.l}>
                <div className="mb-1 flex justify-between text-[11px] text-white/60">
                  <span>{r.l}</span>
                  <span className="arabic-num font-semibold text-white">{r.v}%</span>
                </div>
                <RiskBar value={r.v} tone="danger" />
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "٩. درجة خطورة ٩٧٪",
        subtitle: "خارج نمطك المصرفي بشكل كبير",
        icon: ShieldOff,
        tone: "danger",
        render: () => (
          <div className="flex items-center justify-center py-4">
            <RingScore value={97} color="#F87171" size={148} thickness={12} label="خطر مرتفع" />
          </div>
        ),
      },
      {
        title: "١٠. إيقاف العملية مؤقتًا",
        subtitle: "لن يتم إرسال المبلغ قبل التحقق",
        icon: ShieldOff,
        tone: "danger",
        render: () => (
          <div className="flex items-center gap-3 rounded-2xl p-4" style={{ background: "rgba(220,38,38,0.14)", border: "1px solid rgba(248,113,113,0.35)" }}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg, #DC2626, #991B1B)" }}>
              <ShieldOff className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-[13.5px] font-bold text-white">تم تجميد التحويل</div>
              <div className="text-[11px] text-white/70">بانتظار التحقق البيومتري من المستخدم</div>
            </div>
          </div>
        ),
      },
      {
        title: "١١. شرح القرار للمستخدم",
        subtitle: "Explainable AI — شفافية كاملة",
        icon: Info,
        tone: "info",
        render: () => (
          <div className="space-y-2">
            {[
              { t: "جهاز جديد غير موثوق", w: 22 },
              { t: "مستفيد جديد", w: 20 },
              { t: "مبلغ أعلى من المعتاد", w: 30 },
              { t: "وقت غير معتاد", w: 25 },
            ].map((r) => (
              <div key={r.t} className="flex items-center justify-between rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-[12px] text-white/80">{r.t}</span>
                <span className="arabic-num text-[11px] font-bold" style={{ color: "#F87171" }}>+{r.w}%</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "١٢. حماية أموالك بنجاح",
        subtitle: "تم منع محاولة احتيال محتملة",
        icon: PartyPopper,
        tone: "success",
        render: () => (
          <div className="flex flex-col items-center py-4">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)", boxShadow: "0 12px 32px -12px rgba(34,197,94,0.6)" }}
            >
              <Check className="h-10 w-10 text-white" strokeWidth={3} />
            </div>
            <div className="mt-4 text-center text-[14px] font-black text-white">
              🎉 تم منع محاولة احتيال محتملة
              <br />وحماية أموالك بنجاح
            </div>
            <Chip tone="success" icon={<ShieldCheck className="h-3 w-3" />}>
              <span className="mt-1">ظل يحميك دائمًا</span>
            </Chip>
          </div>
        ),
      },
    ],
    [],
  );

  useEffect(() => {
    if (!playing) return;
    if (i >= steps.length - 1) return;
    const t = setTimeout(() => setI((v) => v + 1), 2200);
    return () => clearTimeout(t);
  }, [i, playing, steps.length]);

  const current = steps[i];
  const progress = ((i + 1) / steps.length) * 100;

  return (
    <div
      
      className="relative flex w-full flex-col overflow-hidden bg-hero text-white"
      style={{ minHeight: "100dvh", paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full blur-[130px]" style={{ background: "rgba(0,166,81,0.16)" }} />
        <div className="absolute bottom-0 -right-20 h-72 w-72 rounded-full blur-[140px]" style={{ background: "rgba(168,85,247,0.14)" }} />
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-5">
        <div className="flex items-center justify-between pt-5">
          <Link
            to="/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
          >
            <ChevronLeft className="h-4 w-4 rotate-180 text-white/70" />
          </Link>
          <div className="flex items-center gap-2">
            <BrandMark size={30} />
            <div className="text-[13px] font-black text-white">ظل • محاكاة</div>
          </div>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
          >
            {playing ? <Pause className="h-4 w-4 text-white/80" /> : <Play className="h-4 w-4 text-white/80" />}
          </button>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-[10.5px] text-white/55">
            <span className="arabic-num">الخطوة {i + 1} من {steps.length}</span>
            <span className="arabic-num">{Math.round(progress)}٪</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #00A651, #3DBB6A)" }} />
          </div>
        </div>

        {/* Step badge */}
        <div className="mt-6 flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{
              background: current.tone === "danger" ? "rgba(220,38,38,0.20)" : current.tone === "warning" ? "rgba(245,158,11,0.20)" : current.tone === "success" ? "rgba(34,197,94,0.20)" : "rgba(59,130,246,0.20)",
              color: current.tone === "danger" ? "#F87171" : current.tone === "warning" ? "#FBBF24" : current.tone === "success" ? "#4ADE80" : "#60A5FA",
              border: `1px solid ${current.tone === "danger" ? "#F8717155" : current.tone === "warning" ? "#FBBF2455" : current.tone === "success" ? "#4ADE8055" : "#60A5FA55"}`,
            }}
          >
            <current.icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="text-[15px] font-black text-white">{current.title}</div>
            <div className="text-[11px] text-white/55">{current.subtitle}</div>
          </div>
        </div>

        <GlassCard key={i} className="mt-5 p-5 animate-rise">
          {current.render()}
        </GlassCard>

        <div className="mt-auto flex gap-3 pt-6">
          {i === steps.length - 1 ? (
            <PrimaryButton tone="primary" icon={<ShieldCheck className="h-4 w-4" />} onClick={() => nav({ to: "/dashboard" })}>
              العودة إلى الرئيسية
            </PrimaryButton>
          ) : (
            <>
              <button
                onClick={() => setI((v) => Math.min(steps.length - 1, v + 1))}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-[13.5px] font-bold text-white transition active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #00A651 0%, #00843D 100%)", boxShadow: "0 10px 24px -8px rgba(0,166,81,0.5)" }}
              >
                التالي
              </button>
              <button
                onClick={() => setI(0)}
                className="rounded-2xl px-4 py-3.5 text-[12px] font-bold text-white/75"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                إعادة
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ sender, time, text }: { sender: string; time: string; text: string }) {
  return (
    <div className="rounded-2xl p-3.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between text-[10.5px]">
        <span className="arabic-num font-semibold text-white/80">{sender}</span>
        <span className="text-white/40 arabic-num">{time}</span>
      </div>
      <div className="mt-2 text-[12.5px] leading-relaxed text-white/85">{text}</div>
    </div>
  );
}
