import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { useAppDispatch } from "../store";
import { useEffect } from "react";
import { fetchBusiness } from "../actions/business.action";
import { Navbar } from "./navbar";

export const RootLayout = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
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
};
