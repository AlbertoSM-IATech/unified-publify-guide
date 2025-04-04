
import { useBookDetail } from "./hooks/useBookDetail";
import { BookHeader } from "./components/BookDetail/BookHeader";
import { BookSidebar } from "./components/BookDetail/BookSidebar";
import { DetailedTabs } from "./components/BookDetail/DetailedTabs";

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
    return <div className="p-6">Cargando libro...</div>;
  }

  return (
    <div className="animate-fade-in p-6">
      <BookHeader 
        isEditing={isEditing}
        onGoBack={handleGoBack}
        onEdit={handleEdit}
        onSave={handleSave}
        onDelete={handleDelete}
        onCancel={handleCancel}
        isSaving={saving}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column: Book cover and basic info card */}
        <div className="lg:col-span-1">
          <BookSidebar 
            book={bookData} 
            isEditing={isEditing} 
            onUpdateBook={handleUpdateBook} 
          />
        </div>

        {/* Right column: Tabs with detailed information */}
        <div className="lg:col-span-2">
          <DetailedTabs 
            book={bookData} 
            isEditing={isEditing} 
            onUpdateBook={handleUpdateBook} 
          />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
