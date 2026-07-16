import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { User, CreditCard, DollarSign, FileText, ChevronLeft } from "lucide-react";
import { AppShell, NavHeader } from "@/components/AppShell";
import { GlassCard, Section, PrimaryButton, Chip } from "@/components/kit";

export const Route = createFileRoute("/transfer")({
  head: () => ({ meta: [{ title: "بدء تحويل — ظل" }] }),
  component: TransferPage,
});

function isValidIban(v: string) {
  const s = v.replace(/\s+/g, "").toUpperCase();
  return /^SA\d{22}$/.test(s);
}

function TransferPage() {
  const nav = useNavigate();
  const [beneficiary, setBeneficiary] = useState("عبدالرحمن ن.");
  const [iban, setIban] = useState("SA0380000304000000004127");
  const [amount, setAmount] = useState("50000");
  const [reason, setReason] = useState("مساعدة عائلية");
  const [errors, setErrors] = useState<{ beneficiary?: string; iban?: string; amount?: string }>({});

  const submit = () => {
    const next: typeof errors = {};
    if (!beneficiary.trim()) next.beneficiary = "أدخل اسم المستفيد.";
    if (!isValidIban(iban)) next.iban = "رقم الآيبان غير صحيح (يجب أن يبدأ بـ SA ويتكون من 24 خانة).";
    const amt = Number(amount);
    if (!amt || amt <= 0) next.amount = "أدخل مبلغًا أكبر من صفر.";
    setErrors(next);
    if (Object.keys(next).length === 0) nav({ to: "/transfer/analyze" });
  };

  return (
    <AppShell>
      <NavHeader title="بدء تحويل" backTo="/dashboard" />
      <div className="px-5 pt-2">
        <div className="text-[22px] font-black text-white">تحويل بنكي جديد</div>
        <div className="mt-1 text-[12px] text-white/55">سيتم مراجعة العملية بواسطة ظل قبل التنفيذ.</div>
      </div>

      <Section className="!mt-5">
        <GlassCard className="space-y-4 p-4">
          <Field icon={<User className="h-4 w-4" />} label="اسم المستفيد" error={errors.beneficiary}>
            <input value={beneficiary} onChange={(e) => setBeneficiary(e.target.value)}
              className="w-full bg-transparent text-[14px] font-semibold text-white outline-none" />
          </Field>
          <Field icon={<CreditCard className="h-4 w-4" />} label="رقم الآيبان (IBAN)" error={errors.iban}>
            <input dir="ltr" value={iban} onChange={(e) => setIban(e.target.value)}
              className="w-full bg-transparent text-right text-[13px] font-semibold tracking-wider text-white outline-none arabic-num" />
          </Field>
          <Field icon={<DollarSign className="h-4 w-4" />} label="المبلغ (ريال سعودي)" error={errors.amount}>
            <input dir="ltr" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
              className="w-full bg-transparent text-right text-[16px] font-black text-white outline-none arabic-num" />
          </Field>
          <Field icon={<FileText className="h-4 w-4" />} label="سبب التحويل">
            <input value={reason} onChange={(e) => setReason(e.target.value)}
              className="w-full bg-transparent text-[13.5px] text-white outline-none" />
          </Field>
        </GlassCard>
      </Section>

      <Section title="ملخص العملية">
        <GlassCard className="p-4">
          <Row label="من حساب" value="جاري • ٩٠٠٤ ****" />
          <div className="h-px bg-white/5" />
          <Row label="إلى" value={beneficiary || "—"} />
          <div className="h-px bg-white/5" />
          <Row label="المبلغ" value={`${Number(amount || 0).toLocaleString("ar-SA")} ريال`} highlight />
          <div className="h-px bg-white/5" />
          <Row label="رسوم" value="مجاناً" />
        </GlassCard>
        <div className="mt-3 flex items-center gap-2 rounded-2xl p-3" style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(251,191,36,0.28)" }}>
          <Chip tone="warning">مراجعة ذكية</Chip>
          <div className="text-[11.5px] text-white/70">لن يتم إرسال المبلغ قبل اكتمال تحليل ظل للعملية.</div>
        </div>
      </Section>

      <Section>
        <PrimaryButton onClick={submit} tone="primary" icon={<ChevronLeft className="h-4 w-4" />}>
          متابعة إلى التحليل
        </PrimaryButton>
      </Section>

      <div className="h-6" />
    </AppShell>
  );
}

function Field({ icon, label, children, error }: { icon: React.ReactNode; label: string; children: React.ReactNode; error?: string }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-white/55">
        <span className="text-white/45">{icon}</span>{label}
      </label>
      <div className="rounded-2xl px-3.5 py-2.5"
        style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${error ? "rgba(220,38,38,0.5)" : "rgba(255,255,255,0.08)"}` }}>
        {children}
      </div>
      {error && <div className="mt-1 text-[11px] font-semibold" style={{ color: "#F87171" }}>{error}</div>}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-[12px] text-white/55">{label}</span>
      <span className={`arabic-num text-[13px] font-semibold ${highlight ? "text-[#3DBB6A]" : "text-white"}`}>{value}</span>
    </div>
  );
}
