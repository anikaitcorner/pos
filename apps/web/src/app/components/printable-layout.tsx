import { cn } from "@/lib/utils";
import React from "react";
import { TbFileSpreadsheet, TbFileTypePdf, TbPrinter } from "react-icons/tb";

interface IPrintableLayout {
  children: React.ReactNode;
  className?: string;
  title: string;
  showPdf?: boolean;
  showExcel?: boolean;
  showPrint?: boolean;
}

export const PrintAbleLayout: React.FC<IPrintableLayout> = React.memo(
  ({
    children,
    className,
    title,
    showExcel = false,
    showPdf = false,
    showPrint = false,
  }) => {
    return (
      <div className={cn("space-y-2", className)}>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex gap-x-3">
          {showExcel ? (
            <button className="text-green-700 w-20 text-2xl bg-white px-2 py-1 flex gap-x-1 items-center rounded-md">
              <TbFileSpreadsheet /> <span className="text-sm">Excel</span>
            </button>
          ) : (
            ""
          )}

          {showPdf ? (
            <button className="text-red-800 w-20 text-2xl bg-white px-2 py-1 flex gap-x-1 items-center rounded-md">
              <TbFileTypePdf /> <span className="text-sm">PDF</span>
            </button>
          ) : (
            ""
          )}
          {showPrint ? (
            <button className="text-green-500 w-20 text-2xl bg-white px-2 py-1 flex gap-x-1 items-center rounded-md">
              <TbPrinter /> <span className="text-sm">Print</span>
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="mt-2">{children}</div>
      </div>
    );
  }
);
