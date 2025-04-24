
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

export const TermsCheckbox = ({ checked, onCheckedChange, error }: TermsCheckboxProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="acceptTerms" 
          name="acceptTerms" 
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <label
          htmlFor="acceptTerms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Acepto los{" "}
          <Link 
            to="/terminos-y-condiciones"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Términos y Condiciones
          </Link>
          {" "}y la{" "}
          <Link 
            to="/politica-privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Política de Privacidad
          </Link>
        </label>
      </div>
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
};
