import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Smartphone,
  ShieldCheck,
  Bell,
  Sparkles,
  Moon,
  Sun,
  SmartphoneCharging,
  LogOut,
  Eye,
  ChevronLeft,
  Fingerprint,
  Laptop,
  Tablet,
  Check,
} from "lucide-react";
import { AppShell, NavHeader } from "@/components/AppShell";
import { GlassCard, Section, RingScore, Chip } from "@/components/kit";
import { applyTheme, getStoredPref, watchSystemTheme, type ThemePref } from "@/lib/theme";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "الحساب — ظل" }] }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <AppShell>
      <NavHeader title="الحساب" />

      {/* Profile header */}
      <div className="px-5 pt-2">
        <GlassCard
          className="overflow-hidden p-5"
          style={{ background: "linear-gradient(135deg, rgba(0,132,61,0.28) 0%, rgba(11,18,32,0.6) 70%)", borderColor: "rgba(61,187,106,0.35)" }}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-[22px] font-black text-white"
                style={{ background: "linear-gradient(135deg, #00A651 0%, #00843D 100%)", boxShadow: "0 10px 24px -8px rgba(0,166,81,0.5)" }}
              >
                م
              </div>
              <span
                className="absolute -bottom-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full"
                style={{ background: "#0B1220", border: "2px solid #0B1220" }}
              >
                <ShieldCheck className="h-3.5 w-3.5" style={{ color: "#4ADE80" }} />
              </span>
            </div>
            <div className="flex-1">
              <div className="text-[16px] font-black text-white">محمد عبدالله</div>
              <div className="mt-0.5 arabic-num text-[11px] text-white/60">عميل بنك الإنماء منذ ٢٠١٩</div>
              <div className="mt-2 flex gap-1.5">
                <Chip tone="success">حماية ظل مفعّلة</Chip>
              </div>
            </div>
            <RingScore value={95} size={68} thickness={7} />
          </div>
        </GlassCard>
      </div>

      {/* Trusted devices */}
      <Section title="الأجهزة الموثوقة">
        <GlassCard className="px-4">
          <DeviceRow icon={Smartphone} name="iPhone 15 Pro" detail="الرياض • هذا الجهاز" current />
          <div className="h-px bg-white/5" />
          <DeviceRow icon={Tablet} name="iPad Air" detail="جدة • آخر استخدام قبل يومين" />
          <div className="h-px bg-white/5" />
          <DeviceRow icon={Laptop} name="MacBook Pro" detail="الرياض • آخر استخدام قبل ٤ ساعات" />
        </GlassCard>
      </Section>

      {/* Settings */}
      <Section title="إعدادات الحماية">
        <GlassCard className="px-4">
          <Toggle icon={<Fingerprint className="h-4 w-4" />} title="التحقق البيومتري" desc="بصمة + Face ID" defaultOn />
          <div className="h-px bg-white/5" />
          <Toggle icon={<Sparkles className="h-4 w-4" />} title="ذكاء ظل الاستباقي" desc="اكتشاف تلقائي للأنماط الغريبة" defaultOn />
          <div className="h-px bg-white/5" />
          <Toggle icon={<Bell className="h-4 w-4" />} title="الإشعارات الفورية" desc="تنبيهات كل عملية مشبوهة" defaultOn />
          <div className="h-px bg-white/5" />
          <Toggle icon={<Eye className="h-4 w-4" />} title="مشاركة تحسين النموذج" desc="بيانات مجهولة الهوية فقط" />
        </GlassCard>
      </Section>

      {/* Appearance / Theme */}
      <Section title="🎨 المظهر">
        <ThemePicker />
      </Section>

      {/* Language */}
      <Section title="اللغة / Language">
        <LanguagePicker />
      </Section>

      <Section title="روابط سريعة">
        <GlassCard className="p-1">
          <LinkRow to="/education" label="مركز التوعية" icon={<Sparkles className="h-4 w-4" />} />
          <LinkRow to="/network" label="شبكة ظل" icon={<ShieldCheck className="h-4 w-4" />} />
          <LinkRow to="/analytics" label="تقارير الحماية" icon={<Bell className="h-4 w-4" />} />
          <LinkRow to="/audit" label="فحص الترجمة (i18n Audit)" icon={<Sparkles className="h-4 w-4" />} />
        </GlassCard>
      </Section>

      <Section>
        <Link
          to="/login"
          className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[13.5px] font-bold transition active:scale-[0.98]"
          style={{ background: "rgba(220,38,38,0.10)", color: "#F87171", border: "1px solid rgba(248,113,113,0.3)" }}
        >
          <LogOut className="h-4 w-4" /> تسجيل الخروج
        </Link>
        <div className="mt-4 text-center text-[10px] text-white/35">ظل • الإصدار ٤٫١٢٫٠ • بنك الإنماء ٢٠٢٦</div>
      </Section>

      <div className="h-6" />
    </AppShell>
  );
}

function DeviceRow({ icon: Icon, name, detail, current }: { icon: React.ElementType; name: string; detail: string; current?: boolean }) {
  return (
    <div className="flex items-center gap-3 py-3.5">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-2xl"
        style={{ background: "rgba(0,166,81,0.14)", color: "#3DBB6A", border: "1px solid rgba(61,187,106,0.28)" }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="text-[13px] font-bold text-white">{name}</div>
          {current && <Chip tone="success">هذا الجهاز</Chip>}
        </div>
        <div className="mt-0.5 text-[10.5px] text-white/50">{detail}</div>
      </div>
    </div>
  );
}

function Toggle({ icon, title, desc, defaultOn }: { icon: React.ReactNode; title: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center gap-3 py-3">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[13px] font-semibold text-white">{title}</div>
        <div className="mt-0.5 text-[10.5px] text-white/50">{desc}</div>
      </div>
      <button
        onClick={() => setOn(!on)}
        className="relative h-6 w-11 rounded-full transition"
        style={{
          background: on ? "linear-gradient(135deg, #00A651, #00843D)" : "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all"
          style={{ right: on ? 2 : 22, boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
        />
      </button>
    </div>
  );
}

function LinkRow({ to, label, icon }: { to: string; label: string; icon: React.ReactNode }) {
  return (
    <Link to={to} className="flex items-center gap-3 rounded-2xl p-3 transition active:scale-[0.99]">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {icon}
      </div>
      <div className="flex-1 text-[13px] font-semibold text-white">{label}</div>
      <ChevronLeft className="h-4 w-4 text-white/40" />
    </Link>
  );
}

function ThemePicker() {
  const [pref, setPref] = useState<ThemePref>("dark");

  useEffect(() => {
    const p = getStoredPref();
    setPref(p);
    applyTheme(p);
  }, []);

  useEffect(() => {
    if (pref !== "system") return;
    return watchSystemTheme(() => applyTheme("system"));
  }, [pref]);

  const choose = (p: ThemePref) => {
    setPref(p);
    applyTheme(p);
  };

  const options: { key: ThemePref; icon: React.ReactNode; title: string; desc: string }[] = [
    { key: "dark", icon: <Moon className="h-5 w-5" />, title: "🌙 الوضع الداكن", desc: "خلفية كحلي فاخر" },
    { key: "light", icon: <Sun className="h-5 w-5" />, title: "☀️ الوضع الفاتح", desc: "خلفية بيضاء هادئة" },
    { key: "system", icon: <SmartphoneCharging className="h-5 w-5" />, title: "📱 مطابق للجهاز", desc: "يتبع إعدادات نظامك" },
  ];

  return (
    <GlassCard className="p-2">
      {options.map((o, i) => {
        const active = pref === o.key;
        return (
          <button
            key={o.key}
            onClick={() => choose(o.key)}
            className="flex w-full items-center gap-3 rounded-2xl p-3 text-right transition active:scale-[0.99]"
            style={{
              background: active ? "rgba(0,166,81,0.10)" : "transparent",
              border: active ? "1px solid rgba(0,166,81,0.35)" : "1px solid transparent",
              marginTop: i === 0 ? 0 : 4,
            }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: active ? "rgba(0,166,81,0.16)" : "rgba(255,255,255,0.05)",
                color: active ? "#00A651" : "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {o.icon}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold" style={{ color: "var(--color-foreground)" }}>
                {o.title}
              </div>
              <div className="mt-0.5 text-[10.5px]" style={{ color: "var(--color-muted-foreground)" }}>
                {o.desc}
              </div>
            </div>
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full"
              style={{
                background: active ? "#00A651" : "transparent",
                border: active ? "1px solid #00A651" : "1px solid rgba(255,255,255,0.2)",
                color: "white",
              }}
            >
              {active && <Check className="h-3.5 w-3.5" />}
            </div>
          </button>
        );
      })}
    </GlassCard>
  );
}

function LanguagePicker() {
  const { lang, setLang } = useLang();
  const options: { key: "ar" | "en"; label: string; sub: string; flag: string }[] = [
    { key: "ar", label: "العربية", sub: "Arabic — RTL", flag: "🇸🇦" },
    { key: "en", label: "English", sub: "English — LTR", flag: "🇬🇧" },
  ];
  return (
    <GlassCard className="p-2">
      {options.map((o, i) => {
        const active = lang === o.key;
        return (
          <button
            key={o.key}
            onClick={() => setLang(o.key)}
            className="flex w-full items-center gap-3 rounded-2xl p-3 text-right transition active:scale-[0.99]"
            style={{
              background: active ? "rgba(0,166,81,0.10)" : "transparent",
              border: active ? "1px solid rgba(0,166,81,0.35)" : "1px solid transparent",
              marginTop: i === 0 ? 0 : 4,
            }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
              style={{
                background: active ? "rgba(0,166,81,0.16)" : "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {o.flag}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold" style={{ color: "var(--color-foreground)" }}>
                {o.label}
              </div>
              <div className="mt-0.5 text-[10.5px]" style={{ color: "var(--color-muted-foreground)" }}>
                {o.sub}
              </div>
            </div>
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full"
              style={{
                background: active ? "#00A651" : "transparent",
                border: active ? "1px solid #00A651" : "1px solid rgba(255,255,255,0.2)",
                color: "white",
              }}
            >
              {active && <Check className="h-3.5 w-3.5" />}
            </div>
          </button>
        );
      })}
    </GlassCard>
  );
}
