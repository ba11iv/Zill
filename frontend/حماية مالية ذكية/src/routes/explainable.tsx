import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Smartphone, MapPin, DollarSign, UserPlus, Activity, ShieldOff, ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";
import { AppShell, NavHeader } from "@/components/AppShell";
import { GlassCard, Section, RingScore, PrimaryButton, Chip } from "@/components/kit";

export const Route = createFileRoute("/explainable")({
  head: () => ({ meta: [{ title: "الذكاء الاصطناعي القابل للتفسير — ظل" }] }),
  component: ExplainablePage,
});

const steps = [
  { icon: Smartphone, title: "الجهاز", detail: "جهاز جديد لم يُستخدم مع الحساب من قبل.", weight: "+22٪", tone: "danger" as const },
  { icon: MapPin, title: "الموقع", detail: "مدينة مختلفة عن مواقع المعاملات الاعتيادية.", weight: "+12٪", tone: "warning" as const },
  { icon: DollarSign, title: "المبلغ", detail: "٥٠٬٠٠٠ ريال — ٢١× متوسطك الشهري.", weight: "+30٪", tone: "danger" as const },
  { icon: UserPlus, title: "المستفيد", detail: "مستفيد جديد لم يسبق التحويل له.", weight: "+20٪", tone: "danger" as const },
  { icon: Activity, title: "السلوك المعتاد", detail: "وقت الفجر — خارج نمط استخدامك.", weight: "+13٪", tone: "warning" as const },
];

function ExplainablePage() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setVisible((v) => (v < steps.length ? v + 1 : v));
    }, 550);
    return () => clearInterval(iv);
  }, []);

  return (
    <AppShell>
      <NavHeader title="قرار الذكاء الاصطناعي" backTo="/twin" />

      <div className="px-5 pt-2">
        <div className="text-[22px] font-black text-white">كيف اتخذ ظل قراره؟</div>
        <div className="mt-1 text-[12px] text-white/55">شفافية كاملة: كل عامل ووزنه في القرار النهائي.</div>
      </div>

      <Section className="!mt-5">
        <GlassCard tone="danger" className="p-5" style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.22) 0%, rgba(11,18,32,0.55) 70%)" }}>
          <div className="flex items-start justify-between">
            <div>
              <Chip tone="danger" icon={<Sparkles className="h-3 w-3" />}>Explainable AI</Chip>
              <div className="mt-3 text-[13px] font-semibold text-white">درجة ثقة النموذج</div>
              <div className="mt-1 text-[11px] text-white/60">تحليل ٥ عوامل خلال ٠٫٤ ثانية</div>
            </div>
            <RingScore value={98} color="#3DBB6A" size={116} thickness={10} label="ثقة عالية" />
          </div>
        </GlassCard>
      </Section>

      <Section title="التسلسل الزمني للقرار">
        <div className="relative pr-4">
          {/* vertical line */}
          <div className="absolute right-4 top-2 bottom-2 w-px" style={{ background: "linear-gradient(180deg, rgba(61,187,106,0.6), rgba(255,255,255,0.06))" }} />
          <div className="space-y-3">
            {steps.map((s, i) => {
              const show = i < visible;
              const color = s.tone === "danger" ? "#F87171" : "#FBBF24";
              return (
                <div
                  key={s.title}
                  className="relative pr-6 transition-all"
                  style={{ opacity: show ? 1 : 0.2, transform: show ? "translateY(0)" : "translateY(6px)" }}
                >
                  <span
                    className="absolute right-[9px] top-4 h-3 w-3 rounded-full"
                    style={{ background: show ? color : "rgba(255,255,255,0.15)", boxShadow: show ? `0 0 12px ${color}88` : "none" }}
                  />
                  <GlassCard className="p-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
                      >
                        <s.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-[13px] font-bold text-white">{s.title}</div>
                          <span className="arabic-num text-[11px] font-bold" style={{ color }}>{s.weight}</span>
                        </div>
                        <div className="mt-0.5 text-[11px] text-white/60">{s.detail}</div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {visible >= steps.length && (
        <Section title="القرار النهائي">
          <GlassCard tone="danger" className="p-5 animate-rise">
            <div className="flex items-start gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)", color: "#fff" }}
              >
                <ShieldOff className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold text-white">إيقاف العملية مؤقتاً</div>
                <div className="mt-1 text-[11.5px] text-white/65">مطلوب تحقق ثنائي من المستخدم قبل إتمام أي تحويل من هذا الجهاز.</div>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <PrimaryButton to="/network" tone="ghost">شبكة ظل</PrimaryButton>
              <PrimaryButton to="/verify" tone="primary" icon={<ShieldCheck className="h-4 w-4" />}>التحقق</PrimaryButton>
            </div>
          </GlassCard>
        </Section>
      )}

      <div className="h-6" />
    </AppShell>
  );
}
