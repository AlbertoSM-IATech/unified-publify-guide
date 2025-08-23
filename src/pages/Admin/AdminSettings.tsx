import React, { memo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { PageLayout } from '@/components/layout/PageLayout';
import { useAppStore } from '@/store/useAppStore';
import { 
  Settings, 
  Shield, 
  Mail, 
  Database, 
  Globe, 
  Bell,
  Save,
  RefreshCw
} from 'lucide-react';

const AdminSettings: React.FC = memo(() => {
  const { addNotification } = useAppStore();
  
  const [settings, setSettings] = useState({
    siteName: 'Publify',
    siteUrl: 'https://publify.com',
    adminEmail: 'admin@publify.com',
    allowRegistration: true,
    requireEmailVerification: true,
    enableNotifications: true,
    maintenanceMode: false,
    maxUploadSize: '10',
    sessionTimeout: '24'
  });

  const handleSave = () => {
    addNotification({
      title: 'Configuración guardada',
      message: 'Los cambios se han aplicado correctamente',
      type: 'success'
    });
  };

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <PageLayout
      title="Configuración del Sistema"
      subtitle="Administra las configuraciones globales de la plataforma"
    >
      <div className="space-y-6">
        {/* Configuración General */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Configuración General
            </CardTitle>
            <CardDescription>
              Configuraciones básicas del sitio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nombre del Sitio</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange('siteName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteUrl">URL del Sitio</Label>
                <Input
                  id="siteUrl"
                  value={settings.siteUrl}
                  onChange={(e) => handleSettingChange('siteUrl', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Email del Administrador</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Usuarios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Configuración de Usuarios
            </CardTitle>
            <CardDescription>
              Controla el registro y acceso de usuarios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Permitir Registro</Label>
                <p className="text-sm text-muted-foreground">
                  Los usuarios pueden crear nuevas cuentas
                </p>
              </div>
              <Switch
                checked={settings.allowRegistration}
                onCheckedChange={(checked) => handleSettingChange('allowRegistration', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Verificación de Email</Label>
                <p className="text-sm text-muted-foreground">
                  Requiere verificación de email para nuevos usuarios
                </p>
              </div>
              <Switch
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxUploadSize">Tamaño Máximo de Subida (MB)</Label>
                <Input
                  id="maxUploadSize"
                  type="number"
                  value={settings.maxUploadSize}
                  onChange={(e) => handleSettingChange('maxUploadSize', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Timeout de Sesión (horas)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </CardTitle>
            <CardDescription>
              Configuración de notificaciones del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Habilitar Notificaciones</Label>
                <p className="text-sm text-muted-foreground">
                  Envía notificaciones por email a los usuarios
                </p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => handleSettingChange('enableNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Mantenimiento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Mantenimiento
            </CardTitle>
            <CardDescription>
              Herramientas de mantenimiento del sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Modo Mantenimiento</Label>
                <p className="text-sm text-muted-foreground">
                  Pone el sitio en modo mantenimiento
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Database className="w-4 h-4 mr-2" />
                Limpiar Cache
              </Button>
              <Button variant="outline" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reiniciar Sistema
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4">
          <Button variant="outline">
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </PageLayout>
  );
});

AdminSettings.displayName = 'AdminSettings';

export default AdminSettings;