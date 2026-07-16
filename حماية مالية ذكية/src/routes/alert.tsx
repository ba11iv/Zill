import { createFileRoute } from "@tanstack/react-router";
import { LinkIcon, MessageSquareWarning, ShieldOff, UserX, ShieldCheck, MailCheck } from "lucide-react";
import { AppShell, NavHeader } from "@/components/AppShell";
import { GlassCard, Section, Chip } from "@/components/kit";

export const Route = createFileRoute("/alert")({
  head: () => ({ meta: [{ title: "التنبيهات — ظل" }] }),
  component: AlertsPage,
});

const alerts = [
  {
    icon: LinkIcon,
    title: "تم اكتشاف رابط احتيالي",
    detail: "alinma-verify.xyz • حُظر تلقائيًا",
    time: "قبل ٥ دقائق",
    tone: "danger" as const,
    tag: "احتيال",
  },
  {
    icon: MessageSquareWarning,
    title: "تم تحليل رسالة جديدة",
    detail: "من +٩٦٦ ٥٥٥ ٧٢١ ٤٤٠ — درجة خطورة ٩٢٪",
    time: "قبل ٨ دقائق",
    tone: "danger" as const,
    tag: "تصيّد",
  },
  {
    icon: ShieldOff,
    title: "تم إيقاف عملية عالية الخطورة",
    detail: "تحويل ٥٠٬٠٠٠ ريال إلى مستفيد جديد",
    time: "قبل ١٢ دقيقة",
    tone: "danger" as const,
    tag: "تحويل",
  },
  {
    icon: UserX,
    title: "تم اكتشاف مستفيد مشبوه",
    detail: "IBAN مرتبط بـ ٣ بلاغات سابقة",
    time: "قبل ٢٧ دقيقة",
    tone: "warning" as const,
    tag: "مستفيد",
  },
  {
    icon: MailCheck,
    title: "رسالة آمنة تم التحقق منها",
    detail: "إشعار رسمي من بنك الإنماء — تم توثيقها ✓",
    time: "قبل ساعة",
    tone: "success" as const,
    tag: "توثيق",
  },
  {
    icon: ShieldCheck,
    title: "تفعيل جهاز موثوق جديد",
    detail: "iPhone 15 Pro — تمت الإضافة يدويًا",
    time: "أمس",
    tone: "success" as const,
    tag: "جهاز",
  },
];

function AlertsPage() {
  const today = alerts.slice(0, 4);
  const yesterday = alerts.slice(4);
  return (
    <AppShell>
      <NavHeader title="التنبيهات" backTo="/dashboard" trailing={<Chip tone="danger">٣ جديد</Chip>} />
      <div className="px-5 pt-2">
        <div className="text-[22px] font-black text-white">مركز التنبيهات</div>
        <div className="mt-1 text-[12px] text-white/55">كل ما رصده ظل من محاولات وأنشطة تخص حسابك.</div>
      </div>

      <Section title="اليوم">
        <div className="space-y-2.5">
          {today.map((a, i) => <AlertItem key={i} {...a} />)}
        </div>
      </Section>

      <Section title="الأمس">
        <div className="space-y-2.5">
          {yesterday.map((a, i) => <AlertItem key={i} {...a} />)}
        </div>
      </Section>

      <div className="h-6" />
    </AppShell>
  );
}

function AlertItem({ icon: Icon, title, detail, time, tone, tag }: any) {
  const color = { success: "#4ADE80", warning: "#FBBF24", danger: "#F87171" }[tone as "success" | "warning" | "danger"];
  return (
    <GlassCard tone={tone} className="p-3.5">
      <div className="flex items-start gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
          style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="text-[13.5px] font-bold text-white">{title}</div>
            <Chip tone={tone}>{tag}</Chip>
          </div>
          <div className="mt-1 text-[11.5px] text-white/60">{detail}</div>
          <div className="mt-1.5 text-[10px] text-white/40 arabic-num">{time}</div>
        </div>
      </div>
    </GlassCard>
  );
}
