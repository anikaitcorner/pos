import { createNewBusiness } from "@/app/actions/business.action";
import { useAppDispatch } from "@/app/store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBusinessSchema } from "@codernex/schema";
import { IUser } from "@codernex/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { useAuthUser } from "react-auth-kit";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";

const CreateBusiness: React.FC = () => {
  const authUser = useAuthUser();
  const navigate = useNavigate();

  const user = useMemo(() => authUser(), [authUser]) as IUser;

  const form = useForm<z.infer<typeof createBusinessSchema>>({
    defaultValues: {
      location: "",
      name: "",
    },
    resolver: zodResolver(createBusinessSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<z.infer<typeof createBusinessSchema>> = (
    value
  ) => {
    dispatch(createNewBusiness(value));
    navigate("/");
  };

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-sm text-center bg-slate-900 px-6 py-4 rounded-md"
        >
          <h1 className="text-2xl font-semibold">Onboard Your Business</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Eg: Uttara Motors" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Eg: Rn Rd, Jashore" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AnimatePresence>
            <motion.button
              whileTap={{
                scale: 1.3,
                transition: {
                  ease: "easeInOut",
                },
                animationDuration: "initial",
              }}
              className="bg-white px-4 py-1 rounded-md text-gray-700"
              type="submit"
            >
              Sign UP
            </motion.button>
          </AnimatePresence>
        </form>
      </Form>
    </div>
  );
};

export default CreateBusiness;
