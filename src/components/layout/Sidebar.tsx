
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { SocialIcons } from "@/components/common/SocialIcons";
import { useTheme } from "@/hooks/useTheme";
import { NavigationMenu } from "./navigation/NavigationMenu";

const sidebarVariants = {
  open: { x: 0, opacity: 1 },
  closed: { x: "-100%", opacity: 0 }
};

const Sidebar = ({ 
  open, 
  onClose 
}: { 
  open: boolean; 
  onClose: () => void 
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <>
      {open && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      
      <motion.aside
        variants={sidebarVariants}
        animate={open ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-[#1e1e1e] border-r border-[#cacaca]/10 dark:border-[#3e3e3e]/10 lg:relative lg:translate-x-0"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b border-[#cacaca]/10 dark:border-[#3e3e3e]/10 px-4">
            <Link to="/dashboard" className="flex items-center">
              <span className="font-heading text-xl font-bold text-black dark:text-white">
                Publify
              </span>
            </Link>
            
            <button 
              className="ml-auto rounded-full p-1 hover:bg-black/10 dark:hover:bg-white/10 lg:hidden" 
              onClick={onClose}
            >
              <X size={18} className="text-black dark:text-white" />
            </button>
          </div>
          
          <NavigationMenu />
          
          <div className="border-t border-[#cacaca]/10 dark:border-[#3e3e3e]/10 p-4">
            <SocialIcons className="justify-center" variant="sidebar" />
            <div className="text-xs text-black/70 dark:text-white/70 text-center mt-4">
              Publify v0.1.0
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
