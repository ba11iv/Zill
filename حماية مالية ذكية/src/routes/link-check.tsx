import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LinkIcon, Sparkles, ShieldAlert, Globe, Lock, Building2, Star, Flag, Info, ShieldCheck, Check } from "lucide-react";
import { AppShell, NavHeader } from "@/components/AppShell";
import { GlassCard, Section, RingScore, PrimaryButton, Chip, RiskBar } from "@/components/kit";

export const Route = createFileRoute("/link-check")({
  head: () => ({ meta: [{ title: "فحص الروابط — ظل" }] }),
  component: LinkCheckPage,
});

type State = "input" | "loading" | "result";
type Mode = "danger" | "safe";

const STEPS = [
  "Google Safe Browsing",
  "عمر النطاق",
  "HTTPS / SSL",
  "سمعة النطاق",
  "تشابه اسم النطاق مع المواقع الرسمية",
];

function normalizeUrl(v: string): string | null {
  const trimmed = v.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(withScheme);
    if (!u.hostname.includes(".")) return null;
    return u.toString();
  } catch { return null; }
}

/** واجهة قابلة للاستبدال باستدعاء API حقيقي */
export async function analyzeUrl(url: string) {
  const response = await fetch("https://zill-backend.onrender.com/analyze-link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze link");
  }

const result = await response.json();
return result.data;
}

function LinkCheckPage() {
  const [state, setState] = useState<State>("input");
  const [url, setUrl] = useState("alinma-verify.xyz/secure-login");
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<Mode>("danger");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
 

  useEffect(() => {
    if (state !== "loading") return;
    setStep(0);
    const interval = setInterval(() => {
      setStep((s) => (s >= STEPS.length - 1 ? s : s + 1));
    }, 320);
    const done = setTimeout(() => setState("result"), STEPS.length * 320 + 200);
    return () => { clearInterval(interval); clearTimeout(done); };
  }, [state]);

const run = async () => {
  setError("");

  if (!url.trim()) {
    setError("أدخل رابطًا للفحص.");
    return;
  }

  const normalized = normalizeUrl(url);

  if (!normalized) {
    setError("أدخل رابطًا صحيحًا يبدأ بـ http أو https.");
    return;
  }

  const result = await analyzeUrl(normalized);

  console.log(result);

  setAnalysisResult(result);

  if (result.riskLevel === "Low") {
    setMode("safe");
  } else {
    setMode("danger");
  }

  setState("loading");

  setTimeout(() => {
    setState("result");
  }, 1800);
};
  return (
    <AppShell>
      <NavHeader title="فحص الروابط" backTo="/dashboard" />

      <div className="px-5 pt-2">
        <div className="flex items-center gap-2">
          <div className="text-[22px] font-black text-white">تحقق قبل أن تضغط</div>
          <Chip tone="info">وضع المحاكاة</Chip>
        </div>
        <div className="mt-1 text-[12px] text-white/55">أدخل الرابط وسيفحص ظل سمعته وسلامته خلال ثوانٍ.</div>
      </div>

      {state === "input" && (
        <Section className="!mt-5">
          <GlassCard className="p-4">
            <label className="text-[11px] font-medium text-white/55">رابط للفحص</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-2xl px-3 py-2.5"
              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${error ? "rgba(220,38,38,0.5)" : "rgba(255,255,255,0.08)"}` }}>
              <LinkIcon className="h-4 w-4 text-white/45" />
              <input dir="ltr" value={url} onChange={(e) => { setUrl(e.target.value); setError(""); }}
                placeholder="https://example.com"
                className="w-full bg-transparent text-right text-[13px] text-white outline-none placeholder:text-white/30" />
            </div>
            {error && <div className="mt-2 text-[11.5px] font-semibold" style={{ color: "#F87171" }}>{error}</div>}
            <div className="mt-3 flex flex-wrap gap-1.5">
              <button onClick={() => { setUrl("alinma-verify.xyz/secure-login"); setError(""); }}
                className="rounded-full px-2.5 py-1 text-[10.5px] text-white/70"
                style={{ background: "rgba(220,38,38,0.10)", border: "1px solid rgba(220,38,38,0.28)" }}>
                مثال احتيالي
              </button>
              <button onClick={() => { setUrl("https://www.alinma.com"); setError(""); }}
                className="rounded-full px-2.5 py-1 text-[10.5px] text-white/70"
                style={{ background: "rgba(0,166,81,0.10)", border: "1px solid rgba(0,166,81,0.28)" }}>
                مثال آمن
              </button>
            </div>
          </GlassCard>
          <div className="mt-4">
            <PrimaryButton onClick={run} icon={<Sparkles className="h-4 w-4" />} disabled={!url.trim()}>تحليل الرابط</PrimaryButton>
          </div>
        </Section>
      )}

      {state === "loading" && (
        <Section className="!mt-8">
          <GlassCard className="flex flex-col items-center px-6 py-8">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "rgba(0,166,81,0.35)" }} />
              <div className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(135deg,#00A651,#00843D)", boxShadow: "0 10px 24px -8px rgba(0,166,81,0.5)" }}>
                <Sparkles className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="mt-5 text-[14px] font-bold text-white">يفحص ظل النطاق والسمعة والشهادة…</div>
            <div className="mt-4 w-full space-y-2">
              {STEPS.map((s, i) => {
                const done = step > i;
                const current = step === i;
                return (
                  <div key={s} className="flex items-center gap-2.5 rounded-xl px-3 py-2"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full"
                      style={{ background: done ? "rgba(0,166,81,0.20)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${done ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.08)"}` }}>
                      {done ? <Check className="h-3 w-3" style={{ color: "#4ADE80" }} /> :
                       current ? <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#3DBB6A", animation: "pulse 1s infinite" }} /> :
                       <span className="text-[10px] text-white/40 arabic-num">{i + 1}</span>}
                    </div>
                    <span className={`text-[12px] ${done ? "text-white" : current ? "text-white/90" : "text-white/50"}`}>{s}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </Section>
      )}
{state === "result" && (
  mode === "danger"
    ? (
      <DangerResult
        url={url}
        result={analysisResult}
        onReset={() => setState("input")}
      />
    )
    : (
      <SafeResult
        url={url}
        result={analysisResult}
        onReset={() => setState("input")}
      />
    )
)}
<div className="h-6" />
</AppShell>
);
}

function DangerResult({
  url,
  result,
  onReset,
}: {
  url: string;
  result: any;
  onReset: () => void;
}) {
  console.log(result);

  return (
    <>
      <Section className="!mt-5">
        <GlassCard
          tone="danger"
          className="p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(220,38,38,0.24) 0%, rgba(11,18,32,0.6) 70%)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <Chip tone="danger" icon={<ShieldAlert className="h-3 w-3" />}>
                رابط عالي الخطورة
              </Chip>

              <div className="mt-3 text-[14px] font-bold text-white">
                درجة الخطورة
              </div>

              <div
                dir="ltr"
                className="mt-1 truncate text-[11px] font-mono text-white/60"
              >
                {url}
              </div>
            </div>

            <RingScore
              value={result.riskScore}
              color="#F87171"
              size={116}
              thickness={10}
              label={result.riskLevel}
            />
          </div>
        </GlassCard>
      </Section>

      <Section title="تفاصيل الفحص">
        <GlassCard className="space-y-3.5 p-4">
          <FactorRow
            icon={<Globe className="h-4 w-4" />}
            title="عمر النطاق"
            value={result.domainAge}
            tone="danger"
            score={result.riskScore}
          />

          <FactorRow
            icon={<Lock className="h-4 w-4" />}
            title="HTTPS / SSL"
            value={result.https ? "HTTPS مفعل" : "لا يوجد HTTPS"}
            tone={result.https ? "warning" : "danger"}
            score={result.https ? 60 : 95}
          />

          <FactorRow
            icon={<Star className="h-4 w-4" />}
            title="مستوى الخطورة"
            value={result.riskLevel}
            tone="danger"
            score={result.riskScore}
          />
        </GlassCard>
      </Section>

      <Section title="سبب القرار والتوصية">
        <GlassCard className="p-4">
          <div className="text-[12.5px] leading-relaxed text-white/85">
            {result.recommendation}
          </div>

          <ul className="mt-4 list-disc pr-5 text-[12px] text-white/80">
            {result.reasons?.map((reason: string, index: number) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </GlassCard>

        <div className="mt-4 flex gap-3">
          <PrimaryButton tone="ghost" onClick={onReset}>
            فحص رابط آخر
          </PrimaryButton>

          <PrimaryButton
            tone="primary"
            icon={<ShieldCheck className="h-4 w-4" />}
            to="/dashboard"
          >
            حظر ومتابعة
          </PrimaryButton>
        </div>

        <div className="mt-3">
          <PrimaryButton
            tone="danger"
            icon={<Flag className="h-4 w-4" />}
            to="/alert"
          >
            الإبلاغ عن الرابط
          </PrimaryButton>
        </div>
      </Section>
    </>
  );
}
function SafeResult({
  url,
  result,
  onReset,
}: {
  url: string;
  result: any;
  onReset: () => void;
}) {
  console.log(result);

  return (
    <>
      <Section className="!mt-5">
        <GlassCard
          tone="success"
          className="p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,166,81,0.24) 0%, rgba(11,18,32,0.6) 70%)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <Chip tone="success" icon={<ShieldCheck className="h-3 w-3" />}>
                رابط آمن
              </Chip>

              <div className="mt-3 text-[14px] font-bold text-white">
                درجة الأمان
              </div>

              <div
                dir="ltr"
                className="mt-1 truncate text-[11px] font-mono text-white/60"
              >
                {url}
              </div>
            </div>

            <RingScore
              value={100 - result.riskScore}
              color="#4ADE80"
              size={116}
              thickness={10}
              label="موثوق"
            />
          </div>
        </GlassCard>
      </Section>

      <Section title="تفاصيل الفحص">
        <GlassCard className="space-y-3.5 p-4">
          <FactorRow
            icon={<Flag className="h-4 w-4" />}
            title="Google Safe Browsing"
            value="لا توجد مؤشرات خطورة"
            tone="success"
            score={100 - result.riskScore}
          />

          <FactorRow
            icon={<Globe className="h-4 w-4" />}
            title="عمر النطاق"
            value={result.domainAge}
            tone="success"
            score={95}
          />

          <FactorRow
            icon={<Lock className="h-4 w-4" />}
            title="HTTPS / SSL"
            value={result.https ? "HTTPS مفعل" : "HTTPS غير موجود"}
            tone={result.https ? "success" : "warning"}
            score={result.https ? 100 : 60}
          />

          <FactorRow
            icon={<Star className="h-4 w-4" />}
            title="مستوى الخطورة"
            value={result.riskLevel}
            tone="success"
            score={100 - result.riskScore}
          />
        </GlassCard>
      </Section>

      <Section title="التوصية">
        <GlassCard tone="success" className="p-4">
          <div className="text-[12.5px] leading-relaxed text-white/85">
            {result.recommendation}
          </div>
        </GlassCard>

        <div className="mt-4 flex gap-3">
          <PrimaryButton tone="ghost" onClick={onReset}>
            فحص رابط آخر
          </PrimaryButton>

          <PrimaryButton tone="primary" to="/dashboard">
            العودة إلى الرئيسية
          </PrimaryButton>
        </div>
      </Section>
    </>
  );
}

function FactorRow({ icon, title, value, tone, score }: { icon: React.ReactNode; title: string; value: string; tone: "success" | "warning" | "danger"; score: number }) {
  const color = { success: "#4ADE80", warning: "#FBBF24", danger: "#F87171" }[tone];
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
          style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>{icon}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[12.5px] font-semibold text-white">{title}</div>
            <span className="arabic-num text-[10.5px] font-bold" style={{ color }}>{score}%</span>
          </div>
          <div className="mt-0.5 text-[10.5px] text-white/60">{value}</div>
        </div>
      </div>
      <div className="mt-2 pr-11"><RiskBar value={score} tone={tone} /></div>
    </div>
  );
}
