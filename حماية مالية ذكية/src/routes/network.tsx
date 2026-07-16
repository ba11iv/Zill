import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LinkIcon, Phone, CreditCard, User, Smartphone, UserRound, Info } from "lucide-react";
import { AppShell, NavHeader } from "@/components/AppShell";
import { GlassCard, Section, Chip, PrimaryButton } from "@/components/kit";

export const Route = createFileRoute("/network")({
  head: () => ({ meta: [{ title: "شبكة ظل — ظل" }] }),
  component: NetworkPage,
});

type NodeType = "you" | "device" | "link" | "phone" | "iban" | "beneficiary";
type Node = { id: NodeType; label: string; icon: React.ElementType; x: number; y: number; risk: "safe" | "warning" | "danger"; detail: string };

const nodes: Node[] = [
  { id: "you", label: "أنت", icon: UserRound, x: 175, y: 200, risk: "safe", detail: "الحساب الرئيسي — محمد عبدالله." },
  { id: "device", label: "جهاز جديد", icon: Smartphone, x: 55, y: 90, risk: "danger", detail: "Samsung SM-A546 • أول ظهور قبل ١٢ دقيقة." },
  { id: "link", label: "رابط مشبوه", icon: LinkIcon, x: 295, y: 90, risk: "danger", detail: "alinma-verify.xyz — تم الضغط عليه من نفس الجهاز." },
  { id: "phone", label: "رقم مجهول", icon: Phone, x: 30, y: 300, risk: "warning", detail: "+٩٦٦ ٥٥٥ ٧٢١ ٤٤٠ — مصدر الرسالة الاحتيالية." },
  { id: "iban", label: "IBAN جديد", icon: CreditCard, x: 320, y: 300, risk: "danger", detail: "SA00 8000 0304 ****  4127 — مرتبط بـ ٣ بلاغات سابقة." },
  { id: "beneficiary", label: "مستفيد جديد", icon: User, x: 175, y: 380, risk: "danger", detail: "عبدالرحمن ن. — أُضيف قبل ٤ دقائق." },
];

const edges: [NodeType, NodeType][] = [
  ["you", "device"],
  ["you", "link"],
  ["you", "phone"],
  ["you", "iban"],
  ["you", "beneficiary"],
  ["device", "link"],
  ["phone", "beneficiary"],
  ["iban", "beneficiary"],
];

function NetworkPage() {
  const [selected, setSelected] = useState<NodeType>("beneficiary");
  const active = nodes.find((n) => n.id === selected)!;
  const colorOf = (r: Node["risk"]) => (r === "danger" ? "#F87171" : r === "warning" ? "#FBBF24" : "#4ADE80");

  return (
    <AppShell>
      <NavHeader title="شبكة ظل" backTo="/twin" />
      <div className="px-5 pt-2">
        <div className="text-[22px] font-black text-white">خريطة العلاقات المشبوهة</div>
        <div className="mt-1 text-[12px] text-white/55">يربط ظل بين الأرقام والأجهزة والحسابات لكشف الاحتيال بشكل جماعي.</div>
      </div>

      <Section className="!mt-5">
        <GlassCard className="p-3">
          <div className="relative mx-auto" style={{ height: 440 }}>
            <svg viewBox="0 0 350 440" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="edgeGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#3DBB6A" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#F87171" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {edges.map(([a, b], i) => {
                const A = nodes.find((n) => n.id === a)!;
                const B = nodes.find((n) => n.id === b)!;
                const hot = a === selected || b === selected;
                return (
                  <line
                    key={i}
                    x1={A.x}
                    y1={A.y}
                    x2={B.x}
                    y2={B.y}
                    stroke={hot ? colorOf(B.risk) : "url(#edgeGrad)"}
                    strokeWidth={hot ? 1.6 : 1}
                    strokeOpacity={hot ? 0.9 : 0.45}
                    strokeDasharray="4 4"
                  >
                    <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1.4s" repeatCount="indefinite" />
                  </line>
                );
              })}
            </svg>

            {nodes.map((n) => {
              const c = colorOf(n.risk);
              const isSel = n.id === selected;
              const size = n.id === "you" ? 62 : 52;
              return (
                <button
                  key={n.id}
                  onClick={() => setSelected(n.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform active:scale-95"
                  style={{ left: n.x, top: n.y }}
                >
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `${c}33`,
                      transform: isSel ? "scale(1.4)" : "scale(1)",
                      transition: "transform .3s",
                      filter: "blur(6px)",
                    }}
                  />
                  <div
                    className="relative flex items-center justify-center rounded-full"
                    style={{
                      width: size,
                      height: size,
                      background: n.id === "you" ? "linear-gradient(135deg, #00A651, #00843D)" : "rgba(17,24,39,0.85)",
                      border: `2px solid ${isSel ? c : `${c}66`}`,
                      boxShadow: isSel ? `0 0 20px ${c}66` : "0 6px 16px rgba(0,0,0,0.4)",
                    }}
                  >
                    <n.icon className="h-5 w-5" style={{ color: n.id === "you" ? "#fff" : c }} />
                  </div>
                  <div
                    className="absolute left-1/2 mt-1 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[9.5px] font-semibold"
                    style={{ background: "rgba(11,18,32,0.85)", color: "#fff", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {n.label}
                  </div>
                </button>
              );
            })}
          </div>
        </GlassCard>
      </Section>

      <Section title="تفاصيل العنصر المحدد">
        <GlassCard tone={active.risk === "danger" ? "danger" : active.risk === "warning" ? "warning" : "success"} className="p-4">
          <div className="flex items-start gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{ background: `${colorOf(active.risk)}22`, color: colorOf(active.risk), border: `1px solid ${colorOf(active.risk)}44` }}
            >
              <active.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="text-[14px] font-bold text-white">{active.label}</div>
                <Chip tone={active.risk === "danger" ? "danger" : active.risk === "warning" ? "warning" : "success"}>
                  {active.risk === "danger" ? "مشتبه به" : active.risk === "warning" ? "قيد المراقبة" : "موثوق"}
                </Chip>
              </div>
              <div className="mt-1.5 text-[12px] leading-relaxed text-white/70">{active.detail}</div>
              <div className="mt-3 flex items-start gap-2 rounded-2xl p-2.5" style={{ background: "rgba(59,130,246,0.10)", border: "1px solid rgba(96,165,250,0.22)" }}>
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#60A5FA" }} />
                <div className="text-[10.5px] leading-relaxed text-white/65">
                  اكتشف ظل هذا العنصر ضمن ٧ حالات احتيال مشابهة خلال آخر ٤٨ ساعة عبر شبكة عملاء بنك الإنماء.
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
        <div className="mt-4">
          <PrimaryButton to="/verify" tone="primary">التحقق وإكمال المراجعة</PrimaryButton>
        </div>
      </Section>

      <div className="h-6" />
    </AppShell>
  );
}
