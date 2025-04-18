
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BookFormatSelectorProps {
  selectedFormat: string;
  onChange: (value: string) => void;
  isEditing: boolean;
}

export const BookFormatSelector = ({ selectedFormat, onChange, isEditing }: BookFormatSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label>Tipo de Contenido</Label>
      <RadioGroup
        defaultValue={selectedFormat}
        onValueChange={onChange}
        className="flex flex-col space-y-1"
        disabled={!isEditing}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="hardcover" id="hardcover" />
          <Label htmlFor="hardcover" className="cursor-pointer">Tapa dura</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="paperback" id="paperback" />
          <Label htmlFor="paperback" className="cursor-pointer">Tapa blanda</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ebook" id="ebook" />
          <Label htmlFor="ebook" className="cursor-pointer">eBook</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
