import { useAppSelector } from "@/app/hooks";
import { Navigate } from "react-router-dom";

export default function DashboardIndex() {
  const { user } = useAppSelector((state) => state.auth);

  if (user?.role === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  }
  if (user?.role === 'sender') {
    return <Navigate to="/dashboard/sender" replace />;
  }
  if (user?.role === 'receiver') {
    return <Navigate to="/dashboard/receiver" replace />;
  }

  // Fallback or loading state while user data is being checked
  return <div>Loading...</div>;
}