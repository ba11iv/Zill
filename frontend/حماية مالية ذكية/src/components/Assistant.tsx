import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, X, Send, MessageSquareWarning, Link as LinkIcon, ShieldAlert, GraduationCap } from "lucide-react";

/* ظل Assistant — floating chat helper */
export function Assistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating trigger — above tab bar */}
      <button
        onClick={() => setOpen(true)}
        aria-label="مساعد ظل"
        className="fixed z-30 flex items-center gap-2 rounded-full px-3.5 py-2.5 text-[12px] font-bold text-white transition active:scale-95"
        style={{
          bottom: "calc(96px + env(safe-area-inset-bottom))",
          left: 16,
          background: "linear-gradient(135deg, #00A651 0%, #00843D 100%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.14)",
        }}
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full"
          style={{ background: "rgba(255,255,255,0.18)" }}
        >
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        مساعد ظل
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end" onClick={() => setOpen(false)}>
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} />
          <div
            
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto w-full max-w-[430px] animate-rise rounded-t-3xl px-5 pt-3 pb-6"
            style={{
              background: "linear-gradient(180deg, #13304C 0%, #0D243D 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 -20px 60px rgba(0,0,0,0.5)",
              paddingBottom: "calc(24px + env(safe-area-inset-bottom))",
            }}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/15" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-2xl"
                  style={{ background: "linear-gradient(135deg,#00A651,#00843D)" }}
                >
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-[13.5px] font-bold text-white">مساعد ظل</div>
                  <div className="text-[10.5px] text-white/55">متصل — يجيب فوراً</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Bot bubble */}
            <div className="mt-4 space-y-2.5">
              <div
                className="max-w-[85%] rounded-2xl rounded-tr-md px-3.5 py-2.5 text-[12.5px] leading-relaxed text-white/90"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                مرحبًا محمد 👋
                <div className="mt-1 text-white/70">كيف أستطيع مساعدتك اليوم؟</div>
              </div>
            </div>

            {/* Quick suggestions */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { to: "/message-analysis", icon: MessageSquareWarning, label: "فحص رسالة" },
                { to: "/link-check", icon: LinkIcon, label: "تحليل رابط" },
                { to: "/explainable", icon: ShieldAlert, label: "هل هذه عملية احتيال؟" },
                { to: "/education", icon: GraduationCap, label: "كيف أحمي نفسي؟" },
              ].map((q) => (
                <Link
                  key={q.to}
                  to={q.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-[12px] font-semibold text-white transition active:scale-[0.98]"
                  style={{
                    background: "rgba(0,166,81,0.10)",
                    border: "1px solid rgba(0,166,81,0.28)",
                  }}
                >
                  <q.icon className="h-3.5 w-3.5" style={{ color: "#3DBB6A" }} />
                  {q.label}
                </Link>
              ))}
            </div>

            {/* Composer */}
            <div
              className="mt-4 flex items-center gap-2 rounded-2xl px-3 py-2"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <input
                
                placeholder="اكتب سؤالك لمساعد ظل…"
                className="w-full bg-transparent text-[12.5px] text-white outline-none placeholder:text-white/40"
              />
              <button
                aria-label="إرسال"
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "#00A651" }}
              >
                <Send className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* Quick check bottom sheet — invoked from dashboard */
export function QuickCheckSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  const opts = [
    { to: "/message-analysis", icon: MessageSquareWarning, label: "تحليل رسالة", desc: "افحص رسالة مشبوهة", color: "#F59E0B" },
    { to: "/link-check", icon: LinkIcon, label: "فحص رابط", desc: "تحقق قبل الضغط", color: "#3B82F6" },
    { to: "/transfer", icon: ShieldAlert, label: "حماية تحويل", desc: "تحليل مخاطر التحويل", color: "#00A651" },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} />
      <div
        
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto w-full max-w-[430px] animate-rise rounded-t-3xl px-5 pt-3 pb-6"
        style={{
          background: "linear-gradient(180deg, #13304C 0%, #0D243D 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 -20px 60px rgba(0,0,0,0.5)",
          paddingBottom: "calc(24px + env(safe-area-inset-bottom))",
        }}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/15" />
        <div className="text-[15px] font-bold text-white">افحص الآن</div>
        <div className="mt-1 text-[11.5px] text-white/55">اختر ما تريد فحصه، وسيعمل ظل خلال ثوانٍ.</div>

        <div className="mt-4 space-y-2.5">
          {opts.map((o) => (
            <Link
              key={o.to}
              to={o.to}
              onClick={onClose}
              className="flex items-center gap-3 rounded-2xl px-3.5 py-3 transition active:scale-[0.99]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{ background: `${o.color}22`, color: o.color, border: `1px solid ${o.color}44` }}
              >
                <o.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-bold text-white">{o.label}</div>
                <div className="mt-0.5 text-[11px] text-white/55">{o.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
