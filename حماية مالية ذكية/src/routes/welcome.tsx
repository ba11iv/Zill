import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "ظل — رفيقك الذكي للحماية المالية" },
      { name: "description", content: "ظل: منصة الحماية المالية الذكية من بنك الإنماء." },
    ],
  }),
  component: () => <Navigate to="/" replace />,
});
