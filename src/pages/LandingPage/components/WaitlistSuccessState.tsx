import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

interface Props {
  compact?: boolean;
}

export const WaitlistSuccessState = ({ compact = false }: Props) => {
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 p-4 bg-accent/10 border border-accent/30 rounded-xl"
      >
        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground">¡Estás dentro!</p>
          <p className="text-xs text-muted-foreground">Te avisaremos antes del 1 de abril.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-8 bg-card border border-accent/30 rounded-2xl shadow-lg text-center space-y-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto"
      >
        <CheckCircle className="w-8 h-8 text-accent" />
      </motion.div>

      <h3 className="font-heading text-xl font-bold text-foreground">
        ¡Ya tienes tu plaza reservada!
      </h3>

      <p className="text-muted-foreground text-sm max-w-md mx-auto">
        Hemos registrado tu solicitud. Recibirás un email de confirmación y te avisaremos antes del 1 de abril con los próximos pasos.
      </p>

      <div className="bg-muted/50 border border-border rounded-lg p-4 text-left space-y-2">
        <p className="text-sm font-semibold text-foreground">Próximos pasos:</p>
        <ul className="space-y-1.5">
          <li className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowRight className="w-3 h-3 text-accent flex-shrink-0" />
            Revisa tu bandeja de entrada (y spam)
          </li>
          <li className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowRight className="w-3 h-3 text-accent flex-shrink-0" />
            Te enviaremos tu invitación por orden de registro
          </li>
          <li className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowRight className="w-3 h-3 text-accent flex-shrink-0" />
            Cuanto antes te registres, mejor precio bloqueas
          </li>
        </ul>
      </div>

      <p className="text-xs text-accent font-medium">
        Acceso exclusivo para los primeros 30 publishers
      </p>
    </motion.div>
  );
};
