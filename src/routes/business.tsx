import { createFileRoute, Navigate } from "@tanstack/react-router";

/** Alias /business → /entreprises pour cohérence B2B internationale. */
export const Route = createFileRoute("/business")({
  component: () => <Navigate to="/entreprises" replace />,
});
