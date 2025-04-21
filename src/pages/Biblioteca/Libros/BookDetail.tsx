import { useBookDetail } from "./hooks/bookDetail";
import { BookHeader } from "./components/BookDetail/BookHeader";
import { BookSidebar } from "./components/BookDetail/BookSidebar";
import { DetailedTabs } from "./components/BookDetail/DetailedTabs";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingState } from "@/components/common/LoadingState";
import { toast } from "@/hooks/use-toast";

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
      duration: 0.5
    }
  }
};

const itemVariants = {
  hidden: {
    y: 20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      console.error("No se proporcionó ID de libro, redirigiendo a la lista");
      navigate('/biblioteca/libros');
    }
  }, [id, navigate]);

  const {
    bookData,
    isEditing,
    saving,
    error,
    loading,
    libroOriginal,
    handleGoBack,
    handleEdit,
    handleSave,
    handleDelete,
    handleCancel,
    handleUpdateBook
  } = useBookDetail();

  console.log("BookDetail - Datos recibidos:", {
    bookData,
    loading,
    error,
    id
  });

  if (loading) {
    return <LoadingState text="Cargando libro..." fullPage={true} />;
  }

  if (error || !bookData && !loading) {
    return <ErrorState 
      title="Libro no encontrado" 
      message={error || "No pudimos encontrar el libro que estás buscando."} 
      onRetry={() => navigate('/biblioteca/libros')} 
      fullPage={true} 
    />;
  }

  if (!bookData) {
    return <ErrorState 
      title="Datos no disponibles" 
      message="No se pudieron cargar los datos del libro." 
      onRetry={() => window.location.reload()} 
      fullPage={true} 
    />;
  }

  const handleSaveWithFeedback = async () => {
    const success = await handleSave();
    if (success) {
      toast({
        title: "Cambios guardados",
        description: "Los cambios al libro han sido guardados exitosamente.",
        variant: "default",
      });
    } else {
      toast({
        title: "Error al guardar",
        description: "No se pudieron guardar los cambios. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      <div className="absolute top-20 -left-20 w-96 h-96 bg-[#FB923C]/5 rounded-full filter blur-[80px] animate-pulse-soft" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#3B82F6]/5 rounded-full filter blur-[80px] animate-pulse-soft [animation-delay:-.5s]" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-[#FB923C]/3 to-[#3B82F6]/3 rounded-full filter blur-[60px] animate-pulse-soft [animation-delay:-.25s]" />
      
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible" 
        className="relative z-10 p-6 px-[24px] py-[24px]"
      >
        <motion.div variants={itemVariants}>
          <BookHeader 
            isEditing={isEditing} 
            onGoBack={handleGoBack} 
            onEdit={handleEdit} 
            onSave={handleSaveWithFeedback}
            onDelete={handleDelete} 
            onCancel={handleCancel} 
            isSaving={saving} 
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <BookSidebar 
              book={bookData} 
              isEditing={isEditing} 
              onUpdateBook={handleUpdateBook} 
            />
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-2">
            <DetailedTabs 
              book={bookData} 
              isEditing={isEditing} 
              onUpdateBook={handleUpdateBook} 
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookDetail;
