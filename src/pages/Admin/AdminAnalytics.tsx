import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/layout/PageLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import ApexLineChart from '@/components/charts/ApexLineChart';
import ApexPieChart from '@/components/charts/ApexPieChart';
import { TrendingUp, Users, Eye, Download, DollarSign, Clock } from 'lucide-react';

const analyticsData = {
  userGrowth: [
    { name: 'Ene', users: 1200, revenue: 45000 },
    { name: 'Feb', users: 1350, revenue: 52000 },
    { name: 'Mar', users: 1480, revenue: 58000 },
    { name: 'Abr', users: 1620, revenue: 65000 },
    { name: 'May', users: 1750, revenue: 71000 },
    { name: 'Jun', users: 1890, revenue: 78000 },
  ],
  trafficSources: {
    series: [45, 23, 16, 10, 6],
    labels: ['Búsqueda Directa', 'Redes Sociales', 'Email Marketing', 'Publicidad', 'Otros']
  }
};

const AdminAnalytics: React.FC = memo(() => {
  return (
    <PageLayout
      title="Analytics"
      subtitle="Análisis detallado de métricas y rendimiento"
    >
      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Usuarios Activos"
          value="1,890"
          change={"+12.5%"}
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Páginas Vistas"
          value="45,230"
          change={"+8.2%"}
          icon={<Eye className="h-4 w-4" />}
        />
        <StatsCard
          title="Descargas"
          value="3,456"
          change={"+15.1%"}
          icon={<Download className="h-4 w-4" />}
        />
        <StatsCard
          title="Ingresos"
          value="€78,000"
          change={"+23.5%"}
          icon={<DollarSign className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ApexLineChart
          title="Crecimiento de Usuarios"
          description="Evolución mensual de usuarios registrados"
          data={analyticsData.userGrowth}
          series={[
            { name: 'Usuarios', key: 'users', color: '#FB923C' },
            { name: 'Ingresos', key: 'revenue', color: '#059669' }
          ]}
          height={350}
        />

        <Card>
          <CardHeader>
            <CardTitle>Fuentes de Tráfico</CardTitle>
            <CardDescription>
              De dónde vienen los usuarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApexPieChart
              series={analyticsData.trafficSources.series}
              labels={analyticsData.trafficSources.labels}
              height={350}
            />
          </CardContent>
        </Card>
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Tiempo Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4m 23s</div>
            <p className="text-sm text-muted-foreground">por sesión</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tasa de Conversión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-sm text-muted-foreground">visitantes a usuarios</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Retención
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-sm text-muted-foreground">usuarios activos mensual</p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
});

AdminAnalytics.displayName = 'AdminAnalytics';

export default AdminAnalytics;