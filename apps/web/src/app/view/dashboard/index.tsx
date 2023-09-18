import { Separator } from "@/components/ui/separator";
import LineChart from "./components/chart";
import { Stats } from "./components/stats";
import { TbPremiumRights, TbBoxAlignBottom } from "react-icons/tb";
import { useAppDispatch } from "@/app/store";
import React, { useEffect } from "react";
import { fetchProducts } from "@/app/actions/products.action";

const Dashboard = React.memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
        <Stats
          icon={TbPremiumRights}
          count={1000}
          title="Today sales"
          prevCount={600}
        />
        <Stats
          icon={TbPremiumRights}
          count={20000}
          title="This Month Sales"
          prevCount={30000}
        />
        <Stats icon={TbPremiumRights} count={5000} title="Today Expenses" />
        <Stats
          icon={TbPremiumRights}
          count={20000}
          title="This Month Expenses"
          prevCount={30000}
        />
        <Stats icon={TbBoxAlignBottom} count={500} title="Total Products" />
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-12 mt-10">
        <div className="col-span-12 md:col-span-7 lg:col-span-7">
          <h2 className="font-semibold text-2xl">Daily Sales Chart</h2>
          <LineChart />
        </div>
        <div className="col-span-12 md:col-span-5 lg:col-span-5">
          <h2 className="font-semibold text-2xl">Profit Loss Statistic</h2>
        </div>
      </div>
    </div>
  );
});

export default Dashboard;
