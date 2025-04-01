
import { 
  BookOpen, Users, TrendingUp, PieChart, LineChart, Calendar 
} from "lucide-react";

const Dashboard = () => {
  // Estos datos serían reemplazados por datos reales más adelante
  const stats = [
    { title: "Libros", value: "12", icon: <BookOpen size={20} />, change: "+2" },
    { title: "Colecciones", value: "4", icon: <Users size={20} />, change: "+1" },
    { title: "Ingresos", value: "€2,430", icon: <TrendingUp size={20} />, change: "+15%" },
    { title: "Gastos", value: "€1,890", icon: <PieChart size={20} />, change: "-5%" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Resumen de tu actividad editorial
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card-hover rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="mt-1 text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                {stat.icon}
              </div>
            </div>
            <div className="mt-2 text-xs font-medium">
              <span className={stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                {stat.change}
              </span>
              <span className="ml-1 text-muted-foreground">desde el mes pasado</span>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos y detalles adicionales */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Actividad reciente */}
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="font-heading text-lg font-medium">Actividad Reciente</h2>
          <div className="mt-3 space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-0.5 rounded-full bg-primary/10 p-2">
                  <Calendar size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Actualización del libro "Título del Libro {index + 1}"
                  </p>
                  <p className="text-xs text-muted-foreground">hace {index + 1} días</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingresos mensuales */}
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h2 className="font-heading text-lg font-medium">Ingresos Mensuales</h2>
          <div className="mt-6 h-52 w-full">
            {/* Placeholder para gráficos */}
            <div className="flex h-full w-full flex-col items-center justify-center rounded-md border border-dashed border-border bg-muted/40 p-8 text-center">
              <LineChart size={30} className="mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Los gráficos de ingresos se mostrarán aquí
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Libros recientes */}
      <div className="mt-6">
        <h2 className="font-heading text-lg font-medium">Libros Recientes</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="card-hover rounded-lg border bg-card shadow-sm"
            >
              {/* Placeholder para portada de libro */}
              <div className="h-40 rounded-t-lg bg-muted">
                <div className="flex h-full items-center justify-center">
                  <BookOpen size={50} className="text-muted-foreground/50" />
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium">Título del Libro {index}</h3>
                <p className="text-xs text-muted-foreground">Serie: Colección {index}</p>
                <div className="mt-2 flex justify-between text-xs">
                  <span>Ventas: {index * 10}</span>
                  <span className="text-primary">Ver detalles</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
