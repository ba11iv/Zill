import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, ShieldOff, MessageCircleMore, LinkIcon, TrendingUp, Calendar } from "lucide-react";
import { AppShell, NavHeader } from "@/components/AppShell";
import { GlassCard, Section, Sparkline, Chip, RingScore } from "@/components/kit";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "التقارير — ظل" }] }),
  component: ReportsPage,
});

const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"];
const monthlyBlocks = [
  { label: "الرسائل", data: [42, 51, 48, 63, 58, 71], color: "#3B82F6" },
  { label: "الروابط", data: [12, 18, 22, 20, 27, 24], color: "#A855F7" },
  { label: "التحويلات المحمية", data: [8, 11, 14, 13, 18, 20], color: "#3DBB6A" },
  { label: "محاولات الاحتيال", data: [1, 2, 3, 2, 4, 3], color: "#F87171" },
];

function ReportsPage() {
  return (
    <AppShell>
      <NavHeader title="التقارير" trailing={<Chip tone="info" icon={<Calendar className="h-3 w-3" />}>آخر ٦ أشهر</Chip>} />
      <div className="px-5 pt-2">
        <div className="text-[22px] font-black text-white">تقارير الحماية</div>
        <div className="mt-1 text-[12px] text-white/55">نظرة تحليلية على أداء ظل في حماية حسابك.</div>
      </div>
      {/* Best achievement */}
      <Section className="!mt-4">
        <GlassCard
          className="p-5"
          style={{
            background: "linear-gradient(135deg, rgba(0,166,81,0.18) 0%, rgba(19,48,76,0.92) 65%)",
            borderColor: "rgba(0,166,81,0.32)",
          }}
        >
          <Chip tone="success" icon={<ShieldCheck className="h-3 w-3" />}>أفضل إنجاز هذا الشهر</Chip>
          <div className="mt-3 text-[13.5px] font-bold text-white leading-relaxed">
            تم منع <span className="arabic-num" style={{ color: "#3DBB6A" }}>١٤</span> محاولة احتيال
            وحماية عمليات بقيمة تقديرية
            <span className="arabic-num" style={{ color: "#3DBB6A" }}> ٧٣٬٠٠٠ </span>
            ريال.
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { l: "منع", v: "١٤" },
              { l: "حماية", v: "٩٦" },
              { l: "تحليل", v: "٤٦٩" },
            ].map((x) => (
              <div
                key={x.l}
                className="rounded-xl px-2 py-2 text-center"
                style={{ background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="arabic-num text-[16px] font-black text-white">{x.v}</div>
                <div className="mt-0.5 text-[10px] text-white/55">{x.l}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </Section>


      <Section className="!mt-5">
        <GlassCard className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[13px] font-semibold text-white">درجة الأمان الشهرية</div>
              <div className="mt-1 text-[11px] text-white/55">يونيو ٢٠٢٦</div>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#4ADE80]">
                <TrendingUp className="h-3.5 w-3.5" /> تحسّن +٧٪ عن مايو
              </div>
            </div>
            <RingScore value={95} size={112} thickness={10} label="ممتاز" />
          </div>
          <div className="mt-4">
            <Sparkline data={[78, 82, 85, 84, 88, 95]} id="monthly" />
            <div className="mt-2 flex justify-between text-[10px] text-white/40 arabic-num">
              {months.map((m) => <span key={m}>{m}</span>)}
            </div>
          </div>
        </GlassCard>
      </Section>

      <Section title="ملخص هذا الشهر">
        <div className="grid grid-cols-2 gap-3">
          <StatBig icon={<MessageCircleMore className="h-4 w-4" />} label="رسائل حُلّلت" value="٣٤٧" delta="+١٨٪" color="#3B82F6" />
          <StatBig icon={<LinkIcon className="h-4 w-4" />} label="روابط فُحصت" value="١٢٢" delta="+٩٪" color="#A855F7" />
          <StatBig icon={<ShieldCheck className="h-4 w-4" />} label="عمليات آمنة" value="٩٦" delta="+٤٪" color="#3DBB6A" />
          <StatBig icon={<ShieldOff className="h-4 w-4" />} label="احتيال أُوقف" value="١٤" delta="+٦" color="#F87171" tone="danger" />
        </div>
      </Section>

      <Section title="التحليل التفصيلي">
        <div className="space-y-3">
          {monthlyBlocks.map((b, i) => (
            <GlassCard key={b.label} className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.color }} />
                  <div className="text-[12.5px] font-bold text-white">{b.label}</div>
                </div>
                <div className="arabic-num text-[11px] text-white/55">
                  المجموع: {b.data.reduce((a, c) => a + c, 0)}
                </div>
              </div>
              <Sparkline data={b.data} color={b.color} id={`m${i}`} />
            </GlassCard>
          ))}
        </div>
      </Section>

      <div className="h-6" />
    </AppShell>
  );
}

function StatBig({ icon, label, value, delta, color, tone = "success" }: any) {
  const deltaColor = tone === "danger" ? "#F87171" : "#4ADE80";
  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
        >
          {icon}
        </div>
        <span className="arabic-num text-[10.5px] font-semibold" style={{ color: deltaColor }}>{delta}</span>
      </div>
      <div className="mt-3 arabic-num text-[24px] font-black leading-none text-white">{value}</div>
      <div className="mt-1 text-[11px] text-white/55">{label}</div>
    </GlassCard>
  );
}
