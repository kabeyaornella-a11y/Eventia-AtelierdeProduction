import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/save-the-date")({
  component: () => <Outlet />,
});
