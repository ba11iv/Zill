import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Smartphone, MapPin, DollarSign, UserPlus, Activity, X, ShieldCheck, Check, Sparkles } from "lucide-react";
import { AppShell, NavHeader } from "@/components/AppShell";
import { GlassCard, Section, RingScore, PrimaryButton, Chip } from "@/components/kit";

export const Route = createFileRoute("/transfer/analyze")({
  head: () => ({ meta: [{ title: "تحليل العملية — ظل" }] }),
  component: TransferAnalyzePage,
});

const factors = [
  { icon: Smartphone, label: "الجهاز", detail: "تحقق من بصمة الجهاز والنظام" },
  { icon: MapPin, label: "الموقع", detail: "مقارنة الإحداثيات مع مواقعك المعتادة" },
  { icon: DollarSign, label: "المبلغ", detail: "مقارنة مع متوسط تحويلاتك" },
  { icon: UserPlus, label: "المستفيد", detail: "فحص السجل التاريخي مع هذا الحساب" },
  { icon: Activity, label: "النمط المالي", detail: "مطابقة مع توأمك المالي" },
];

function TransferAnalyzePage() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (step >= factors.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 650);
    return () => clearTimeout(t);
  }, [step]);
  const done = step >= factors.length;

  return (
    <AppShell>
      <NavHeader title="تحليل العملية" backTo="/transfer" />

      <div className="px-5 pt-2">
        <div className="text-[22px] font-black text-white">جارٍ تحليل العملية…</div>
        <div className="mt-1 text-[12px] text-white/55">يفحص ظل ٥ عوامل خطر قبل إتمام التحويل.</div>
      </div>

      <Section className="!mt-5">
        <GlassCard className="p-5">
          <div className="flex items-center justify-center py-2">
            {done ? (
              <RingScore value={97} color="#F87171" size={140} thickness={12} label="خطر مرتفع جداً" />
            ) : (
              <div className="relative flex h-32 w-32 items-center justify-center">
                <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "rgba(0,166,81,0.35)" }} />
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full"
                  style={{ background: "linear-gradient(135deg, #00A651, #00843D)" }}
                >
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </Section>

      <Section title="عوامل التحليل">
        <GlassCard className="p-2">
          {factors.map((f, i) => {
            const active = step > i;
            const current = step === i;
            return (
              <div key={f.label} className="flex items-center gap-3 rounded-2xl p-2.5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl transition-all"
                  style={{
                    background: active ? "rgba(0,166,81,0.16)" : "rgba(255,255,255,0.05)",
                    color: active ? "#4ADE80" : "rgba(255,255,255,0.5)",
                    border: `1px solid ${active ? "rgba(74,222,128,0.35)" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <f.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-white">{f.label}</div>
                  <div className="text-[10.5px] text-white/50">{f.detail}</div>
                </div>
                {active ? (
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full"
                    style={{ background: "rgba(74,222,128,0.18)", border: "1px solid rgba(74,222,128,0.35)" }}
                  >
                    <Check className="h-3 w-3" style={{ color: "#4ADE80" }} />
                  </div>
                ) : current ? (
                  <div className="flex gap-1">
                    {[0, 1, 2].map((k) => (
                      <span key={k} className="h-1.5 w-1.5 rounded-full" style={{ background: "#3DBB6A", animation: `pulse 1.2s ease-in-out ${k * 0.15}s infinite` }} />
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px] text-white/30">في الانتظار</span>
                )}
              </div>
            );
          })}
        </GlassCard>
      </Section>

      {done && (
        <>
          <Section title="نتيجة التحليل">
            <GlassCard tone="danger" className="p-4 animate-rise">
              <Chip tone="danger">ينصح ظل بإيقاف العملية</Chip>
              <div className="mt-3 text-[13.5px] font-bold text-white">هذه العملية تختلف عن سلوكك المعتاد.</div>
              <ul className="mt-3 space-y-2 text-[12px] text-white/80">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "#F87171" }} /> مبلغ مرتفع — ٥٠٬٠٠٠ ريال (٢١× متوسطك).</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "#F87171" }} /> مستفيد جديد — أُضيف قبل ٤ دقائق.</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "#F87171" }} /> جهاز جديد لم يُستخدم من قبل.</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "#FBBF24" }} /> وقت غير معتاد — ٢:٤٣ فجرًا.</li>
              </ul>
            </GlassCard>
          </Section>

          <Section>
            <div className="flex gap-3">
              <PrimaryButton tone="danger" icon={<X className="h-4 w-4" />} onClick={() => setCancelled(true)}>إلغاء العملية</PrimaryButton>
              <PrimaryButton tone="primary" icon={<ShieldCheck className="h-4 w-4" />} to="/verify">التحقق وإكمال العملية</PrimaryButton>
            </div>
          </Section>

          {cancelled && (
            <div className="fixed inset-0 z-50 flex items-end" onClick={() => nav({ to: "/dashboard" })}>
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} />
              <div onClick={(e) => e.stopPropagation()} className="relative mx-auto w-full max-w-[430px] animate-rise rounded-t-3xl px-6 pt-4 pb-8"
                style={{ background: "linear-gradient(180deg, #13304C 0%, #0D243D 100%)", border: "1px solid rgba(255,255,255,0.08)", paddingBottom: "calc(32px + env(safe-area-inset-bottom))" }}>
                <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/15" />
                <div className="flex flex-col items-center py-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)" }}>
                    <Check className="h-8 w-8 text-white" strokeWidth={3} />
                  </div>
                  <div className="mt-4 text-[15px] font-black text-white">تم إلغاء العملية بأمان</div>
                  <div className="mt-1 text-[11.5px] text-white/60">لم يتم خصم أي مبلغ من حسابك.</div>
                </div>
                <div className="mt-5">
                  <PrimaryButton tone="primary" onClick={() => nav({ to: "/dashboard" })}>العودة إلى الرئيسية</PrimaryButton>
                </div>
              </div>
            </div>
          )}
        </>

      )}

      <div className="h-6" />
    </AppShell>
  );
}
