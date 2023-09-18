import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./sidebar";
import React, { useEffect } from "react";
import { Navbar } from "./navbar";
import { fetchBusiness } from "../actions/business.action";
import { useAppDispatch } from "../store";

export const RootLayout = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // dispatch(fetchProducts());
    dispatch(fetchBusiness(navigate));
  }, [dispatch, navigate]);

  return (
    <div className="w-full h-full min-h-screen flex scrollbar-hide">
      <Sidebar />
      <div className="flex-1 w-full scrollbar-hide">
        <Navbar />
        <div className="overflow-y-scroll scrollbar-hide px-4 py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
});
