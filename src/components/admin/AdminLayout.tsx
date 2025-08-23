import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from './AdminSidebar';

export const AdminLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};