import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageSquareWarning,
  Link as LinkIcon,
  ArrowLeftRight,
  Sparkles,
  Play,
  ShieldCheck,
  ShieldAlert,
  MessageCircleMore,
  MailCheck,
  ChevronLeft,
  TrendingUp,
  Zap,
  Activity,
} from "lucide-react";
import { AppShell, BrandMark, NavHeader } from "@/components/AppShell";
import { QuickCheckSheet } from "@/components/Assistant";
import { GlassCard, Section, RingScore, Chip, Sparkline, Row } from "@/components/kit";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "الرئيسية — ظل" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <AppShell>
      <NavHeader
        title="ظل"
        leading={
          <div className="flex items-center gap-2">
            <BrandMark size={36} />
          </div>
        }
      />

      {/* Greeting */}
      <div className="px-5 pt-2 animate-rise">
        <div className="text-[12px] font-medium text-white/55">صباح الخير 👋</div>
        <div className="mt-0.5 text-[22px] font-black tracking-tight text-white">مرحباً، محمد عبدالله</div>
        <div className="mt-1 text-[11.5px] text-white/45">آخر مزامنة للحماية قبل ٣ دقائق</div>
      </div>

      {/* Live status card */}
      <Section className="!mt-4">
        <GlassCard
          className="p-4"
          style={{
            background: "linear-gradient(135deg, rgba(0,166,81,0.12) 0%, rgba(19,48,76,0.92) 60%)",
            borderColor: "rgba(0,166,81,0.32)",
          }}
        >
          <div className="flex items-start gap-3">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
              <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "rgba(0,166,81,0.35)" }} />
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(135deg,#00A651,#00843D)" }}
              >
                <ShieldCheck className="h-4.5 w-4.5 text-white" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="text-[13.5px] font-bold text-white">حالة الحماية الآن</div>
                <Chip tone="success">آمن</Chip>
              </div>
              <div className="mt-1 text-[11.5px] leading-relaxed text-white/70">
                ظل يراقب رحلتك المالية لحمايتك قبل الاحتيال.
              </div>
              <div className="mt-2 flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-[10.5px] text-white/70"
                style={{ background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <Activity className="h-3 w-3" style={{ color: "#3DBB6A" }} />
                <span>اليوم: منع ظل محاولتَي احتيال، وحلّل ٣ رسائل ورابطًا واحدًا.</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* Scan Now CTA */}
      <Section className="!mt-4">
        <button
          onClick={() => setSheetOpen(true)}
          className="flex w-full items-center justify-between rounded-3xl px-4 py-4 transition active:scale-[0.99]"
          style={{
            background: "linear-gradient(135deg, #00A651 0%, #00843D 100%)",
            boxShadow: "0 12px 32px -10px rgba(0,0,0,0.45)",
            border: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="text-right">
              <div className="text-[14.5px] font-black text-white">افحص الآن</div>
              <div className="text-[11px] text-white/85">رسالة • رابط • تحويل</div>
            </div>
          </div>
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
      </Section>

      <QuickCheckSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />


      {/* Protection score hero card */}
      <Section className="!mt-5">
        <GlassCard
          className="overflow-hidden p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,132,61,0.28) 0%, rgba(11,18,32,0.6) 60%, rgba(11,18,32,0.6) 100%)",
            borderColor: "rgba(61,187,106,0.35)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <Chip tone="success" icon={<ShieldCheck className="h-3 w-3" />}>حمايتك مفعّلة</Chip>
              <div className="mt-3 text-[13px] font-semibold text-white">درجة الحماية</div>
              <div className="mt-1 text-[11px] text-white/60">مؤشر ذكي يقيس مستوى تأمين حسابك الآن</div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <Chip tone="success">جهاز موثوق</Chip>
                <Chip tone="success">2FA مفعّل</Chip>
                <Chip tone="warning">مستفيد جديد قيد المراقبة</Chip>
              </div>
            </div>
            <RingScore value={95} size={116} thickness={10} label="آمن جداً" sublabel="من ١٠٠" />
          </div>

          <div className="mt-4 rounded-2xl p-3" style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="mb-1.5 flex items-center justify-between">
              <div className="text-[11px] font-medium text-white/70">مستوى الحماية آخر ٧ أيام</div>
              <div className="flex items-center gap-1 text-[10.5px] font-semibold text-[#4ADE80]">
                <TrendingUp className="h-3 w-3" /> +٤٪
              </div>
            </div>
            <Sparkline data={[88, 90, 89, 92, 93, 91, 95]} id="proto" />
          </div>
        </GlassCard>
      </Section>

      {/* Demo button */}
      <Section className="!mt-4">
        <Link
          to="/demo"
          className="flex items-center justify-between rounded-3xl p-4 transition active:scale-[0.99]"
          style={{
            background: "linear-gradient(135deg, rgba(147,51,234,0.22) 0%, rgba(0,166,81,0.18) 100%)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 12px 32px -12px rgba(147,51,234,0.35)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{ background: "linear-gradient(135deg, #A855F7 0%, #00A651 100%)", boxShadow: "0 8px 20px -8px rgba(168,85,247,0.55)" }}
            >
              <Play className="h-5 w-5 text-white" fill="#fff" />
            </div>
            <div>
              <div className="text-[13.5px] font-bold text-white">🎬 تشغيل المحاكاة</div>
              <div className="text-[11px] text-white/60">شاهد كيف يمنع ظل عملية احتيال حقيقية</div>
            </div>
          </div>
          <ChevronLeft className="h-4 w-4 text-white/60" />
        </Link>
      </Section>

      {/* Quick actions */}
      <Section title="أدوات ظل السريعة">
        <div className="grid grid-cols-2 gap-3">
          {[
            { to: "/message-analysis", icon: MessageSquareWarning, label: "تحليل رسالة", desc: "افحص رسالة مشبوهة", color: "#F59E0B" },
            { to: "/link-check", icon: LinkIcon, label: "فحص رابط", desc: "تحقق قبل الضغط", color: "#3B82F6" },
            { to: "/transfer", icon: ArrowLeftRight, label: "بدء تحويل", desc: "مع تحليل المخاطر", color: "#00A651" },
            { to: "/twin", icon: Sparkles, label: "التوأم المالي", desc: "سلوكك المصرفي", color: "#A855F7" },
          ].map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="rounded-3xl p-4 transition active:scale-[0.97]"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              }}
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ background: `${a.color}22`, color: a.color, border: `1px solid ${a.color}44` }}
              >
                <a.icon className="h-5 w-5" />
              </div>
              <div className="text-[13px] font-bold text-white">{a.label}</div>
              <div className="mt-0.5 text-[10.5px] text-white/50">{a.desc}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Latest alerts */}
      <Section
        title="آخر التنبيهات"
        action={
          <Link to="/alert" className="flex items-center gap-1 text-[11.5px] font-semibold text-[#3DBB6A]">
            الكل <ChevronLeft className="h-3 w-3" />
          </Link>
        }
      >
        <GlassCard className="px-4">
          <Row
            icon={<MailCheck className="h-4 w-4" />}
            title="تم تحليل رسالة جديدة"
            subtitle="رسالة من +٩٦٦٥٥٠… • قبل ٨ دقائق"
            tone="warning"
            right={<Chip tone="warning">درجة ٦٢٪</Chip>}
          />
          <div className="h-px bg-white/5" />
          <Row
            icon={<LinkIcon className="h-4 w-4" />}
            title="تم اكتشاف رابط احتيالي"
            subtitle="alinma-verify.xyz • حُظر تلقائياً"
            tone="danger"
            right={<Chip tone="danger">محظور</Chip>}
          />
          <div className="h-px bg-white/5" />
          <Row
            icon={<ShieldCheck className="h-4 w-4" />}
            title="تمت مراقبة آخر عملية بنجاح"
            subtitle="تحويل ١٬٢٥٠ ريال لسارة • آمنة"
            tone="success"
            right={<Chip tone="success">آمن</Chip>}
          />
        </GlassCard>
      </Section>

      {/* Smart activity timeline */}
      <Section title="آخر نشاط ذكي">
        <GlassCard className="p-4">
          <div className="relative pr-4">
            <div className="absolute right-[7px] top-2 bottom-2 w-px" style={{ background: "linear-gradient(180deg, rgba(0,166,81,0.5), rgba(255,255,255,0.06))" }} />
            {[
              { color: "#F59E0B", title: "تم تحليل رسالة مشبوهة", time: "قبل ٥ دقائق" },
              { color: "#F87171", title: "تم اكتشاف رابط احتيالي", time: "قبل ١٥ دقيقة" },
              { color: "#3DBB6A", title: "تمت مراقبة آخر عملية بنجاح", time: "قبل ٣٠ دقيقة" },
            ].map((e, i, arr) => (
              <div key={i} className={`relative pr-5 ${i < arr.length - 1 ? "pb-3.5" : ""}`}>
                <span
                  className="absolute right-[1px] top-1.5 h-3 w-3 rounded-full"
                  style={{ background: e.color, boxShadow: `0 0 0 3px rgba(255,255,255,0.03)` }}
                />
                <div className="text-[12.5px] font-semibold text-white">{e.title}</div>
                <div className="mt-0.5 arabic-num text-[10.5px] text-white/50">{e.time}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </Section>

      {/* Stats */}
      <Section title="إحصائيات الحماية">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "رسائل حُلّلت", value: "٣٤٧", icon: MessageCircleMore, color: "#3B82F6" },
            { label: "روابط فُحصت", value: "١٢٢", icon: LinkIcon, color: "#A855F7" },
            { label: "عمليات محمية", value: "٩٦", icon: ShieldCheck, color: "#00A651" },
            { label: "احتيال أُوقف", value: "١٤", icon: ShieldAlert, color: "#DC2626" },
          ].map((s) => (
            <GlassCard key={s.label} className="p-4">
              <div className="flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44` }}
                >
                  <s.icon className="h-4 w-4" />
                </div>
                <div className="arabic-num text-[10px] text-white/40">هذا الشهر</div>
              </div>
              <div className="mt-3 arabic-num text-[24px] font-black leading-none text-white">{s.value}</div>
              <div className="mt-1 text-[11px] text-white/55">{s.label}</div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Education teaser */}
      <Section title="مركز التوعية">
        <Link
          to="/education"
          className="flex items-center justify-between rounded-3xl p-4 transition active:scale-[0.99]"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl"
              style={{ background: "rgba(59,130,246,0.16)", color: "#60A5FA", border: "1px solid rgba(96,165,250,0.28)" }}
            >
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-white">تعلّم كيف تحمي نفسك</div>
              <div className="text-[10.5px] text-white/55">٥ نصائح جديدة هذا الأسبوع</div>
            </div>
          </div>
          <ChevronLeft className="h-4 w-4 text-white/50" />
        </Link>
      </Section>

      <div className="h-6" />
    </AppShell>
  );
}
