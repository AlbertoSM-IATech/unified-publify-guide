import React, { memo, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Mail,
  Calendar,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PageLayout } from '@/components/layout/PageLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import { useAppStore } from '@/store/useAppStore';

// Datos simulados de usuarios
const users = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana.garcia@email.com',
    role: 'user',
    status: 'active',
    avatar: '',
    createdAt: '2024-01-15',
    lastActive: '2024-01-23',
    booksCount: 12,
    subscriptionStatus: 'premium'
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@email.com',
    role: 'admin',
    status: 'active',
    avatar: '',
    createdAt: '2024-01-10',
    lastActive: '2024-01-23',
    booksCount: 0,
    subscriptionStatus: 'free'
  },
  {
    id: '3',
    name: 'María López',
    email: 'maria.lopez@email.com',
    role: 'user',
    status: 'inactive',
    avatar: '',
    createdAt: '2024-01-08',
    lastActive: '2024-01-20',
    booksCount: 5,
    subscriptionStatus: 'basic'
  },
  {
    id: '4',
    name: 'José Martín',
    email: 'jose.martin@email.com',
    role: 'user',
    status: 'suspended',
    avatar: '',
    createdAt: '2024-01-05',
    lastActive: '2024-01-18',
    booksCount: 23,
    subscriptionStatus: 'premium'
  },
];

const AdminUsers: React.FC = memo(() => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { addNotification } = useAppStore();

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const userStats = useMemo(() => {
    const total = users.length;
    const active = users.filter(u => u.status === 'active').length;
    const suspended = users.filter(u => u.status === 'suspended').length;
    const admins = users.filter(u => u.role === 'admin').length;
    
    return { total, active, suspended, admins };
  }, []);

  const handleUserAction = (action: string, userId: string, userName: string) => {
    addNotification({
      title: 'Acción de usuario',
      message: `${action} aplicada a ${userName}`,
      type: 'success'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      suspended: 'destructive'
    };
    return variants[status as keyof typeof variants] || 'secondary';
  };

  const getRoleBadge = (role: string) => {
    return role === 'admin' ? 'destructive' : 'outline';
  };

  return (
    <PageLayout
      title="Gestión de Usuarios"
      subtitle="Administra todos los usuarios de la plataforma"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Usuarios"
          value={userStats.total.toString()}
          change="0%"
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Usuarios Activos"
          value={userStats.active.toString()}
          change="+8%"
          icon={<UserCheck className="h-4 w-4" />}
        />
        <StatsCard
          title="Suspendidos"
          value={userStats.suspended.toString()}
          change="-5%"
          icon={<UserX className="h-4 w-4" />}
        />
        <StatsCard
          title="Administradores"
          value={userStats.admins.toString()}
          change="0%"
          icon={<Shield className="h-4 w-4" />}
        />
      </div>

      {/* Filtros y búsqueda */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros y Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Estado: {statusFilter === 'all' ? 'Todos' : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  Todos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                  Activos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>
                  Inactivos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('suspended')}>
                  Suspendidos
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Gestiona los usuarios de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Suscripción</TableHead>
                  <TableHead>Libros</TableHead>
                  <TableHead>Último acceso</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(user.status) as any}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadge(user.role) as any}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {user.subscriptionStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.booksCount}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(user.lastActive).toLocaleDateString('es-ES')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleUserAction('Editar', user.id, user.name)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUserAction('Enviar email', user.id, user.name)}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Enviar Email
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUserAction('Ver actividad', user.id, user.name)}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Ver Actividad
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === 'active' ? (
                            <DropdownMenuItem
                              onClick={() => handleUserAction('Suspender', user.id, user.name)}
                              className="text-yellow-600"
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              Suspender
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleUserAction('Activar', user.id, user.name)}
                              className="text-green-600"
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Activar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleUserAction('Eliminar', user.id, user.name)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
});

AdminUsers.displayName = 'AdminUsers';

export default AdminUsers;