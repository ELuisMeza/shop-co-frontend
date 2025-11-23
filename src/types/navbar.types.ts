import type { LucideIcon } from "lucide-react";
import type { RolesUser } from "../lib/roles";

export interface NavItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  type: NavItemType;
  to?: string;
  onClick?: () => void;
  visibleFor?: RolesUser[];
  variant?: "primary" | "secondary" | "icon" | "danger";
  showInMobile?: boolean;
  showInDesktop?: boolean;
  dropdownItems?: NavItem[];
}

export type NavItemType = "link" | "button" | "dropdown";