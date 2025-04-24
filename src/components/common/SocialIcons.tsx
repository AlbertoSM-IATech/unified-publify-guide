
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/publifyai",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/company/publifyai",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/publifyai",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@publifyai",
  },
] as const;

interface SocialIconsProps {
  className?: string;
  iconSize?: number;
  variant?: "default" | "footer" | "sidebar";
}

export const SocialIcons = ({ 
  className = "", 
  iconSize = 20, 
  variant = "default" 
}: SocialIconsProps) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map((social) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-muted-foreground hover:text-[#FB923C] transition-colors ${
            variant === "sidebar" ? "text-sidebar-foreground hover:text-[#FB923C]" : ""
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <social.icon size={iconSize} />
          <span className="sr-only">{social.name}</span>
        </motion.a>
      ))}
    </div>
  );
};
