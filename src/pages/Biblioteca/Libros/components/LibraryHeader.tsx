
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface LibraryHeaderProps {
  onCreateBook: () => void;
}

export const LibraryHeader = ({
  onCreateBook
}: LibraryHeaderProps) => {
  return (
    <motion.div 
      className="mb-8 flex flex-col justify-between md:flex-row md:items-center" 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">Libros</h1>
        <p className="mt-1 text-muted-foreground">Gestiona tus libros y colecciones</p>
      </div>
      
      <motion.button 
        onClick={onCreateBook} 
        className="mt-4 flex items-center rounded-md bg-[#FB923C] px-4 py-2 hover:bg-[#FB923C]/90 transition-all duration-300 md:mt-0 text-white font-semibold shadow-md"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 5px 15px rgba(251, 146, 60, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={18} className="mr-2" />
        Nuevo Libro
      </motion.button>
    </motion.div>
  );
};
