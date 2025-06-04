
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

// Simple test component
const TestPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black mb-4">¡Aplicación funcionando!</h1>
        <p className="text-lg text-gray-600">La aplicación se ha cargado correctamente.</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="*" element={<TestPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
