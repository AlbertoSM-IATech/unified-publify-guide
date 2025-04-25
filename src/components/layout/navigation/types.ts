
import { ReactNode } from "react";

export interface SubMenuItem {
  path: string;
  icon: ReactNode;
  label: string;
  tooltip?: string;
}

export interface MenuItem {
  path: string;
  icon: ReactNode;
  label: string;
  tooltip?: string;
  subItems?: SubMenuItem[];
}
