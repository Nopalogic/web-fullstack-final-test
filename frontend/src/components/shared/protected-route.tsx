import { useNavigate } from "react-router";

import { useAuthStore } from "@/stores/auth";

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return navigate("/login");
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || "")) {
    return navigate(-1);
  }

  return <>{children}</>;
}
