import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Users,
  Smartphone,
  Clock,
  ArrowLeftRight,
  ShieldOff,
  UserPlus,
  DollarSign,
  MoonStar,
  ShieldCheck,
  Fingerprint,
} from "lucide-react";
import { AppShell, NavHeader } from "@/components/AppShell";
import { GlassCard, Section, RingScore, Reason, PrimaryButton, Chip } from "@/components/kit";

export const Route = createFileRoute("/twin")({
  head: () => ({ meta: [{ title: "التوأم المالي — ظل" }] }),
  component: TwinPage,
});

function TwinPage() {
  const [compared, setCompared] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setCompared(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AppShell>
      <NavHeader
        title="التوأم المالي"
        backTo="/dashboard"
        trailing={<Chip tone="info" icon={<Sparkles className="h-3 w-3" />}>يتعلّم منك</Chip>}
      />

      <div className="px-5 pt-2">
        <div className="text-[22px] font-black text-white">توأمك المالي الرقمي</div>
        <div className="mt-1 text-[12px] text-white/55">نموذج ذكي يمثّل سلوكك المصرفي المعتاد، ويكتشف أي عملية خارجة عن نمطك.</div>
      </div>

      {/* Normal behavior */}
      <Section title="سلوكك الطبيعي">
        <div className="grid grid-cols-2 gap-3">
          <BehaviorTile icon={<TrendingUp className="h-4 w-4" />} label="متوسط التحويل" value="٢٬٣٠٠" unit="ريال" color="#3DBB6A" />
          <BehaviorTile icon={<Users className="h-4 w-4" />} label="عدد المستفيدين" value="١٢" unit="مستفيد" color="#3B82F6" />
          <BehaviorTile icon={<Smartphone className="h-4 w-4" />} label="أجهزة معروفة" value="٣" unit="أجهزة" color="#A855F7" />
          <BehaviorTile icon={<Clock className="h-4 w-4" />} label="الوقت المعتاد" value="٦" unit="مساءً" color="#FBBF24" />
        </div>
      </Section>

      {/* New operation */}
      <Section title="عملية جديدة قيد التحليل">
        <GlassCard
          tone="danger"
          className="p-5"
          style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.22) 0%, rgba(11,18,32,0.55) 70%)" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <Chip tone="danger" icon={<ShieldOff className="h-3 w-3" />}>خارج نمطك المعتاد</Chip>
              <div className="mt-3 text-[13px] font-semibold text-white">تحويل بنكي</div>
              <div className="mt-1 arabic-num text-[26px] font-black text-white">
                ٥٠٬٠٠٠ <span className="text-[14px] text-white/60">ريال</span>
              </div>
              <div className="mt-2 space-y-0.5 text-[11.5px] text-white/70">
                <div>إلى: <span className="text-white">مستفيد جديد — عبدالرحمن ن.</span></div>
                <div>من: <span className="text-white">جهاز غير معروف (Android 14)</span></div>
                <div>الوقت: <span className="text-white arabic-num">٢:٤٣ فجراً</span></div>
              </div>
            </div>
            <ArrowLeftRight className="h-6 w-6 text-white/40" />
          </div>
        </GlassCard>
      </Section>

      {/* Side-by-side comparison */}
      <Section title="مقارنة سلوكية مباشرة">
        <div className="grid grid-cols-2 gap-3">
          <GlassCard className="p-3.5" tone="success">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: "#3DBB6A" }} />
              <div className="text-[11.5px] font-bold text-white">سلوكك المعتاد</div>
            </div>
            <ul className="space-y-2 text-[11px] text-white/80">
              <li>المبلغ: <span className="arabic-num text-white">٢٬٣٠٠ ر.س</span></li>
              <li>الوقت: <span className="text-white">٦ مساءً</span></li>
              <li>الجهاز: <span className="text-white">iPhone 15 Pro</span></li>
              <li>المستفيد: <span className="text-white">محفوظ</span></li>
              <li>الموقع: <span className="text-white">الرياض</span></li>
            </ul>
          </GlassCard>
          <GlassCard className="p-3.5" tone="danger">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: "#F87171" }} />
              <div className="text-[11.5px] font-bold text-white">العملية الحالية</div>
            </div>
            <ul className="space-y-2 text-[11px] text-white/80">
              <li>المبلغ: <span className="arabic-num" style={{ color: "#F87171" }}>٥٠٬٠٠٠ ر.س</span></li>
              <li>الوقت: <span style={{ color: "#F87171" }}>٢:٤٣ فجراً</span></li>
              <li>الجهاز: <span style={{ color: "#F87171" }}>Android غير معروف</span></li>
              <li>المستفيد: <span style={{ color: "#F87171" }}>جديد</span></li>
              <li>الموقع: <span style={{ color: "#F87171" }}>خارج النمط</span></li>
            </ul>
          </GlassCard>
        </div>
      </Section>


      {/* Comparison result */}
      <Section title={compared ? "نتيجة المقارنة" : "جاري المقارنة مع توأمك…"}>
        <GlassCard className="p-5" tone={compared ? "danger" : "default"}>
          {!compared ? (
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center">
                <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "rgba(0,166,81,0.35)" }} />
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ background: "linear-gradient(135deg, #00A651 0%, #00843D 100%)" }}
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-[13.5px] font-bold text-white">يقارن ظل هذه العملية بـ ١١٤ عملية سابقة…</div>
                <div className="mt-1 text-[11px] text-white/55">يحلل الجهاز، الموقع، المبلغ، والوقت.</div>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <div>
                <Chip tone="danger">قرار ظل: إيقاف مؤقت</Chip>
                <div className="mt-3 text-[13px] font-semibold text-white">درجة الخطورة</div>
                <div className="mt-1 text-[11px] text-white/60">تجاوزت ٤ عوامل الحد الآمن في وقت واحد.</div>
              </div>
              <RingScore value={97} color="#F87171" size={120} thickness={10} label="خطر مرتفع جداً" />
            </div>
          )}
        </GlassCard>
      </Section>

      {compared && (
        <>
          <Section title="لماذا؟">
            <div className="space-y-2.5">
              <Reason icon={<Smartphone className="h-4 w-4" />} title="جهاز جديد غير موثوق" detail="أول ظهور لهذا الجهاز في تاريخ الحساب." weight={22} tone="danger" />
              <Reason icon={<UserPlus className="h-4 w-4" />} title="مستفيد جديد" detail="لم يسبق التحويل إلى هذا الحساب من قبل." weight={20} tone="danger" />
              <Reason icon={<DollarSign className="h-4 w-4" />} title="مبلغ أعلى من المعتاد" detail="٢١ ضعف متوسط تحويلاتك الشهرية." weight={30} tone="danger" />
              <Reason icon={<MoonStar className="h-4 w-4" />} title="وقت غير معتاد" detail="لم تُنفّذ من قبل أي عملية بين ١ - ٥ فجرًا." weight={25} tone="warning" />
            </div>
          </Section>

          <Section title="قرار ظل">
            <GlassCard tone="danger" className="p-4">
              <div className="space-y-2.5 text-[12.5px] text-white/85">
                <div className="flex items-start gap-2">
                  <ShieldOff className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#F87171" }} />
                  إيقاف العملية مؤقتًا حتى يتم التحقق من هويتك.
                </div>
                <div className="flex items-start gap-2">
                  <Fingerprint className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#FBBF24" }} />
                  طلب تحقق ثنائي عبر البصمة أو Face ID.
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#4ADE80" }} />
                  تنبيه فوري داخل التطبيق لك.
                </div>
              </div>
            </GlassCard>
            <div className="mt-4 flex gap-3">
              <PrimaryButton to="/explainable" tone="ghost">كيف اتخذ ظل قراره؟</PrimaryButton>
              <PrimaryButton to="/verify" tone="primary" icon={<Fingerprint className="h-4 w-4" />}>التحقق الآن</PrimaryButton>
            </div>
          </Section>
        </>
      )}

      <div className="h-6" />
    </AppShell>
  );
}

function BehaviorTile({ icon, label, value, unit, color }: { icon: React.ReactNode; label: string; value: string; unit: string; color: string }) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
        >
          {icon}
        </div>
        <span className="text-[10px] text-white/40">آخر ٩٠ يومًا</span>
      </div>
      <div className="mt-3 arabic-num text-[22px] font-black leading-none text-white">
        {value} <span className="text-[11px] font-medium text-white/50">{unit}</span>
      </div>
      <div className="mt-1 text-[11px] text-white/55">{label}</div>
    </GlassCard>
  );
}
