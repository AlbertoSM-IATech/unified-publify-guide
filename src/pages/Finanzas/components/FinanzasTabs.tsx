
import { UploadIcon, PieChart, BarChart, Calculator, FilePlus2 } from "lucide-react";

interface FinanzasTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const FinanzasTabs = ({ activeTab, setActiveTab }: FinanzasTabsProps) => {
  const tabs = [
    { id: "resumen", label: "Resumen", icon: <PieChart size={16} /> },
    { id: "ingresos", label: "Ingresos", icon: <BarChart size={16} /> },
    { id: "gastos", label: "Gastos", icon: <BarChart size={16} /> },
    { id: "costesFijos", label: "Costes Fijos", icon: <Calculator size={16} /> },
  ];

  return (
    <div className="mb-6 flex space-x-1 rounded-lg border bg-card p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex flex-1 items-center justify-center space-x-1 rounded-md px-3 py-2 text-sm font-medium transition-colors sm:flex-none sm:justify-start ${
            activeTab === tab.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.icon}
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
