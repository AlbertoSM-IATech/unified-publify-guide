import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Download, LogOut, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  books_range: string | null;
  timing: string | null;
  next_step_preference: string | null;
  pain_points: string[] | null;
  lead_score_total: number;
  lead_stage: string | null;
  ai_status: string | null;
};

const stageColor: Record<string, string> = {
  high_intent: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  solution_aware: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  problem_aware: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  cold: "bg-muted text-muted-foreground border-border",
};

const stageLabel: Record<string, string> = {
  high_intent: "High-intent",
  solution_aware: "Solution-aware",
  problem_aware: "Problem-aware",
  cold: "Cold",
};

export default function AdminLeadsList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [meetingFilter, setMeetingFilter] = useState<string>("all");
  const [timingFilter, setTimingFilter] = useState<string>("all");
  const [booksFilter, setBooksFilter] = useState<string>("all");
  const [minScore, setMinScore] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Leads | Publify Admin";
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("id,created_at,name,email,books_range,timing,next_step_preference,pain_points,lead_score_total,lead_stage,ai_status")
      .order("created_at", { ascending: false })
      .limit(500);
    if (!error) setLeads(data as Lead[]);
    setLoading(false);
  };

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (stageFilter !== "all" && l.lead_stage !== stageFilter) return false;
      if (meetingFilter === "yes" && l.next_step_preference !== "reunion") return false;
      if (timingFilter !== "all" && l.timing !== timingFilter) return false;
      if (booksFilter !== "all" && l.books_range !== booksFilter) return false;
      if (minScore && l.lead_score_total < Number(minScore)) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!l.name.toLowerCase().includes(q) && !l.email.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [leads, search, stageFilter, meetingFilter, timingFilter, booksFilter, minScore]);

  const exportCsv = () => {
    const headers = [
      "id","created_at","name","email","books_range","timing","next_step_preference","pain_points","score","stage",
    ];
    const rows = filtered.map((l) =>
      [
        l.id,
        l.created_at,
        l.name,
        l.email,
        l.books_range ?? "",
        l.timing ?? "",
        l.next_step_preference ?? "",
        (l.pain_points ?? []).join("|"),
        l.lead_score_total,
        l.lead_stage ?? "",
      ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Leads Publify</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportCsv}>
              <Download className="h-4 w-4 mr-2" /> CSV
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar nombre o email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger><SelectValue placeholder="Stage" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los stages</SelectItem>
              <SelectItem value="high_intent">High-intent</SelectItem>
              <SelectItem value="solution_aware">Solution-aware</SelectItem>
              <SelectItem value="problem_aware">Problem-aware</SelectItem>
              <SelectItem value="cold">Cold</SelectItem>
            </SelectContent>
          </Select>
          <Select value={meetingFilter} onValueChange={setMeetingFilter}>
            <SelectTrigger><SelectValue placeholder="Reunión" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="yes">Quiere reunión</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timingFilter} onValueChange={setTimingFilter}>
            <SelectTrigger><SelectValue placeholder="Timing" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los timings</SelectItem>
              <SelectItem value="ya">Ya</SelectItem>
              <SelectItem value="2-4_sem">2–4 semanas</SelectItem>
              <SelectItem value="1-3_meses">1–3 meses</SelectItem>
              <SelectItem value="explorando">Explorando</SelectItem>
            </SelectContent>
          </Select>
          <Select value={booksFilter} onValueChange={setBooksFilter}>
            <SelectTrigger><SelectValue placeholder="Libros" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los catálogos</SelectItem>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1-9">1–9</SelectItem>
              <SelectItem value="10-30">10–30</SelectItem>
              <SelectItem value="31-100">31–100</SelectItem>
              <SelectItem value="100+">100+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 max-w-[200px]">
          <Input
            type="number"
            placeholder="Score mínimo"
            value={minScore}
            onChange={(e) => setMinScore(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-muted-foreground">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Fecha</th>
                    <th className="text-left px-4 py-3 font-medium">Nombre</th>
                    <th className="text-left px-4 py-3 font-medium">Email</th>
                    <th className="text-left px-4 py-3 font-medium">Libros</th>
                    <th className="text-left px-4 py-3 font-medium">Timing</th>
                    <th className="text-left px-4 py-3 font-medium">Pref.</th>
                    <th className="text-left px-4 py-3 font-medium">Score</th>
                    <th className="text-left px-4 py-3 font-medium">Stage</th>
                    <th className="text-left px-4 py-3 font-medium">IA</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id} className="border-t border-border hover:bg-muted/30">
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {new Date(l.created_at).toLocaleDateString("es-ES", { day: "2-digit", month: "short" })}
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/admin/leads/${l.id}`} className="font-medium text-foreground hover:text-primary">
                          {l.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{l.email}</td>
                      <td className="px-4 py-3">{l.books_range ?? "—"}</td>
                      <td className="px-4 py-3">{l.timing ?? "—"}</td>
                      <td className="px-4 py-3">{l.next_step_preference ?? "—"}</td>
                      <td className="px-4 py-3 font-semibold">{l.lead_score_total}</td>
                      <td className="px-4 py-3">
                        {l.lead_stage && (
                          <Badge variant="outline" className={stageColor[l.lead_stage]}>
                            {stageLabel[l.lead_stage]}
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs ${l.ai_status === "done" ? "text-emerald-600" : l.ai_status === "error" ? "text-red-600" : "text-muted-foreground"}`}>
                          {l.ai_status ?? "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="text-center py-12 text-muted-foreground">
                        Sin leads que coincidan con los filtros.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
