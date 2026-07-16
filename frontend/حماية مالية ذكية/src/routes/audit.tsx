import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang, DICT } from "@/lib/i18n";

export const Route = createFileRoute("/audit")({
  component: AuditPage,
});

// All app routes to sweep
const ROUTES = [
  "/",
  "/login",
  "/dashboard",
  "/alert",
  "/analytics",
  "/demo",
  "/education",
  "/explainable",
  "/link-check",
  "/message-analysis",
  "/network",
  "/settings",
  "/transfer",
  "/transfer/analyze",
  "/twin",
  "/verify",
];

const ARABIC_RE = /[\u0600-\u06FF]/;

type Finding = { text: string; tag: string; path: string; attr?: string };
type RouteResult = {
  path: string;
  status: "pending" | "running" | "done" | "error";
  findings: Finding[];
  totalNodes: number;
  errorMsg?: string;
};

function scanDoc(doc: Document, path: string): Finding[] {
  const out: Finding[] = [];
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const txt = (node.nodeValue || "").trim();
    if (!txt || !ARABIC_RE.test(txt)) continue;
    // Skip if inside <script>/<style>
    const parent = node.parentElement;
    if (!parent) continue;
    const tag = parent.tagName.toLowerCase();
    if (tag === "script" || tag === "style" || tag === "noscript") continue;
    // Skip if this exact string is still in DICT (means it wasn't yet translated by observer race)
    out.push({ text: txt, tag, path });
  }
  // Also scan translatable attributes
  const ATTRS = ["placeholder", "aria-label", "title", "alt"];
  doc.querySelectorAll("*").forEach((el) => {
    ATTRS.forEach((a) => {
      const v = el.getAttribute(a);
      if (v && ARABIC_RE.test(v)) {
        out.push({ text: v.trim(), tag: el.tagName.toLowerCase(), path, attr: a });
      }
    });
  });
  return out;
}

function AuditPage() {
  const { lang, setLang } = useLang();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [results, setResults] = useState<RouteResult[]>(
    ROUTES.map((p) => ({ path: p, status: "pending", findings: [], totalNodes: 0 })),
  );
  const [running, setRunning] = useState(false);
  const [currentIdx, setCurrentIdx] = useState<number>(-1);
  const [waitMs, setWaitMs] = useState(1200);

  const runAudit = useCallback(async () => {
    setRunning(true);
    // Force EN in localStorage so the iframe boots in English
    try {
      localStorage.setItem("zill-lang", "en");
    } catch {}
    // Reset results
    setResults(ROUTES.map((p) => ({ path: p, status: "pending", findings: [], totalNodes: 0 })));

    for (let i = 0; i < ROUTES.length; i++) {
      const path = ROUTES[i];
      setCurrentIdx(i);
      setResults((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], status: "running" };
        return next;
      });

      try {
        // Load iframe
        const iframe = iframeRef.current;
        if (!iframe) throw new Error("no iframe");
        await new Promise<void>((resolve, reject) => {
          const onLoad = () => {
            iframe.removeEventListener("load", onLoad);
            resolve();
          };
          iframe.addEventListener("load", onLoad);
          iframe.src = path + (path.includes("?") ? "&" : "?") + "audit=1";
          setTimeout(() => reject(new Error("timeout")), 15000);
        });
        // Wait for translations + observer to settle
        await new Promise((r) => setTimeout(r, waitMs));
        const doc = iframe.contentDocument;
        if (!doc) throw new Error("no doc");
        // Double-check EN
        try {
          iframe.contentWindow?.localStorage.setItem("zill-lang", "en");
        } catch {}
        const findings = scanDoc(doc, path);
        const totalNodes = doc.body.querySelectorAll("*").length;
        setResults((prev) => {
          const next = [...prev];
          next[i] = { path, status: "done", findings, totalNodes };
          return next;
        });
      } catch (e) {
        setResults((prev) => {
          const next = [...prev];
          next[i] = {
            path,
            status: "error",
            findings: [],
            totalNodes: 0,
            errorMsg: (e as Error).message,
          };
          return next;
        });
      }
    }
    setCurrentIdx(-1);
    setRunning(false);
  }, [waitMs]);

  useEffect(() => {
    // Make sure the audit page itself renders in EN while auditing
    if (lang !== "en") setLang("en");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalFindings = results.reduce((a, r) => a + r.findings.length, 0);
  const done = results.filter((r) => r.status === "done").length;
  const dictSize = Object.keys(DICT).length;

  return (
    <div
      dir="ltr"
      style={{
        minHeight: "100dvh",
        background: "#0B1220",
        color: "#E2E8F0",
        fontFamily: "ui-sans-serif, system-ui",
        padding: 16,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>i18n Audit — Arabic leftovers in EN mode</h1>
            <p style={{ margin: "4px 0 0", color: "#94A3B8", fontSize: 13 }}>
              Sweeps every route in an iframe with language forced to English and flags any DOM text
              or translatable attribute still containing Arabic characters.
            </p>
          </div>
          <Link to="/settings" style={{ color: "#00A651", fontSize: 13 }}>
            ← Back to Settings
          </Link>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <Stat label="Routes" value={ROUTES.length} />
          <Stat label="Completed" value={done} />
          <Stat
            label="Arabic leftovers"
            value={totalFindings}
            tone={totalFindings === 0 && done === ROUTES.length ? "ok" : totalFindings > 0 ? "bad" : "neutral"}
          />
          <Stat label="Dictionary entries" value={dictSize} />
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          <button
            onClick={runAudit}
            disabled={running}
            style={{
              background: running ? "#334155" : "#00A651",
              color: "white",
              border: 0,
              padding: "10px 18px",
              borderRadius: 10,
              fontWeight: 700,
              cursor: running ? "wait" : "pointer",
            }}
          >
            {running ? `Running… (${done}/${ROUTES.length})` : "▶ Run full audit"}
          </button>
          <label style={{ fontSize: 13, color: "#94A3B8" }}>
            Wait per route:{" "}
            <input
              type="number"
              value={waitMs}
              onChange={(e) => setWaitMs(Number(e.target.value) || 800)}
              style={{
                width: 80,
                background: "#1E293B",
                color: "white",
                border: "1px solid #334155",
                borderRadius: 6,
                padding: "4px 6px",
              }}
            />{" "}
            ms
          </label>
          <span style={{ fontSize: 12, color: "#64748B" }}>
            Current language: <b style={{ color: "#00A651" }}>{lang.toUpperCase()}</b>
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <h2 style={{ fontSize: 14, color: "#94A3B8", marginBottom: 8 }}>Results</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {results.map((r, i) => (
                <ResultRow key={r.path} r={r} active={i === currentIdx} />
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 14, color: "#94A3B8", marginBottom: 8 }}>Live iframe (EN forced)</h2>
            <iframe
              ref={iframeRef}
              title="audit-frame"
              style={{
                width: "100%",
                height: 700,
                border: "1px solid #1E293B",
                borderRadius: 12,
                background: "white",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, tone = "neutral" }: { label: string; value: number; tone?: "ok" | "bad" | "neutral" }) {
  const color = tone === "ok" ? "#10B981" : tone === "bad" ? "#EF4444" : "#E2E8F0";
  return (
    <div
      style={{
        background: "#13233A",
        border: "1px solid #1E293B",
        borderRadius: 12,
        padding: 12,
      }}
    >
      <div style={{ fontSize: 11, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color, marginTop: 4 }}>{value}</div>
    </div>
  );
}

function ResultRow({ r, active }: { r: RouteResult; active: boolean }) {
  const color =
    r.status === "error"
      ? "#EF4444"
      : r.status === "done"
      ? r.findings.length === 0
        ? "#10B981"
        : "#F59E0B"
      : r.status === "running"
      ? "#00A651"
      : "#64748B";
  return (
    <div
      style={{
        background: active ? "#132a45" : "#13233A",
        border: `1px solid ${active ? "#00A651" : "#1E293B"}`,
        borderRadius: 10,
        padding: 10,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <code style={{ fontSize: 13, color: "#E2E8F0" }}>{r.path}</code>
        <span style={{ fontSize: 12, color, fontWeight: 700 }}>
          {r.status === "done"
            ? r.findings.length === 0
              ? "✓ CLEAN"
              : `⚠ ${r.findings.length} leftover${r.findings.length === 1 ? "" : "s"}`
            : r.status === "error"
            ? `✗ ${r.errorMsg}`
            : r.status.toUpperCase()}
        </span>
      </div>
      {r.findings.length > 0 && (
        <ul style={{ margin: "6px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 3 }}>
          {r.findings.slice(0, 20).map((f, i) => (
            <li
              key={i}
              style={{
                fontSize: 12,
                background: "#0B1220",
                padding: "4px 8px",
                borderRadius: 6,
                border: "1px solid #1E293B",
                direction: "rtl",
                textAlign: "right",
              }}
            >
              <span style={{ color: "#F59E0B" }}>{f.text}</span>
              <span style={{ color: "#64748B", marginInlineStart: 8, fontSize: 10, direction: "ltr", display: "inline-block" }}>
                &lt;{f.tag}
                {f.attr ? ` @${f.attr}` : ""}&gt;
              </span>
            </li>
          ))}
          {r.findings.length > 20 && (
            <li style={{ fontSize: 11, color: "#64748B" }}>…and {r.findings.length - 20} more</li>
          )}
        </ul>
      )}
    </div>
  );
}
