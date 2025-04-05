
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './hooks/useTheme.tsx'
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found. Cannot mount React application.');
}

const root = createRoot(container);

root.render(
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
