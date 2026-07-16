import { Link } from "@tanstack/react-router";
import type { ReactNode, CSSProperties } from "react";

/* ----- GlassCard ------------------------------------------------ */
export function GlassCard({
  children,
  className = "",
  style,
  onClick,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  tone?: "default" | "danger" | "warning" | "success";
}) {
  const border = {
    default: "rgba(255,255,255,0.08)",
    danger: "rgba(220,38,38,0.24)",
    warning: "rgba(245,158,11,0.24)",
    success: "rgba(0,166,81,0.28)",
  }[tone];
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl ${onClick ? "cursor-pointer transition active:scale-[0.99]" : ""} ${className}`}
      style={{
        background: "rgba(19,48,76,0.92)",
        backdropFilter: "blur(18px) saturate(140%)",
        border: `1px solid ${border}`,
        boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ----- Section header ------------------------------------------ */
export function Section({
  title,
  action,
  children,
  className = "",
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mt-6 px-5 ${className}`}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between">
          {title && <h2 className="text-[15px] font-bold text-white">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

/* ----- RingScore ------------------------------------------------ */
export function RingScore({
  value,
  size = 148,
  thickness = 10,
  color = "#00A651",
  track = "rgba(255,255,255,0.06)",
  label,
  sublabel,
}: {
  value: number;
  size?: number;
  thickness?: number;
  color?: string;
  track?: string;
  label?: string;
  sublabel?: string;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={thickness} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="arabic-num text-[34px] font-black leading-none text-white">
          {value}
          <span className="text-[16px] text-white/60">%</span>
        </div>
        {label && <div className="mt-1 text-[10.5px] font-medium text-white/65">{label}</div>}
        {sublabel && <div className="text-[9.5px] text-white/40">{sublabel}</div>}
      </div>
    </div>
  );
}

/* ----- Chip ----------------------------------------------------- */
export function Chip({
  tone = "neutral",
  children,
  icon,
}: {
  tone?: "success" | "warning" | "danger" | "neutral" | "info";
  children: ReactNode;
  icon?: ReactNode;
}) {
  const palette = {
    success: ["rgba(0,166,81,0.14)", "#3DBB6A", "rgba(0,166,81,0.28)"],
    warning: ["rgba(245,158,11,0.14)", "#F59E0B", "rgba(245,158,11,0.28)"],
    danger: ["rgba(220,38,38,0.14)", "#F87171", "rgba(220,38,38,0.28)"],
    info: ["rgba(201,213,223,0.10)", "#C9D5DF", "rgba(255,255,255,0.10)"],
    neutral: ["rgba(255,255,255,0.05)", "#C9D5DF", "rgba(255,255,255,0.08)"],
  }[tone];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold"
      style={{ background: palette[0], color: palette[1], border: `1px solid ${palette[2]}` }}
    >
      {icon}
      {children}
    </span>
  );
}

/* ----- RiskBar -------------------------------------------------- */
export function RiskBar({ value, tone = "danger" }: { value: number; tone?: "success" | "warning" | "danger" }) {
  const color = { success: "#00A651", warning: "#F59E0B", danger: "#DC2626" }[tone];
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{
          width: `${value}%`,
          background: color,
        }}
      />
    </div>
  );
}

/* ----- Sparkline ------------------------------------------------ */
export function Sparkline({
  data,
  color = "#00A651",
  height = 56,
  width = 320,
  id = "spark",
}: {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
  id?: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const step = width / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${height - ((v - min) / (max - min || 1)) * (height - 6) - 3}`).join(" ");
  const area = `0,${height} ${pts} ${width},${height}`;
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.20" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${id}-fill)`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ----- PrimaryButton -------------------------------------------- */
export function PrimaryButton({
  children,
  onClick,
  icon,
  tone = "primary",
  to,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  tone?: "primary" | "danger" | "ghost";
  to?: string;
  disabled?: boolean;
}) {
  const styles: CSSProperties = {
    primary: {
      background: "#00A651",
      color: "#fff",
      boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
      border: "1px solid rgba(255,255,255,0.06)",
    },
    danger: {
      background: "#DC2626",
      color: "#fff",
      boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
      border: "1px solid rgba(255,255,255,0.06)",
    },
    ghost: {
      background: "rgba(255,255,255,0.04)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "none",
    },
  }[tone];
  const cls = `flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[14px] font-bold transition active:scale-[0.98] ${
    disabled ? "opacity-50 pointer-events-none" : ""
  }`;
  if (to)
    return (
      <Link to={to} className={cls} style={styles}>
        {icon}
        {children}
      </Link>
    );
  return (
    <button onClick={onClick} className={cls} style={styles}>
      {icon}
      {children}
    </button>
  );
}

/* ----- Row / list item ----------------------------------------- */
export function Row({
  icon,
  title,
  subtitle,
  right,
  tone = "neutral",
  onClick,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  right?: ReactNode;
  tone?: "success" | "warning" | "danger" | "neutral" | "info";
  onClick?: () => void;
}) {
  const iconBg = {
    success: "rgba(0,166,81,0.14)",
    warning: "rgba(245,158,11,0.14)",
    danger: "rgba(220,38,38,0.14)",
    info: "rgba(255,255,255,0.05)",
    neutral: "rgba(255,255,255,0.05)",
  }[tone];
  const iconFg = {
    success: "#3DBB6A",
    warning: "#F59E0B",
    danger: "#F87171",
    info: "#C9D5DF",
    neutral: "#C9D5DF",
  }[tone];
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 py-3 ${onClick ? "cursor-pointer active:opacity-70" : ""}`}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
        style={{ background: iconBg, color: iconFg, border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13.5px] font-semibold text-white">{title}</div>
        {subtitle && <div className="mt-0.5 truncate text-[11px] text-white/55">{subtitle}</div>}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}

/* ----- Reason (why factor) ------------------------------------- */
export function Reason({
  title,
  detail,
  weight = 0,
  tone = "danger",
  icon,
}: {
  title: string;
  detail?: string;
  weight?: number;
  tone?: "success" | "warning" | "danger" | "info";
  icon?: ReactNode;
}) {
  const color = { success: "#00A651", warning: "#F59E0B", danger: "#DC2626", info: "#C9D5DF" }[tone];
  return (
    <div className="rounded-2xl p-3.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-start gap-3">
        {icon && (
          <div
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
          >
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[13px] font-semibold text-white">{title}</div>
            {weight > 0 && (
              <span className="arabic-num text-[10.5px] font-bold" style={{ color }}>
                +{weight}%
              </span>
            )}
          </div>
          {detail && <div className="mt-1 text-[11px] leading-relaxed text-white/60">{detail}</div>}
          {weight > 0 && (
            <div className="mt-2">
              <RiskBar value={weight * 4} tone={tone === "info" ? "warning" : (tone as "success" | "warning" | "danger")} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
