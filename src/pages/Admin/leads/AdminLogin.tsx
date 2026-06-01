import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Chrome, Loader2 } from "lucide-react";

const ADMIN_EMAIL = "test.publify@gmail.com";

export default function AdminLogin() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as any)?.from ?? "/admin/leads";

  const ensureAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user.email?.toLowerCase() === ADMIN_EMAIL) {
      await supabase.functions.invoke("ensure-admin-access", { body: {} });
    }
  };

  useEffect(() => {
    document.title = "Acceso admin | Publify";
    const robots = document.querySelector('meta[name="robots"]') ?? document.createElement("meta");
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex, nofollow");
    if (!robots.parentElement) document.head.appendChild(robots);

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate(redirectTo, { replace: true });
    });
  }, [navigate, redirectTo]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/leads` },
        });
        if (error) throw error;
        toast.success("Cuenta creada. Iniciando sesión…");
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await ensureAdminAccess();
      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      const message = String(err.message ?? "Error de autenticación");
      toast.error(
        message.toLowerCase().includes("email not confirmed")
          ? "Confirma el email de verificación o entra con Google."
          : message,
      );
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/admin/leads`,
      });
      if (result.error) throw result.error;
      await ensureAdminAccess();
      if (!result.redirected) navigate(redirectTo, { replace: true });
    } catch (err: any) {
      toast.error(err.message ?? "No se pudo iniciar sesión con Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-foreground mb-1">Panel Admin</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "login" ? "Inicia sesión para gestionar leads" : "Crea tu cuenta de administrador"}
        </p>

        <label className="text-sm text-foreground">Email</label>
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="mt-1 mb-4"
        />

        <label className="text-sm text-foreground">Contraseña</label>
        <Input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          className="mt-1 mb-6"
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {mode === "login" ? "Entrar" : "Crear cuenta y entrar"}
        </Button>

        <Button type="button" variant="outline" className="w-full mt-3" disabled={loading} onClick={signInWithGoogle}>
          <Chrome className="h-4 w-4 mr-2" />
          Entrar con Google
        </Button>

        <p className="mt-3 text-xs text-muted-foreground text-center">
          El acceso admin se activa automáticamente para {ADMIN_EMAIL}.
        </p>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 text-xs text-muted-foreground hover:text-foreground w-full"
        >
          {mode === "login" ? "¿No tienes cuenta? Crear una" : "Ya tengo cuenta"}
        </button>
      </form>
    </main>
  );
}
