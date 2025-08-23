import React, { memo, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Star
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
import { PageLayout } from '@/components/layout/PageLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import { useAppStore } from '@/store/useAppStore';

const books = [
  {
    id: '1',
    title: 'Marketing Digital Avanzado',
    author: 'Ana García',
    category: 'Negocios',
    status: 'published',
    downloads: 1245,
    rating: 4.8,
    price: 29.99,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Desarrollo Personal',
    author: 'Carlos Ruiz',
    category: 'Autoayuda',
    status: 'draft',
    downloads: 0,
    rating: 0,
    price: 19.99,
    createdAt: '2024-01-20'
  },
  // Más libros...
];

const AdminBooks: React.FC = memo(() => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { addNotification } = useAppStore();

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const bookStats = useMemo(() => {
    const total = books.length;
    const published = books.filter(b => b.status === 'published').length;
    const drafts = books.filter(b => b.status === 'draft').length;
    const totalDownloads = books.reduce((sum, b) => sum + b.downloads, 0);
    
    return { total, published, drafts, totalDownloads };
  }, []);

  const handleBookAction = (action: string, bookId: string, bookTitle: string) => {
    addNotification({
      title: 'Acción de libro',
      message: `${action} aplicada a "${bookTitle}"`,
      type: 'success'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'default',
      draft: 'secondary',
      rejected: 'destructive'
    };
    return variants[status as keyof typeof variants] || 'secondary';
  };

  return (
    <PageLayout
      title="Gestión de Libros"
      subtitle="Administra todo el contenido de la plataforma"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Libros"
          value={bookStats.total.toString()}
          change={"+15%"}
          icon={<BookOpen className="h-4 w-4" />}
        />
        <StatsCard
          title="Publicados"
          value={bookStats.published.toString()}
          change={"+8%"}
          icon={<Star className="h-4 w-4" />}
        />
        <StatsCard
          title="Borradores"
          value={bookStats.drafts.toString()}
          change={"+3%"}
          icon={<Edit className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Descargas"
          value={bookStats.totalDownloads.toLocaleString()}
          change={"+25%"}
          icon={<Download className="h-4 w-4" />}
        />
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros y Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título o autor..."
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
                <DropdownMenuItem onClick={() => setStatusFilter('published')}>
                  Publicados
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('draft')}>
                  Borradores
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Subir Libro
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Libros ({filteredBooks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Descargas</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book, index) => (
                <motion.tr
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(book.status) as any}>
                      {book.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>€{book.price}</TableCell>
                  <TableCell>{book.downloads}</TableCell>
                  <TableCell>
                    {book.rating > 0 ? `⭐ ${book.rating}` : 'N/A'}
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
                          onClick={() => handleBookAction('Ver', book.id, book.title)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleBookAction('Editar', book.id, book.title)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleBookAction('Eliminar', book.id, book.title)}
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
        </CardContent>
      </Card>
    </PageLayout>
  );
});

AdminBooks.displayName = 'AdminBooks';

export default AdminBooks;