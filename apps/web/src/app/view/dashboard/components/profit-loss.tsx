import { cn } from "@/lib/utils";

interface IProfitLoss {
  className?: string;
}

export const ProfitLoss: React.FC<IProfitLoss> = ({ className }) => {
  return <div className={cn("", className)}></div>;
};
