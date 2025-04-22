
import MotionWrapper from "@/components/motion/MotionWrapper";
import ContentCategoryCard from "@/components/dashboard/ContentCategoryCard";
import { BookText, BookMarked, BookType } from "lucide-react";
import { ContentCategory } from "@/components/dashboard/dashboardData";

interface ContentCategoriesProps {
  contentCategories: ContentCategory[];
}

export const ContentCategories = ({ contentCategories }: ContentCategoriesProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <MotionWrapper delay={0.1} type="fadeLeft">
        <ContentCategoryCard 
          title="Alto Contenido" 
          description="Libros con más de 100 páginas" 
          color="bg-blue-500" 
          icon={<BookText size={20} className="text-white" />} 
          count={contentCategories[0].count} 
          statusData={contentCategories[0].statusData} 
        />
      </MotionWrapper>
      <MotionWrapper delay={0.2} type="fadeUp">
        <ContentCategoryCard 
          title="Medio Contenido" 
          description="Libros entre 30-100 páginas" 
          color="bg-orange-500" 
          icon={<BookMarked size={20} className="text-white" />} 
          count={contentCategories[1].count} 
          statusData={contentCategories[1].statusData} 
        />
      </MotionWrapper>
      <MotionWrapper delay={0.3} type="fadeRight">
        <ContentCategoryCard 
          title="Bajo Contenido" 
          description="Libros con menos de 30 páginas" 
          color="bg-green-500" 
          icon={<BookType size={20} className="text-white" />} 
          count={contentCategories[2].count} 
          statusData={contentCategories[2].statusData} 
        />
      </MotionWrapper>
    </div>
  );
};
