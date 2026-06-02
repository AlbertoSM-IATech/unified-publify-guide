import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const ADMIN_EMAIL = "test.publify@gmail.com";

const withTimeout = async <T,>(promise: Promise<T>, ms = 8000): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Tiempo de espera agotado comprobando la sesión")), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutId!);
  }
};

export default function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const [state, setState] = useState<"loading" | "ok" | "no_session" | "no_admin">("loading");
  const [message, setMessage] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    let active = true;

    const check = async () => {
      setState("loading");
      setMessage("");

      const { data: { user }, error: userError } = await withTimeout(supabase.auth.getUser());
      if (!active) return;
      if (userError || !user) {
        setMessage(userError?.message ?? "No hay una sesión activa");
        return setState("no_session");
      }

      if (user.email?.toLowerCase() === ADMIN_EMAIL) {
        await withTimeout(supabase.functions.invoke("ensure-admin-access", { body: {} })).catch(() => null);
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!active) return;
      if (error || !data) {
        setMessage(error?.message ?? "No se ha encontrado el rol admin para esta cuenta");
        setState("no_admin");
      }
      else setState("ok");
    };

    check().catch((error) => {
      if (!active) return;
      setMessage(error instanceof Error ? error.message : "No se pudo comprobar el acceso admin");
      setState("no_session");
    });
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      setTimeout(() => {
        check().catch((error) => {
          if (!active) return;
          setMessage(error instanceof Error ? error.message : "No se pudo comprobar el acceso admin");
          setState("no_session");
        });
      }, 0);
    });
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
          {message && <p className="mt-3 text-sm text-muted-foreground">{message}</p>}
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
