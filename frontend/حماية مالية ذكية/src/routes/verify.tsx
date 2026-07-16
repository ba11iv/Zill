import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ScanFace, KeyRound, Check, ShieldCheck } from "lucide-react";
import { AppShell, NavHeader } from "@/components/AppShell";
import { GlassCard, Section, PrimaryButton, Chip } from "@/components/kit";

export const Route = createFileRoute("/verify")({
  head: () => ({ meta: [{ title: "التحقق — ظل" }] }),
  component: VerifyPage,
});

type Method = "face" | "code";
type Phase = "choose" | "face-scan" | "otp" | "success";

const CORRECT_OTP = "123456";

function VerifyPage() {
  const nav = useNavigate();
  const [method, setMethod] = useState<Method | null>(null);
  const [phase, setPhase] = useState<Phase>("choose");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Face ID auto-verify
  useEffect(() => {
    if (phase !== "face-scan") return;
    const t = setTimeout(() => setPhase("success"), 1200);
    return () => clearTimeout(t);
  }, [phase]);

  // Success → dashboard
  useEffect(() => {
    if (phase !== "success") return;
    const t = setTimeout(() => nav({ to: "/dashboard" }), 1800);
    return () => clearTimeout(t);
  }, [phase, nav]);

  const chooseMethod = (m: Method) => {
    setMethod(m);
    setPhase(m === "face" ? "face-scan" : "otp");
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
  };

  const setDigit = (i: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = digit;
    setOtp(next);
    setOtpError("");
    if (digit && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputsRef.current[i - 1]?.focus();
  };

  const submitOtp = () => {
    const code = otp.join("");
    if (code.length < 6) { setOtpError("أكمل جميع الأرقام الستة."); return; }
    if (code !== CORRECT_OTP) { setOtpError("الرمز غير صحيح. حاول مرة أخرى."); setOtp(["", "", "", "", "", ""]); inputsRef.current[0]?.focus(); return; }
    setPhase("success");
  };

  return (
    <AppShell>
      <NavHeader title="التحقق من الهوية" backTo="/transfer/analyze" />

      <div className="px-5 pt-2">
        <div className="text-[22px] font-black text-white">تأكيد أنك أنت</div>
        <div className="mt-1 text-[12px] text-white/55">اختر طريقة التحقق للاستمرار في مراجعة العملية.</div>
      </div>

      {phase === "choose" && (
        <>
          <Section className="!mt-5">
            <div className="space-y-3">
              <MethodCard onClick={() => chooseMethod("face")} icon={<ScanFace className="h-6 w-6" />} title="Face ID" desc="مسح الوجه ثلاثي الأبعاد — الطريقة الأسرع." recommended />
              <MethodCard onClick={() => chooseMethod("code")} icon={<KeyRound className="h-6 w-6" />} title="رمز تحقق (OTP)" desc="سيصل إلى جوالك ٥٥٠ ****" />
            </div>
          </Section>
          <Section>
            <PrimaryButton to="/dashboard" tone="ghost">إلغاء والعودة</PrimaryButton>
          </Section>
        </>
      )}

      {phase === "face-scan" && (
        <Section className="!mt-8">
          <GlassCard className="flex flex-col items-center px-6 py-10">
            <div className="relative flex h-32 w-32 items-center justify-center">
              <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "rgba(0,166,81,0.35)" }} />
              <div className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(135deg, #00A651 0%, #00843D 100%)", boxShadow: "0 10px 24px -8px rgba(0,166,81,0.5)" }}>
                <ScanFace className="h-9 w-9 text-white" />
              </div>
            </div>
            <div className="mt-5 text-[14px] font-bold text-white">انظر إلى الكاميرا</div>
            <div className="mt-1.5 text-[11px] text-white/55">جاري مسح الوجه…</div>
          </GlassCard>
        </Section>
      )}

      {phase === "otp" && (
        <>
          <Section className="!mt-6">
            <GlassCard className="p-5">
              <div className="text-center text-[13px] font-semibold text-white">أدخل الرمز المرسل إلى ٥٥٠ ****</div>
              <div className="mt-1 text-center text-[10.5px] text-white/50 arabic-num">للعرض: استخدم 1 2 3 4 5 6</div>
              <div dir="ltr" className="mt-4 flex justify-center gap-2">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputsRef.current[i] = el; }}
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => onKeyDown(i, e)}
                    className="h-12 w-10 rounded-xl text-center text-[18px] font-black text-white outline-none arabic-num"
                    style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${otpError ? "rgba(220,38,38,0.5)" : "rgba(255,255,255,0.10)"}` }}
                  />
                ))}
              </div>
              {otpError && <div className="mt-3 text-center text-[11.5px] font-semibold" style={{ color: "#F87171" }}>{otpError}</div>}
              <div className="mt-4">
                <PrimaryButton onClick={submitOtp} tone="primary" icon={<Check className="h-4 w-4" />}>تحقق</PrimaryButton>
              </div>
              <div className="mt-3 text-center">
                <button onClick={() => setPhase("choose")} className="text-[11.5px] text-white/60 underline">اختيار طريقة أخرى</button>
              </div>
            </GlassCard>
          </Section>
        </>
      )}

      {phase === "success" && (
        <Section className="!mt-8">
          <GlassCard tone="success" className="flex flex-col items-center px-6 py-10 animate-rise">
            <div className="flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)", boxShadow: "0 12px 32px -12px rgba(34,197,94,0.55)" }}>
              <Check className="h-10 w-10 text-white" strokeWidth={3} />
            </div>
            <div className="mt-5 text-[16px] font-black text-white">تم التحقق من هويتك بنجاح</div>
            <div className="mt-1 text-[12px] text-white/60">جاري إعادتك إلى الصفحة الرئيسية…</div>
            <div className="mt-3">
              <Chip tone="success" icon={<ShieldCheck className="h-3 w-3" />}>حسابك محمي</Chip>
            </div>
          </GlassCard>
        </Section>
      )}

      <div className="h-6" />
    </AppShell>
  );
}

function MethodCard({ icon, title, desc, onClick, recommended }: { icon: React.ReactNode; title: string; desc: string; onClick: () => void; recommended?: boolean }) {
  return (
    <button onClick={onClick}
      className="flex w-full items-center gap-3 rounded-3xl p-4 text-right transition active:scale-[0.98]"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ background: "rgba(0,166,81,0.14)", color: "#3DBB6A", border: "1px solid rgba(61,187,106,0.35)" }}>{icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="text-[14px] font-bold text-white">{title}</div>
          {recommended && <Chip tone="success">موصى به</Chip>}
        </div>
        <div className="mt-0.5 text-[11px] text-white/55">{desc}</div>
      </div>
    </button>
  );
}
