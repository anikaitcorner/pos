import { Button } from "@/components/ui/button";
import { TbCashBanknote } from "react-icons/tb";
export const Navbar = () => {
  return (
    <nav className="flex justify-between px-4 items-center py-2">
      <div></div>
      <div className="flex space-x-3">
        <Button className="px-3 py-1 flex  h-fit text-[16px] space-x-2 bg-slate-700 text-slate-200 border border-slate-50 hover:text-slate-900">
          <TbCashBanknote className="text-xl" />
          <span>POS</span>
        </Button>
        <Button className="px-3 py-1 flex  h-fit text-[16px] space-x-2 bg-indigo-900 text-slate-200 border border-slate-50 hover:text-slate-900">
          <TbCashBanknote className="text-xl" />
          <span>POS</span>
        </Button>
      </div>
    </nav>
  );
};
