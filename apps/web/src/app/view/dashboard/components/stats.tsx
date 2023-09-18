import { cn } from "@/lib/utils";
import { calculateDiffPercent } from "@/utils";
import React from "react";
import { TbTrendingDown, TbTrendingUp } from "react-icons/tb";

interface IStats {
  icon: any;
  count: number;
  title: string;
  prevCount?: number;
  showPrevCount?: boolean;
}

export const Stats: React.FC<IStats> = React.memo(
  ({ showPrevCount = true, ...props }) => {
    return (
      <div className="border border-slate-600 w-full max-w-[250px] px-4 py-2 space-y-4 font-robotoMono rounded-sm">
        <h2 className="font-normal text-left">{props.title}</h2>
        <div className="flex justify-between items-end">
          <div className="text-2xl flex items-center">
            <props.icon className="text-xl" />
            <h3>{props.count}</h3>
          </div>
          {props.prevCount && showPrevCount && (
            <span
              className={cn(
                "text-xs flex items-center gap-x-1",
                calculateDiffPercent(props.prevCount, props.count).includes("+")
                  ? "text-green-600"
                  : "text-red-500"
              )}
            >
              {calculateDiffPercent(props.prevCount, props.count).includes(
                "+"
              ) ? (
                <TbTrendingUp />
              ) : (
                <TbTrendingDown />
              )}{" "}
              {calculateDiffPercent(props.prevCount, props.count)}
            </span>
          )}
        </div>
      </div>
    );
  }
);
