
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './hooks/useTheme.tsx'
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
