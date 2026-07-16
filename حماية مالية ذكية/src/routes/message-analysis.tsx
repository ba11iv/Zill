import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Upload, Sparkles, MessageSquareWarning, ShieldOff, Clock, LinkIcon,
  UserX, KeyRound, Info, ShieldCheck, X, ImageIcon, RefreshCw, Send, Check,
} from "lucide-react";
import { AppShell, NavHeader } from "@/components/AppShell";
import { GlassCard, Section, RingScore, Reason, PrimaryButton, Chip } from "@/components/kit";

export const Route = createFileRoute("/message-analysis")({
  head: () => ({ meta: [{ title: "تحليل الرسائل — ظل" }] }),
  component: MessageAnalysisPage,
});

type State = "upload" | "loading" | "result";
const ACCEPTED = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024;

/** واجهة قابلة للاستبدال باستدعاء API حقيقي لاحقًا */
export async function analyzeMessageImage(_input: { file?: File | null; text?: string }) {
  // Simulated multi-step analysis
  await new Promise((r) => setTimeout(r, 300));
  return { simulated: true };
}

const STEPS = [
  "قراءة محتوى الصورة",
  "استخراج النص",
  "اكتشاف الروابط",
  "تحليل أسلوب الرسالة",
  "حساب درجة الخطورة",
];

const DEFAULT_TEXT = "عزيزي عميل بنك الإنماء، تم تسجيل عملية غير مصرح بها على حسابك. لإلغائها فورًا اضغط الرابط وأدخل رمز التحقق الذي سيصلك: https://alinma-verify.xyz/secure";

function MessageAnalysisPage() {
  const [state, setState] = useState<State>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [text, setText] = useState<string>(DEFAULT_TEXT);
  const [error, setError] = useState<string>("");
  const [loadingStep, setLoadingStep] = useState(0);
  const [reported, setReported] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) { setPreview(""); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (state !== "loading") return;
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep((s) => {
        if (s >= STEPS.length - 1) { clearInterval(interval); return s; }
        return s + 1;
      });
    }, 380);
    const done = setTimeout(() => setState("result"), STEPS.length * 380 + 300);
    return () => { clearInterval(interval); clearTimeout(done); };
  }, [state]);

  const openPicker = () => inputRef.current?.click();

  const handleFile = (f: File | null) => {
    setError("");
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) {
      setError("نوع الملف غير مدعوم. استخدم PNG أو JPG أو WEBP.");
      return;
    }
    if (f.size > MAX_SIZE) {
      setError("حجم الصورة يتجاوز ١٠ ميجابايت.");
      return;
    }
    setFile(f);
  };

  const canAnalyze = !!file || text.trim().length > 0;

  const start = async () => {
    if (!canAnalyze) {
      setError("ارفع صورة أو ألصق نص الرسالة أولًا.");
      return;
    }
    setError("");
    await analyzeMessageImage({ file, text });
    setState("loading");
  };

  const reset = () => {
    setState("upload");
    setFile(null);
    setError("");
    setReported(false);
  };

  const fmtSize = (n: number) => n < 1024 * 1024 ? `${(n/1024).toFixed(0)} KB` : `${(n/1024/1024).toFixed(2)} MB`;

  return (
    <AppShell>
      <NavHeader title="تحليل الرسائل" backTo="/dashboard" />

      <div className="px-5 pt-2">
        <div className="flex items-center gap-2">
          <div className="text-[22px] font-black text-white">افحص أي رسالة مشبوهة</div>
          <Chip tone="info">وضع المحاكاة</Chip>
        </div>
        <div className="mt-1 text-[12px] text-white/55">ارفع صورة الرسالة أو ألصق نصها وسيقوم ظل بتحليلها فورًا.</div>
      </div>

      {state === "upload" && (
        <>
          <Section className="!mt-5">
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />

            {!file ? (
              <button
                type="button"
                onClick={openPicker}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0] ?? null); }}
                className="flex w-full flex-col items-center justify-center rounded-3xl px-6 py-10 text-center transition active:scale-[0.99]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1.5px dashed rgba(255,255,255,0.18)",
                }}
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(0,166,81,0.14)", border: "1px solid rgba(61,187,106,0.35)" }}
                >
                  <Upload className="h-7 w-7" style={{ color: "#3DBB6A" }} />
                </div>
                <div className="mt-4 text-[14px] font-bold text-white">اضغط لاختيار لقطة الشاشة</div>
                <div className="mt-1 text-[11.5px] text-white/55">أو اسحبها هنا من الاستوديو</div>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Chip tone="neutral">PNG</Chip>
                  <Chip tone="neutral">JPG</Chip>
                  <Chip tone="neutral">WEBP</Chip>
                  <Chip tone="neutral">حتى ١٠ ميجا</Chip>
                </div>
              </button>
            ) : (
              <GlassCard className="p-3">
                <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <img src={preview} alt="معاينة الرسالة" className="max-h-72 w-full object-contain" style={{ background: "rgba(0,0,0,0.35)" }} />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: "rgba(0,166,81,0.14)", color: "#3DBB6A" }}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[12.5px] font-bold text-white">{file.name}</div>
                    <div className="arabic-num text-[10.5px] text-white/55">{fmtSize(file.size)}</div>
                  </div>
                  <button
                    onClick={openPicker}
                    className="flex h-9 items-center gap-1 rounded-xl px-3 text-[11px] font-bold text-white/85"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> تغيير
                  </button>
                  <button
                    onClick={() => { setFile(null); if (inputRef.current) inputRef.current.value = ""; }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: "rgba(220,38,38,0.14)", color: "#F87171", border: "1px solid rgba(220,38,38,0.28)" }}
                    aria-label="حذف الصورة"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </GlassCard>
            )}

            {error && (
              <div className="mt-3 rounded-2xl px-3.5 py-2.5 text-[11.5px] font-semibold"
                style={{ background: "rgba(220,38,38,0.12)", color: "#F87171", border: "1px solid rgba(220,38,38,0.28)" }}>
                {error}
              </div>
            )}
          </Section>

          <Section title="أو الصق نص الرسالة">
            <GlassCard className="p-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="ألصق نص الرسالة هنا…"
                className="h-32 w-full resize-none bg-transparent text-[13px] leading-relaxed text-white/90 outline-none placeholder:text-white/40"
              />
            </GlassCard>
            <div className="mt-4">
              <PrimaryButton onClick={start} icon={<Sparkles className="h-4 w-4" />} disabled={!canAnalyze}>
                تحليل باستخدام الذكاء الاصطناعي
              </PrimaryButton>
              {!canAnalyze && (
                <div className="mt-2 text-center text-[10.5px] text-white/50">ارفع صورة أو ألصق نص الرسالة لتفعيل التحليل.</div>
              )}
            </div>
          </Section>
        </>
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
            <div className="mt-5 text-[14px] font-bold text-white">جارٍ استخراج النص وتحليل مؤشرات الاحتيال…</div>
            <div className="mt-4 w-full space-y-2">
              {STEPS.map((s, i) => {
                const done = loadingStep > i;
                const current = loadingStep === i;
                return (
                  <div key={s} className="flex items-center gap-2.5 rounded-xl px-3 py-2"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full"
                      style={{ background: done ? "rgba(0,166,81,0.20)" : current ? "rgba(0,166,81,0.10)" : "rgba(255,255,255,0.04)",
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
        <>
          <Section className="!mt-5">
            <GlassCard tone="danger" className="p-5"
              style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.24) 0%, rgba(11,18,32,0.6) 70%)" }}>
              <div className="flex items-start justify-between">
                <div>
                  <Chip tone="danger" icon={<ShieldOff className="h-3 w-3" />}>احتيال محتمل</Chip>
                  <div className="mt-3 text-[14px] font-bold text-white">درجة الخطورة</div>
                  <div className="mt-1 text-[11.5px] text-white/60">تحليل متعدد الطبقات لمحتوى الرسالة والرابط</div>
                </div>
                <RingScore value={92} color="#F87171" size={118} thickness={10} label="خطر مرتفع" />
              </div>
            </GlassCard>
          </Section>

          {preview && (
            <Section title="الصورة التي تم تحليلها">
              <GlassCard className="p-3">
                <img src={preview} alt="الصورة المحلَّلة" className="max-h-56 w-full rounded-xl object-contain" style={{ background: "rgba(0,0,0,0.35)" }} />
              </GlassCard>
            </Section>
          )}

          <Section title="النص المستخرج من الرسالة">
            <GlassCard className="p-4">
              <div className="text-[12.5px] leading-relaxed text-white/85">{text || "عزيزي عميل بنك الإنماء، تم تسجيل عملية غير مصرح بها على حسابك…"}</div>
            </GlassCard>
          </Section>

          <Section title="المؤشرات المكتشفة">
            <div className="space-y-2.5">
              <Reason icon={<UserX className="h-4 w-4" />} title="انتحال اسم بنك" detail="تدّعي الرسالة صدورها من ‘بنك الإنماء’ من رقم غير رسمي." weight={22} tone="danger" />
              <Reason icon={<KeyRound className="h-4 w-4" />} title="طلب رمز تحقق (OTP)" detail="لا يطلب البنك أبدًا رمز OTP عبر الرسائل أو المكالمات." weight={24} tone="danger" />
              <Reason icon={<LinkIcon className="h-4 w-4" />} title="طلب الضغط على رابط خارجي" detail="النطاق alinma-verify.xyz غير مسجّل لبنك الإنماء." weight={18} tone="danger" />
              <Reason icon={<Clock className="h-4 w-4" />} title="أسلوب الاستعجال والتهديد" detail="كلمات مثل ‘فورًا’ و‘سيتم إيقاف حسابك’ لخلق الذعر." weight={16} tone="warning" />
              <Reason icon={<MessageSquareWarning className="h-4 w-4" />} title="تهديد بإيقاف الحساب" detail="أسلوب معروف في هجمات التصيّد لدفع الضحية للتصرف بسرعة." weight={12} tone="warning" />
            </div>
          </Section>

          <Section title="الكلمات والعبارات المشبوهة">
            <GlassCard className="p-4">
              <div className="flex flex-wrap gap-2">
                {["أدخل رمز التحقق","سيتم إيقاف الحساب","اضغط هنا","تحديث بياناتك","فوراً","alinma-verify.xyz"].map((w) => (
                  <span key={w} className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    style={{ background: "rgba(220,38,38,0.14)", color: "#F87171", border: "1px solid rgba(220,38,38,0.32)" }}>
                    {w}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Section>

          <Section title="سبب تصنيف الرسالة">
            <GlassCard className="p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "rgba(59,130,246,0.14)", color: "#60A5FA" }}>
                  <Info className="h-4 w-4" />
                </div>
                <div className="text-[12.5px] leading-relaxed text-white/85">
                  تجمع الرسالة بين خمس علامات احتيال في وقت واحد: انتحال جهة رسمية، طلب OTP، أسلوب استعجال، رابط بنطاق حديث، وتهديد بإيقاف الحساب. هذا النمط يطابق ٩٤٪ من عمليات "التصيّد بالرسائل" التي أوقفها ظل مؤخرًا.
                </div>
              </div>
            </GlassCard>
          </Section>

          <Section title="التوصية">
            <GlassCard tone="success" className="p-4">
              <ul className="space-y-2.5 text-[12.5px] text-white/85">
                <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#4ADE80" }} />لا تشارك رمز التحقق (OTP) مع أي شخص، حتى لو ادّعى أنه من البنك.</li>
                <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#4ADE80" }} />لا تضغط الرابط. تم حظره تلقائيًا داخل التطبيق.</li>
                <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#4ADE80" }} />تواصل مع بنك الإنماء عبر ٨٠٠١٢٤٢٤٢٤ للتحقق.</li>
              </ul>
            </GlassCard>

            <div className="mt-4">
              <PrimaryButton
                onClick={() => setReported(true)}
                tone={reported ? "ghost" : "primary"}
                icon={reported ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                disabled={reported}
              >
                {reported ? "تمت الإضافة إلى شبكة ظل" : "إرسال المؤشرات إلى شبكة ظل"}
              </PrimaryButton>
              {reported && (
                <div className="mt-2 rounded-2xl px-3 py-2 text-center text-[11.5px]"
                  style={{ background: "rgba(0,166,81,0.10)", color: "#3DBB6A", border: "1px solid rgba(0,166,81,0.28)" }}>
                  تمت إضافة مؤشرات الاحتيال إلى شبكة ظل للمساعدة في حماية مستخدمين آخرين.
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-3">
              <PrimaryButton onClick={reset} tone="ghost">فحص رسالة أخرى</PrimaryButton>
              <PrimaryButton to="/alert" tone="primary">حفظ في التنبيهات</PrimaryButton>
            </div>
          </Section>
        </>
      )}

      <div className="h-6" />
    </AppShell>
  );
}

export function LoadingAnalysis({ label }: { label: string }) {
  return (
    <Section className="!mt-8">
      <GlassCard className="flex flex-col items-center px-6 py-12">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "rgba(0,166,81,0.35)" }} />
          <div className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "linear-gradient(135deg, #00A651 0%, #00843D 100%)", boxShadow: "0 10px 24px -8px rgba(0,166,81,0.5)" }}>
            <Sparkles className="h-7 w-7 text-white" />
          </div>
        </div>
        <div className="mt-6 text-[14px] font-bold text-white">جاري التحليل بالذكاء الاصطناعي</div>
        <div className="mt-1.5 max-w-xs text-center text-[11.5px] text-white/55">{label}</div>
        <div className="mt-5 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full"
              style={{ background: "rgba(61,187,106,0.85)", animation: `pulse 1.2s ease-in-out ${i * 0.15}s infinite` }} />
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}
