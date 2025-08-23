
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import { ThemeProvider } from './hooks/useTheme.tsx';
import { QueryProvider } from './providers/QueryProvider.tsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.tsx';
import './styles/custom-apexcharts.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryProvider>
        <Router>
          <AuthProvider>
            <UserProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </UserProvider>
          </AuthProvider>
        </Router>
      </QueryProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)

