import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getMyAdminStatus } from "@/lib/admin.functions";
import { useAuth } from "@/hooks/use-auth";

export function useIsAdmin() {
  const { user } = useAuth();
  const fetchStatus = useServerFn(getMyAdminStatus);
  const { data } = useQuery({
    queryKey: ["admin-status", user?.id],
    queryFn: () => fetchStatus(),
    enabled: !!user,
    staleTime: 60_000,
  });
  return { isAdmin: !!data?.isAdmin, loading: !!user && data === undefined };
}
