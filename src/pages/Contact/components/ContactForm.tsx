
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "@/hooks/useForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toastService } from "@/utils/toast";
import { Link } from "react-router-dom";

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  acceptPrivacy: boolean;
}

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, handleChange, handleSubmit, setFieldValue } = useForm<ContactFormData>({
    initialValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
      acceptPrivacy: false,
    },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        toastService.success("Mensaje enviado", "Nos pondremos en contacto contigo pronto.");
        // Reset form here if needed
      } catch (error) {
        toastService.error("Error al enviar", "Por favor, inténtalo de nuevo más tarde.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card p-6 rounded-lg shadow-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre completo</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={values.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Asunto</Label>
          <Select onValueChange={(value) => setFieldValue("subject", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un asunto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soporte">Soporte técnico</SelectItem>
              <SelectItem value="colaboracion">Colaboración</SelectItem>
              <SelectItem value="feedback">Feedback</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            name="message"
            required
            value={values.message}
            onChange={handleChange}
            className="min-h-[150px]"
          />
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="acceptPrivacy"
            checked={values.acceptPrivacy}
            onCheckedChange={(checked) => setFieldValue("acceptPrivacy", checked)}
          />
          <Label htmlFor="acceptPrivacy" className="text-sm">
            Acepto la{" "}
            <Link 
              to="/politica-privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              política de privacidad
            </Link>{" "}
            y tratamiento de datos.
          </Label>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting || !values.acceptPrivacy}
        >
          {isSubmitting ? "Enviando..." : "Enviar mensaje"}
        </Button>
      </form>
    </motion.div>
  );
};
