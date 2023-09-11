import { useEffect, useMemo, useState } from "react";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserSchema } from "@codernex/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IApiError, IApiResponse, IUser } from "@codernex/types";
import api from "../../../../api";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const SignUp: React.FC = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const isAuth = useMemo(() => isAuthenticated(), [isAuthenticated]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      password: "",
      username: "",
      email: "",
      name: "",
      secret: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createUserSchema>> = async (
    value
  ) => {
    console.log("Hello");

    setIsLoading(true);
    api
      .post<
        IApiResponse<{ user: IUser; accessToken: string; refreshToken: string }>
      >("/users", value)
      .then((response) => {
        if (response.data.data) {
          signIn({
            expiresIn: 60,
            token: response.data.data.accessToken,
            tokenType: "Bearer",
            authState: response.data.data.user,
            refreshToken: response.data.data.refreshToken,
            refreshTokenExpireIn: 60 * 24,
          });

          navigate("/", { replace: true });
        }
      })
      .catch((err: AxiosError<IApiResponse<IApiError>>) => {
        toast.error(err?.response?.data?.error?.message as string);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isAuth) {
      return navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div className="w-full h-screen flex gap-y-2 flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-sm text-center bg-slate-900 px-6 py-4 rounded-md"
        >
          <h1 className="text-2xl font-semibold">Sing Up</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Eg: Jhon Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="borhan.dev" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secret"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Secret</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Secret key provided by Developer"
                    {...field}
                  />
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
              disabled={isLoading}
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

export default SignUp;
