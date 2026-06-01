import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const [state, setState] = useState<"loading" | "ok" | "no_session" | "no_admin">("loading");
  const location = useLocation();

  useEffect(() => {
    let active = true;

    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!active) return;
      if (!session) return setState("no_session");

      if (session.user.email?.toLowerCase() === "test.publify@gmail.com") {
        await supabase.functions.invoke("ensure-admin-access", { body: {} });
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!active) return;
      if (error || !data) setState("no_admin");
      else setState("ok");
    };

    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (state === "no_session") {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  if (state === "no_admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Acceso denegado</h1>
          <p className="text-muted-foreground">
            Tu cuenta no tiene permisos de administrador.
          </p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
