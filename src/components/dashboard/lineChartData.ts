
import { useFinanceData } from "@/data/financesData";

export const getLineChartData = () => {
  // This function is kept for backward compatibility
  // We will use the synchronized data from useFinanceData instead
  // when available
  return [
    { name: "Ene", balance: 1600 },
    { name: "Feb", balance: 1600 },
    { name: "Mar", balance: -7000 },
    { name: "Abr", balance: -1128 },
    { name: "May", balance: -2910 },
    { name: "Jun", balance: -1410 },
    { name: "Jul", balance: -810 },
    { name: "Ago", balance: 1390 },
    { name: "Sep", balance: 1390 },
    { name: "Oct", balance: 3000 },
    { name: "Nov", balance: 3100 },
    { name: "Dic", balance: 3200 },
  ];
};

export const useFinanceChartData = () => {
  const { lineChartData } = useFinanceData();
  return lineChartData;
};
