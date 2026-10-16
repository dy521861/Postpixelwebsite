import { AirVent, Bug, Car, Droplets, House, Sparkles, Trees, Wrench, type LucideProps } from "lucide-react";
import type { TradeIcon as TradeIconName } from "@/content/trades";

const icons = {
  hvac: AirVent,
  plumbing: Wrench,
  roofing: House,
  landscaping: Trees,
  cleaning: Sparkles,
  pest: Bug,
  pressure: Droplets,
  detailing: Car,
} satisfies Record<TradeIconName, React.ComponentType<LucideProps>>;

export function TradeIcon({ name, ...props }: { name: TradeIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" {...props} />;
}
