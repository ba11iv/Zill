import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Fish, KeyRound, Building2, LinkIcon, AlertTriangle, ChevronLeft } from "lucide-react";
import { AppShell, NavHeader } from "@/components/AppShell";
import { GlassCard, Section, Chip } from "@/components/kit";

export const Route = createFileRoute("/education")({
  head: () => ({ meta: [{ title: "مركز التوعية — ظل" }] }),
  component: EducationPage,
});

const topics = [
  { icon: Fish, title: "كيف تكتشف رسائل التصيّد؟", desc: "٦ علامات لا تخطئ للتفريق بين رسالة رسمية وأخرى احتيالية.", time: "٤ دقائق قراءة", tone: "info", tag: "أساسي" },
  { icon: KeyRound, title: "كيف تحمي رمز OTP؟", desc: "لماذا لا يجب مشاركته مطلقًا حتى مع من يدّعي أنه من البنك؟", time: "٣ دقائق", tone: "warning", tag: "مهم" },
  { icon: Building2, title: "كيف تعرف موظف البنك الحقيقي؟", desc: "الأرقام الرسمية، القنوات المعتمدة، وما لا يفعله البنك أبدًا.", time: "٥ دقائق", tone: "success", tag: "موثوق" },
  { icon: LinkIcon, title: "كيف تتأكد من صحة الروابط؟", desc: "طرق بسيطة لفحص أي رابط قبل الضغط عليه.", time: "٤ دقائق", tone: "info", tag: "مهارة" },
  { icon: AlertTriangle, title: "أحدث طرق الاحتيال في ٢٠٢٦", desc: "الأنماط الجديدة التي رصدها ظل خلال الأسابيع الأخيرة.", time: "٦ دقائق", tone: "danger", tag: "جديد" },
];

function EducationPage() {
  return (
    <AppShell>
      <NavHeader title="مركز التوعية" backTo="/dashboard" />
      <div className="px-5 pt-2">
        <div className="text-[22px] font-black text-white">تعلّم كيف تحمي أموالك</div>
        <div className="mt-1 text-[12px] text-white/55">محتوى قصير وعملي من فريق أمن بنك الإنماء.</div>
      </div>

      <Section className="!mt-5">
        <GlassCard
          className="overflow-hidden p-5"
          style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.22) 0%, rgba(11,18,32,0.6) 70%)" }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: "linear-gradient(135deg, #3B82F6, #60A5FA)", boxShadow: "0 10px 24px -8px rgba(59,130,246,0.5)" }}
            >
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <Chip tone="info">مسار جديد</Chip>
              <div className="mt-2 text-[15px] font-bold text-white">أساسيات الحماية المالية</div>
              <div className="mt-1 text-[11px] text-white/60">٥ دروس قصيرة — أكمل المسار واحصل على شارة الأمان الذهبية.</div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-full" style={{ width: "40%", background: "linear-gradient(90deg, #3B82F6, #60A5FA)" }} />
              </div>
              <div className="mt-1.5 text-[10px] text-white/50 arabic-num">٢ من ٥ دروس مكتملة</div>
            </div>
          </div>
        </GlassCard>
      </Section>

      <Section title="بطاقات التوعية">
        <div className="space-y-3">
          {topics.map((t, i) => {
            const color = { info: "#60A5FA", warning: "#FBBF24", success: "#4ADE80", danger: "#F87171" }[t.tone as "info" | "warning" | "success" | "danger"];
            return (
              <GlassCard key={i} className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                    style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
                  >
                    <t.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-[13.5px] font-bold text-white">{t.title}</div>
                      <Chip tone={t.tone as any}>{t.tag}</Chip>
                    </div>
                    <div className="mt-1 text-[11.5px] leading-relaxed text-white/60">{t.desc}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-white/40">{t.time}</span>
                      <ChevronLeft className="h-4 w-4 text-white/40" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </Section>

      <div className="h-6" />
    </AppShell>
  );
}
