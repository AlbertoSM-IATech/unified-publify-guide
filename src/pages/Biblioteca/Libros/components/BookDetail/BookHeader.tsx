
import { AlertTriangle, ArrowLeft, FileEdit, Save, Trash, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";

interface BookHeaderProps {
  isEditing: boolean;
  isSaving?: boolean;
  onGoBack: () => void;
  onEdit: () => void;
  onSave: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

export const BookHeader = ({
  isEditing,
  isSaving = false,
  onGoBack,
  onEdit,
  onSave,
  onDelete,
  onCancel
}: BookHeaderProps) => {
  const buttonVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 5px 15px rgba(251, 146, 60, 0.2)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.97 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
    >
      <div className="flex items-center">
        <motion.div whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
          <Button variant="ghost" size="sm" className="mr-2 group" onClick={onGoBack}>
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:translate-x-[-3px] transition-transform" />
            <span className="font-medium">Volver a la biblioteca</span>
          </Button>
        </motion.div>
      </div>

      <div className="flex space-x-3">
        {isEditing ? (
          <>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onCancel} 
                className="md:w-auto font-medium" 
                disabled={isSaving}
              >
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
            </motion.div>
            
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button 
                variant="default" 
                size="sm" 
                onClick={onSave} 
                className="md:w-auto font-medium bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white shadow-md" 
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-red-200 md:w-auto bg-red-700 hover:bg-red-600 text-red-50 font-semibold shadow-md"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      <div className="flex items-center text-red-500">
                        <AlertTriangle className="mr-2 h-5 w-5" />
                        ¿Estás seguro?
                      </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. El libro será eliminado permanentemente de tu biblioteca.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-neutral-100 dark:bg-neutral-700">Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={onDelete} 
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>
            
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button 
                variant="default" 
                size="sm" 
                onClick={onEdit} 
                className="md:w-auto font-medium bg-[#FB923C] hover:bg-[#FB923C]/90 text-white shadow-md"
              >
                <FileEdit className="mr-2 h-4 w-4" />
                Editar Libro
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};
