
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart as PieChartIcon } from 'lucide-react'; // Renombrado para evitar conflicto

interface PieChartNoDataProps {
  title: string;
  description: string;
  className?: string;
}

const PieChartNoData: React.FC<PieChartNoDataProps> = ({ title, description, className }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <PieChartIcon size={20} className="text-green-500" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="py-10 text-center text-muted-foreground">
        No data available to display chart
      </CardContent>
    </Card>
  );
};

export default PieChartNoData;

