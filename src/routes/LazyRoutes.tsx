import { lazy } from 'react';

// Páginas públicas
export const LandingPage = lazy(() => 
  import('@/pages/LandingPage/LandingPage').then(module => ({ 
    default: module.LandingPage 
  }))
);

export const Login = lazy(() => 
  import('@/pages/Auth/Login').then(module => ({ 
    default: module.Login 
  }))
);

export const Register = lazy(() => 
  import('@/pages/Auth/Register').then(module => ({ 
    default: module.Register 
  }))
);

export const ForgotPassword = lazy(() => 
  import('@/pages/Auth/ForgotPassword').then(module => ({ 
    default: module.ForgotPassword 
  }))
);

export const ResetPassword = lazy(() => 
  import('@/pages/Auth/ResetPassword').then(module => ({ 
    default: module.ResetPassword 
  }))
);

export const VerifyEmail = lazy(() => 
  import('@/pages/Auth/VerifyEmail').then(module => ({ 
    default: module.VerifyEmail 
  }))
);

// Páginas principales protegidas
export const Dashboard = lazy(() => 
  import('@/pages/Dashboard/Dashboard').then(module => ({ 
    default: module.Dashboard 
  }))
);

export const LibrosList = lazy(() => 
  import('@/pages/Biblioteca/Libros/LibrosList').then(module => ({ 
    default: module.LibrosList 
  }))
);

export const BookDetail = lazy(() => 
  import('@/pages/Biblioteca/Libros/BookDetail')
);

export const ColeccionesList = lazy(() => 
  import('@/pages/Biblioteca/Colecciones/ColeccionesList')
);

export const ColeccionDetail = lazy(() => 
  import('@/pages/Biblioteca/Colecciones/ColeccionDetail')
);

export const InvestigacionesList = lazy(() => 
  import('@/pages/Biblioteca/Investigaciones/InvestigacionesList').then(module => ({ 
    default: module.InvestigacionesList 
  }))
);

export const Marketing = lazy(() => 
  import('@/pages/Marketing/Marketing').then(module => ({ 
    default: module.Marketing 
  }))
);

export const Finanzas = lazy(() => 
  import('@/pages/Finanzas/Finanzas').then(module => ({ 
    default: module.Finanzas 
  }))
);

export const Configuracion = lazy(() => 
  import('@/pages/Configuracion/Configuracion').then(module => ({ 
    default: module.Configuracion 
  }))
);

export const Perfil = lazy(() => 
  import('@/pages/Perfil/Perfil').then(module => ({ 
    default: module.Perfil 
  }))
);

// Panel de administrador - NUEVO
export const AdminDashboard = lazy(() => 
  import('@/pages/Admin/AdminDashboard')
);

export const AdminUsers = lazy(() => 
  import('@/pages/Admin/AdminUsers')
);

export const AdminBooks = lazy(() => 
  import('@/pages/Admin/AdminBooks')
);

export const AdminAnalytics = lazy(() => 
  import('@/pages/Admin/AdminAnalytics')
);

export const AdminSettings = lazy(() => 
  import('@/pages/Admin/AdminSettings')
);

export const AdminLogs = lazy(() => 
  import('@/pages/Admin/AdminLogs')
);

// Páginas legales y otras
export const TermsAndConditions = lazy(() => 
  import('@/pages/Legal/TermsAndConditions').then(module => ({ 
    default: module.TermsAndConditions 
  }))
);

export const PrivacyPolicy = lazy(() => 
  import('@/pages/Legal/PrivacyPolicy').then(module => ({ 
    default: module.PrivacyPolicy 
  }))
);

export const Contact = lazy(() => 
  import('@/pages/Contact/Contact').then(module => ({ 
    default: module.Contact 
  }))
);

export const NotFound = lazy(() => 
  import('@/pages/NotFound').then(module => ({ 
    default: module.NotFound 
  }))
);

// Checkout
export const Checkout = lazy(() => 
  import('@/pages/Checkout/Checkout')
);

export const CheckoutSuccess = lazy(() => 
  import('@/pages/Checkout/CheckoutSuccess')
);

export const CheckoutCancel = lazy(() => 
  import('@/pages/Checkout/CheckoutCancel')
);