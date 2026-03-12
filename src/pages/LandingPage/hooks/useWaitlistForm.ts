import { useState, createContext, useContext } from "react";
import { useToast } from "@/hooks/use-toast";

interface WaitlistState {
  name: string;
  email: string;
  loading: boolean;
  submitted: boolean;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const WaitlistContext = createContext<WaitlistState | null>(null);

export const WaitlistProvider = WaitlistContext.Provider;

export const useWaitlistForm = (): WaitlistState => {
  const ctx = useContext(WaitlistContext);
  if (ctx) return ctx;
  // fallback — should not happen if provider is used
  throw new Error("useWaitlistForm must be used within WaitlistProvider");
};

export const useWaitlistState = (): WaitlistState => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({ title: "Introduce tu nombre y email", variant: "destructive" });
      return;
    }
    setLoading(true);
    // TODO: connect to backend
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return { name, email, loading, submitted, setName, setEmail, handleSubmit };
};
