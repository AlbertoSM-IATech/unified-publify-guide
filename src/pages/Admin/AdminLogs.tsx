import React, { memo, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Search, 
  Filter, 
  Download,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PageLayout } from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/useAppStore';

// Datos simulados de logs
const logs = [
  {
    id: '1',
    timestamp: '2024-01-23 14:30:25',
    level: 'info',
    category: 'auth',
    message: 'Usuario ana.garcia@email.com inició sesión correctamente',
    ip: '192.168.1.100',
    userAgent: 'Chrome/120.0.0.0'
  },
  {
    id: '2',
    timestamp: '2024-01-23 14:28:12',
    level: 'warning',
    category: 'upload',
    message: 'Archivo de gran tamaño subido: libro-marketing.pdf (15.2MB)',
    ip: '192.168.1.101',
    userAgent: 'Firefox/121.0.0.0'
  },
  {
    id: '3',
    timestamp: '2024-01-23 14:25:45',
    level: 'error',
    category: 'payment',
    message: 'Error en procesamiento de pago: tarjeta rechazada',
    ip: '192.168.1.102',
    userAgent: 'Safari/17.2.1'
  },
  {
    id: '4',
    timestamp: '2024-01-23 14:20:33',
    level: 'success',
    category: 'system',
    message: 'Backup automático completado exitosamente',
    ip: 'system',
    userAgent: 'Internal'
  },
  {
    id: '5',
    timestamp: '2024-01-23 14:15:18',
    level: 'error',
    category: 'api',
    message: 'API rate limit excedido para IP 192.168.1.200',
    ip: '192.168.1.200',
    userAgent: 'PostmanRuntime/7.36.0'
  }
];

const AdminLogs: React.FC = memo(() => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { addNotification } = useAppStore();

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
      const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [searchTerm, levelFilter, categoryFilter]);

  const logStats = useMemo(() => {
    const total = logs.length;
    const errors = logs.filter(l => l.level === 'error').length;
    const warnings = logs.filter(l => l.level === 'warning').length;
    const success = logs.filter(l => l.level === 'success').length;
    
    return { total, errors, warnings, success };
  }, []);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'success':
        return 'default';
      default:
        return 'outline';
    }
  };

  const handleExportLogs = () => {
    addNotification({
      title: 'Exportación iniciada',
      message: 'Los logs se están exportando a CSV',
      type: 'info'
    });
  };

  const categories = Array.from(new Set(logs.map(log => log.category)));
  const levels = Array.from(new Set(logs.map(log => log.level)));

  return (
    <PageLayout
      title="Logs del Sistema"
      subtitle="Monitor de actividad y eventos del sistema"
    >
      {/* Stats rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Logs</p>
                <p className="text-2xl font-bold">{logStats.total}</p>
              </div>
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Errores</p>
                <p className="text-2xl font-bold text-red-500">{logStats.errors}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-yellow-500">{logStats.warnings}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success</p>
                <p className="text-2xl font-bold text-green-500">{logStats.success}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar en logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Nivel: {levelFilter === 'all' ? 'Todos' : levelFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLevelFilter('all')}>
                  Todos
                </DropdownMenuItem>
                {levels.map(level => (
                  <DropdownMenuItem key={level} onClick={() => setLevelFilter(level)}>
                    {level}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Categoría: {categoryFilter === 'all' ? 'Todas' : categoryFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCategoryFilter('all')}>
                  Todas
                </DropdownMenuItem>
                {categories.map(category => (
                  <DropdownMenuItem key={category} onClick={() => setCategoryFilter(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" onClick={handleExportLogs}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de logs */}
      <Card>
        <CardHeader>
          <CardTitle>Logs Recientes ({filteredLogs.length})</CardTitle>
          <CardDescription>
            Última actividad del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getLevelIcon(log.level)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getLevelBadgeVariant(log.level) as any} className="text-xs">
                      {log.level.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {log.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-foreground mb-2">{log.message}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {log.timestamp}
                    </span>
                    <span>IP: {log.ip}</span>
                    <span className="truncate max-w-32">UA: {log.userAgent}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
});

AdminLogs.displayName = 'AdminLogs';

export default AdminLogs;