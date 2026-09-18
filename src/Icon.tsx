import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";

const icons = {
  ArrowRight,
  ArrowUpRight,
  Building: Building2,
  Check,
  Menu,
  Moon,
  Sun,
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
