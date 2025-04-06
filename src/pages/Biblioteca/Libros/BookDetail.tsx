
import { useBookDetail } from "./hooks/useBookDetail";
import { BookHeader } from "./components/BookDetail/BookHeader";
import { BookSidebar } from "./components/BookDetail/BookSidebar";
import { DetailedTabs } from "./components/BookDetail/DetailedTabs";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
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
  hidden: { y: 20, opacity: 0 },
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
  const {
    bookData,
    isEditing,
    saving,
    libroOriginal,
    handleGoBack,
    handleEdit,
    handleSave,
    handleDelete,
    handleCancel,
    handleUpdateBook
  } = useBookDetail();

  if (!libroOriginal || !bookData) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 flex justify-center items-center h-64"
      >
        <div className="animate-pulse flex space-x-3">
          <div className="h-4 w-4 bg-primary rounded-full animate-bounce"></div>
          <div className="h-4 w-4 bg-primary rounded-full animate-bounce [animation-delay:-.3s]"></div>
          <div className="h-4 w-4 bg-primary rounded-full animate-bounce [animation-delay:-.5s]"></div>
        </div>
        <span className="ml-3">Cargando libro...</span>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 relative"
    >
      {/* Animated background gradient */}
      <div className="absolute top-24 -left-20 w-72 h-72 bg-[#FB923C]/10 rounded-full filter blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-[#3B82F6]/10 rounded-full filter blur-3xl animate-pulse-soft [animation-delay:-.5s]" />
      
      <div className="relative z-10">
        <motion.div variants={itemVariants}>
          <BookHeader 
            isEditing={isEditing}
            onGoBack={handleGoBack}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            onCancel={handleCancel}
            isSaving={saving}
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column: Book cover and basic info card */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <BookSidebar 
              book={bookData} 
              isEditing={isEditing} 
              onUpdateBook={handleUpdateBook} 
            />
          </motion.div>

          {/* Right column: Tabs with detailed information */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <DetailedTabs 
              book={bookData} 
              isEditing={isEditing} 
              onUpdateBook={handleUpdateBook} 
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookDetail;
