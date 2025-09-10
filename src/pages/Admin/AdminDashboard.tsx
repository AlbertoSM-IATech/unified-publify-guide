import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle,
  Eye,
  UserCheck,
  ShoppingCart,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PageLayout } from '@/components/layout/PageLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import ApexLineChart from '@/components/charts/ApexLineChart';
import ApexPieChart from '@/components/charts/ApexPieChart';
import { useAppStore } from '@/store/useAppStore';

// Datos simulados para el admin dashboard
const adminStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalBooks: 3456,
  recentSales: 89,
  systemHealth: 98.5,
  storageUsage: 67,
};

const recentActivity = [
  {
    id: '1',
    type: 'user_register',
    user: 'Ana García',
    action: 'Se registró en la plataforma',
    time: '2 min ago',
    status: 'success'
  },
  {
    id: '2',
    type: 'book_upload',
    user: 'Carlos Ruiz',
    action: 'Subió un nuevo libro: "Marketing Digital"',
    time: '5 min ago',
    status: 'success'
  },
  {
    id: '3',
    type: 'payment_failed',
    user: 'María López',
    action: 'Error en pago de suscripción',
    time: '12 min ago',
    status: 'error'
  },
  {
    id: '4',
    type: 'system_update',
    user: 'Sistema',
    action: 'Actualización automática completada',
    time: '1 hour ago',
    status: 'info'
  },
];

const userGrowthData = {
  series: [{
    name: 'Nuevos usuarios',
    data: [31, 40, 28, 51, 42, 109, 100, 91, 135, 84, 67, 89]
  }, {
    name: 'Usuarios activos',
    data: [11, 32, 45, 32, 34, 52, 41, 65, 89, 73, 45, 67]
  }],
  categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
};

const booksByCategory = {
  series: [44, 55, 41, 17, 15],
  labels: ['Ficción', 'Educación', 'Negocios', 'Tecnología', 'Otros']
};

const AdminDashboard: React.FC = memo(() => {
  const { addNotification } = useAppStore();

  const handleQuickAction = (action: string) => {
    addNotification({
      title: 'Acción ejecutada',
      message: `Se ha ejecutado: ${action}`,
      type: 'success'
    });
  };

  return (
    <PageLayout
      title="Panel de Administración"
      subtitle="Gestión y monitoreo de toda la plataforma"
    >
      {/* Stats principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Usuarios"
          value={adminStats.totalUsers.toLocaleString()}
          change="+12.5%"
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Usuarios Activos"
          value={adminStats.activeUsers.toLocaleString()}
          change="+8.2%"
          icon={<UserCheck className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Libros"
          value={adminStats.totalBooks.toLocaleString()}
          change="+23.1%"
          icon={<BookOpen className="h-4 w-4" />}
        />
        <StatsCard
          title="Ventas Recientes"
          value={adminStats.recentSales.toString()}
          change="-2.4%"
          icon={<ShoppingCart className="h-4 w-4" />}
        />
      </div>

      {/* Estado del sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Estado del Sistema
            </CardTitle>
            <CardDescription>
              Métricas en tiempo real del rendimiento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Salud del Sistema</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {adminStats.systemHealth}% Saludable
                </Badge>
              </div>
              <Progress value={adminStats.systemHealth} className="h-3" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Uso de Almacenamiento</span>
                <Badge variant={adminStats.storageUsage > 80 ? "destructive" : "secondary"}>
                  {adminStats.storageUsage}%
                </Badge>
              </div>
              <Progress value={adminStats.storageUsage} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleQuickAction('limpieza de cache')}
              >
                Limpiar Cache
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleQuickAction('backup completo')}
              >
                Backup Completo
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Acciones Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="ghost"
              onClick={() => handleQuickAction('revisar usuarios pendientes')}
            >
              <Users className="h-4 w-4 mr-2" />
              Revisar Usuarios Pendientes
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="ghost"
              onClick={() => handleQuickAction('moderar contenido')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Moderar Contenido
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="ghost"
              onClick={() => handleQuickAction('revisar reportes')}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Revisar Reportes
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="ghost"
              onClick={() => handleQuickAction('analizar métricas')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Analizar Métricas
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos y actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de Usuarios</CardTitle>
            <CardDescription>
              Usuarios nuevos vs activos mensualmente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApexLineChart
              title="Crecimiento de Usuarios"
              description="Usuarios nuevos vs activos mensualmente"
              data={[
                { name: 'Ene', nuevos: 31, activos: 11 },
                { name: 'Feb', nuevos: 40, activos: 32 },
                { name: 'Mar', nuevos: 28, activos: 45 },
                { name: 'Abr', nuevos: 51, activos: 32 },
                { name: 'May', nuevos: 42, activos: 34 },
                { name: 'Jun', nuevos: 109, activos: 52 },
                { name: 'Jul', nuevos: 100, activos: 41 },
                { name: 'Ago', nuevos: 91, activos: 65 },
                { name: 'Sep', nuevos: 135, activos: 89 },
                { name: 'Oct', nuevos: 84, activos: 73 },
                { name: 'Nov', nuevos: 67, activos: 45 },
                { name: 'Dic', nuevos: 89, activos: 67 }
              ]}
              series={[
                { name: 'Nuevos usuarios', key: 'nuevos', color: '#8b5cf6' },
                { name: 'Usuarios activos', key: 'activos', color: '#06b6d4' }
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Libros por Categoría</CardTitle>
            <CardDescription>
              Distribución de contenido en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApexPieChart
              title="Libros por Categoría"
              description="Distribución de contenido en la plataforma"
              data={[
                { name: 'Ficción', value: 44, color: '#8b5cf6' },
                { name: 'Educación', value: 55, color: '#06b6d4' },
                { name: 'Negocios', value: 41, color: '#10b981' },
                { name: 'Tecnología', value: 17, color: '#f59e0b' },
                { name: 'Otros', value: 15, color: '#ef4444' }
              ]}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Actividad reciente */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>
            Últimas acciones en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' : 
                    activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
});

AdminDashboard.displayName = 'AdminDashboard';

export default AdminDashboard;