
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface LibraryHeaderProps {
  onCreateBook: () => void;
}

export const LibraryHeader = ({ onCreateBook }: LibraryHeaderProps) => {
  return (
    <motion.div 
      className="mb-8 flex flex-col justify-between md:flex-row md:items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div>
        <h1 className="font-heading text-2xl font-bold md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#FB923C]">
          Biblioteca
        </h1>
        <p className="mt-1 text-muted-foreground">Gestiona tus libros y colecciones</p>
      </div>
      <motion.button 
        className="mt-4 flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-all duration-200 md:mt-0"
        onClick={onCreateBook}
        whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={18} className="mr-2" />
        Nuevo Libro
      </motion.button>
    </motion.div>
  );
};
