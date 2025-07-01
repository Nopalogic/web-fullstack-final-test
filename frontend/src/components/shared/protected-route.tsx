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
    navigate("/");
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || "")) {
    navigate(-1);
  }

  return <>{children}</>;
}
