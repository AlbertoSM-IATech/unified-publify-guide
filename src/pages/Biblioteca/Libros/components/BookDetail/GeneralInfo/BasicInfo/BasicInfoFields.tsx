
import { Book } from "../../../../types/bookTypes";
import { UseFormReturn } from "react-hook-form";
import { BasicInfoSection } from "./BasicInfoSection";
import { DescriptionSection } from "./DescriptionSection";
import { MetadataSection } from "./MetadataSection";

interface BasicInfoFieldsProps {
  book: Book;
  isEditing: boolean;
  form: any; // Using 'any' here to handle the extended form object from useGeneralInfoForm
}

export const BasicInfoFields = ({ book, isEditing, form }: BasicInfoFieldsProps) => {
  return (
    <>
      {/* Sección de Información Básica */}
      <BasicInfoSection book={book} isEditing={isEditing} form={form} />

      {/* Sección de Descripción */}
      <DescriptionSection book={book} isEditing={isEditing} form={form} />

      {/* Sección de Metadatos */}
      <MetadataSection book={book} isEditing={isEditing} form={form} />
    </>
  );
};
