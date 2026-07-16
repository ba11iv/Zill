import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  ShieldCheck,
  BarChart3,
  ChevronRight,
  Bell,
  User,
} from "lucide-react";
import type { ReactNode } from "react";
import { Assistant } from "./Assistant";

/* -------------------------------------------------------------
 * ظل — Native mobile shell for Alinma Bank
 * iPhone 15 Pro target (390 × 844). RTL. Safe areas. Bottom tabs.
 * ------------------------------------------------------------- */

const navItems = [
  { to: "/dashboard", label: "الرئيسية", icon: Home },
  { to: "/analytics", label: "التقارير", icon: BarChart3 },
  { to: "/twin", label: "ظل", icon: ShieldCheck, primary: true },
  { to: "/alert", label: "التنبيهات", icon: Bell },
  { to: "/settings", label: "الحساب", icon: User },
] as const;

export function AppShell({
  children,
  hideTabBar = false,
}: {
  children: ReactNode;
  hideTabBar?: boolean;
}) {
  return (
    <div
      
      className="relative flex w-full flex-col overflow-hidden bg-background text-foreground"
      style={{
        minHeight: "100dvh",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" />


      <main
        className="relative z-10 flex-1 overflow-y-auto"
        style={{
          paddingBottom: hideTabBar
            ? "env(safe-area-inset-bottom)"
            : `calc(88px + env(safe-area-inset-bottom))`,
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>

      {!hideTabBar && <Assistant />}
      {!hideTabBar && <TabBar />}
    </div>
  );
}

function TabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div
        className="relative mx-auto flex h-[68px] items-end justify-between px-2"
        style={{
          background: "rgba(13,36,61,0.94)",
          backdropFilter: "blur(20px) saturate(150%)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 -8px 30px rgba(0,0,0,0.25)",
        }}
      >
        {navItems.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          if ("primary" in item && item.primary) {
            return (
              <Link key={item.to} to={item.to} className="relative -mt-6 flex flex-1 flex-col items-center justify-end pb-2">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full transition-transform active:scale-95"
                  style={{
                    background: "#00A651",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
                    border: "3px solid #071A2D",
                  }}
                >
                  <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                </span>
                <span className="mt-1 text-[10px] font-semibold" style={{ color: active ? "#3DBB6A" : "#C9D5DF" }}>
                  {item.label}
                </span>
              </Link>
            );
          }
          return (
            <Link key={item.to} to={item.to} className="relative flex flex-1 flex-col items-center justify-end gap-1 pb-2 pt-3 transition">
              <Icon
                className="h-[22px] w-[22px] transition-colors"
                strokeWidth={active ? 2.2 : 1.7}
                style={{ color: active ? "#3DBB6A" : "#C9D5DF" }}
              />
              <span
                className="text-[10px] font-medium transition-colors"
                style={{ color: active ? "#FFFFFF" : "#C9D5DF" }}
              >
                {item.label}
              </span>
              {active && <span className="absolute top-1 h-1 w-1 rounded-full" style={{ background: "#00A651" }} />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function NavHeader({
  title,
  subtitle,
  leading,
  trailing,
  large = false,
  onBack,
  backTo,
}: {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  large?: boolean;
  onBack?: () => void;
  backTo?: string;
}) {
  const backBtn = (
    <button
      onClick={onBack}
      aria-label="رجوع"
      className="-mr-2 flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition active:scale-95"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <ChevronRight className="h-4 w-4" />
    </button>
  );
  return (
    <header className="relative z-10 px-5 pt-3 pb-2">
      <div className="flex h-11 items-center justify-between">
        <div className="flex items-center gap-2">
          {onBack ? backBtn : backTo ? <Link to={backTo}>{backBtn}</Link> : leading}
          {!large && (
            <div>
              <h1 className="text-[17px] font-bold tracking-tight text-white">{title}</h1>
              {subtitle && <p className="text-[10.5px] text-white/50">{subtitle}</p>}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {trailing ?? (
            <Link
              to="/alert"
              aria-label="الإشعارات"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition active:scale-95"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full" style={{ background: "#DC2626" }} />
            </Link>
          )}
        </div>
      </div>
      {large && (
        <div className="mt-2">
          <h1 className="text-[28px] font-black leading-tight tracking-tight text-white">{title}</h1>
          {subtitle && <p className="mt-1 text-[12px] text-white/55">{subtitle}</p>}
        </div>
      )}
    </header>
  );
}

export function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-2xl"
      style={{
        width: size,
        height: size,
        background: "#00A651",
        color: "#FFFFFF",
        boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-1/2 w-1/2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2.5c-2.6 2.4-5.4 3.3-8 3.3v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10v-6c-2.6 0-5.4-.9-8-3.3z" />
        <path d="M12 8v6" opacity=".6" />
      </svg>
    </div>
  );
}


export function TopBar({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return <NavHeader title={title} subtitle={subtitle} trailing={right} large />;
}
