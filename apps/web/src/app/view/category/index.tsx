import { PrintAbleLayout } from "@/app/components/printable-layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCategorySchema } from "@codernex/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ICategory } from "@codernex/types";
import { ColumnDef } from "@tanstack/react-table";
import { useAppDispatch, useTypedSelector } from "@/app/store";
import { fetchCategory, postCategory } from "@/app/actions/category.action";
import { DataTable } from "@/components/data-table";
const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "id",
    header: "SL",
    cell(props) {
      return props.row.index + 1;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];
const animation: Variants = {
  initial: {
    opacity: 0,
    y: -300,
    height: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeIn",
      duration: 0.5,
    },
    height: "fit-content",
  },
  exit: {
    opacity: 0,
    y: -300,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

const Category = React.memo(() => {
  const [toggleCreateCategory, setToggleCreateCategory] = useState(false);
  const dispatch = useAppDispatch();

  const handleToggle = useCallback(
    () => setToggleCreateCategory((prev) => !prev),
    []
  );

  const form = useForm<z.infer<typeof createCategorySchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof createCategorySchema>> = (
    value
  ) => {
    dispatch(postCategory(value));
    form.reset();
  };

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const { categories, isLoading } = useTypedSelector(
    (state) => state.categories
  );

  return (
    <PrintAbleLayout title="Categories">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            handleToggle();
          }}
          className="border border-slate-500"
          variant={"outline"}
        >
          {toggleCreateCategory ? "Close" : "Add"}
        </Button>
      </div>
      <AnimatePresence>
        <motion.div
          variants={animation}
          initial="initial"
          animate={toggleCreateCategory ? "animate" : "exit"}
          className="border border-slate-400 px-3 py-2 rounded-md my-4"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 py-4"
            >
              <FormField
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                name="name"
              />

              <Button>Submit</Button>
            </form>
          </Form>
        </motion.div>
      </AnimatePresence>
      <DataTable data={categories} columns={columns} />
    </PrintAbleLayout>
  );
});

export default Category;
