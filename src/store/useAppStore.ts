import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin' | 'super_admin';
  avatar?: string;
}

interface AppState {
  // Usuario
  user: User | null;
  isAuthenticated: boolean;
  
  // UI State
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  
  // Datos en cache
  books: any[];
  collections: any[];
  investigations: any[];
  
  // Loading states
  loadingStates: {
    books: boolean;
    collections: boolean;
    investigations: boolean;
    dashboard: boolean;
  };
  
  // Notificaciones
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    createdAt: Date;
  }>;
}

interface AppActions {
  // Usuario actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  logout: () => void;
  
  // UI actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  // Data actions
  setBooks: (books: any[]) => void;
  setCollections: (collections: any[]) => void;
  setInvestigations: (investigations: any[]) => void;
  addBook: (book: any) => void;
  updateBook: (id: string, updates: any) => void;
  removeBook: (id: string) => void;
  
  // Loading actions
  setLoading: (key: keyof AppState['loadingStates'], loading: boolean) => void;
  
  // Notifications actions
  addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'createdAt' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  
  // Reset state
  resetStore: () => void;
}

type Store = AppState & AppActions;

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  sidebarCollapsed: false,
  theme: 'system',
  books: [],
  collections: [],
  investigations: [],
  loadingStates: {
    books: false,
    collections: false,
    investigations: false,
    dashboard: false,
  },
  notifications: [],
};

export const useAppStore = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Usuario actions
        setUser: (user) => set({ user }, false, 'setUser'),
        setAuthenticated: (isAuthenticated) => set({ isAuthenticated }, false, 'setAuthenticated'),
        logout: () => set({ 
          user: null, 
          isAuthenticated: false,
          books: [],
          collections: [],
          investigations: [],
          notifications: []
        }, false, 'logout'),
        
        // UI actions
        toggleSidebar: () => set((state) => ({ 
          sidebarCollapsed: !state.sidebarCollapsed 
        }), false, 'toggleSidebar'),
        setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }, false, 'setSidebarCollapsed'),
        setTheme: (theme) => set({ theme }, false, 'setTheme'),
        
        // Data actions
        setBooks: (books) => set({ books }, false, 'setBooks'),
        setCollections: (collections) => set({ collections }, false, 'setCollections'),
        setInvestigations: (investigations) => set({ investigations }, false, 'setInvestigations'),
        addBook: (book) => set((state) => ({ 
          books: [...state.books, book] 
        }), false, 'addBook'),
        updateBook: (id, updates) => set((state) => ({
          books: state.books.map(book => 
            book.id === id ? { ...book, ...updates } : book
          )
        }), false, 'updateBook'),
        removeBook: (id) => set((state) => ({
          books: state.books.filter(book => book.id !== id)
        }), false, 'removeBook'),
        
        // Loading actions
        setLoading: (key, loading) => set((state) => ({
          loadingStates: {
            ...state.loadingStates,
            [key]: loading
          }
        }), false, 'setLoading'),
        
        // Notifications actions
        addNotification: (notification) => set((state) => ({
          notifications: [
            {
              ...notification,
              id: `notification-${Date.now()}-${Math.random()}`,
              createdAt: new Date(),
              read: false
            },
            ...state.notifications
          ]
        }), false, 'addNotification'),
        markNotificationAsRead: (id) => set((state) => ({
          notifications: state.notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
          )
        }), false, 'markNotificationAsRead'),
        clearNotifications: () => set({ notifications: [] }, false, 'clearNotifications'),
        
        // Reset state
        resetStore: () => set(initialState, false, 'resetStore'),
      }),
      {
        name: 'publify-app-store',
        partialize: (state) => ({
          theme: state.theme,
          sidebarCollapsed: state.sidebarCollapsed,
          // No persistir datos sensibles ni temporales
        }),
      }
    ),
    {
      name: 'PublifyAppStore',
    }
  )
);

// Selectores optimizados
export const useUser = () => useAppStore(state => state.user);
export const useAuth = () => useAppStore(state => ({ 
  isAuthenticated: state.isAuthenticated, 
  user: state.user 
}));
export const useThemeStore = () => useAppStore(state => ({ 
  theme: state.theme, 
  setTheme: state.setTheme 
}));
export const useSidebar = () => useAppStore(state => ({ 
  collapsed: state.sidebarCollapsed, 
  toggle: state.toggleSidebar,
  setCollapsed: state.setSidebarCollapsed
}));
export const useNotifications = () => useAppStore(state => ({
  notifications: state.notifications,
  addNotification: state.addNotification,
  markAsRead: state.markNotificationAsRead,
  clear: state.clearNotifications
}));