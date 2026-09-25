import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Globe2,
  Hotel,
  Landmark,
  Menu,
  MessageSquare,
  Moon,
  Package,
  ShieldCheck,
  Sun,
  Users,
  Workflow,
  X,
} from "lucide-react";

const icons = {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Building: Building2,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Globe2,
  Hotel,
  Landmark,
  Menu,
  MessageSquare,
  Moon,
  Package,
  ShieldCheck,
  Sun,
  Users,
  Workflow,
  X,
};

type IconProps = {
  name: keyof typeof icons;
  size?: number;
};

export function Icon({ name, size = 20 }: IconProps) {
  const Component = icons[name];
  return <Component size={size} strokeWidth={1.7} aria-hidden="true" />;
}
