
import { ReactNode } from "react";

export interface SubMenuItem {
  path: string;
  icon: ReactNode;
  label: string;
}

export interface MenuItem {
  path: string;
  icon: ReactNode;
  label: string;
  subItems?: SubMenuItem[];
}
