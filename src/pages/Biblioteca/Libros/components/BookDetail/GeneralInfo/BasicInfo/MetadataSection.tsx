
import { Book } from "../../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormField, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileText, Copy, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";
import { useLinkCopy } from "./hooks/useLinkCopy";
interface MetadataSectionProps {
  book: Book;
  isEditing: boolean;
  form: UseFormReturn<any>;
}
export const MetadataSection = ({
  book,
  isEditing,
  form
}: MetadataSectionProps) => {
  const {
    copyLink
  } = useLinkCopy();
  return <div className="space-y-6 mt-8">
      <div className="flex items-center">
        <h3 className="text-lg font-extrabold text-blue-500">Metadatos</h3>
        <Separator className="flex-grow ml-3" />
      </div>
      
      {/* Best Seller Rank */}
      <div className="grid gap-3">
        <Label htmlFor="bsr">BSR (Best Seller Rank)</Label>
        {isEditing ? <FormField control={form.control} name="bsr" render={({
        field
      }) => <Input id="bsr" placeholder="Ranking de ventas (p. ej. 12345)" type="number" {...field} value={field.value || ''} onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)} />} /> : <div className="border rounded-md p-2 bg-card shadow-sm">{book.bsr ? `#${book.bsr}` : "No disponible"}</div>}
      </div>
      
      {/* Landing Page URL */}
      <div className="grid gap-3">
        <Label htmlFor="landingPageUrl">URL de Landing Page</Label>
        {isEditing ? <FormField control={form.control} name="landingPageUrl" render={({
        field
      }) => <div className="flex gap-2">
                <Input id="landingPageUrl" placeholder="https://mipagina.com/libro" type="url" {...field} value={field.value || ''} />
                {field.value && <Button type="button" size="icon" variant="outline" className="flex-shrink-0" onClick={() => window.open(field.value, '_blank')}>
                    <FileText size={16} />
                  </Button>}
              </div>} /> : book.landingPageUrl ? <div className="flex items-center gap-2">
              <a href={book.landingPageUrl} target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#FB923C] hover:underline flex items-center gap-1 border rounded-md p-2 bg-card shadow-sm flex-grow">
                <ExternalLink size={16} /> {book.landingPageUrl}
              </a>
              <Button type="button" size="sm" variant="ghost" className="h-7 px-2 flex-shrink-0" onClick={() => copyLink(book.landingPageUrl, "URL de Landing Page")}>
                <Copy size={14} />
              </Button>
            </div> : <div className="border rounded-md p-2 bg-card shadow-sm">No definida</div>}
      </div>
    </div>;
};
