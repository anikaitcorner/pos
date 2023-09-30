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
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ICategory } from "@codernex/types";
import { ColumnDef } from "@tanstack/react-table";
import { useAppDispatch, useTypedSelector } from "@/app/store";
import { fetchCategory, postCategory } from "@/app/actions/category.action";
import { DataTable } from "@/components/data-table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
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

const Category = React.memo(() => {
  const dispatch = useAppDispatch();

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
  const [open, setOpen] = useState(false);

  return (
    <PrintAbleLayout title="Categories">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex justify-end my-2">
          <Button
            onClick={() => setOpen(true)}
            className="border border-slate-500"
            variant={"outline"}
          >
            Add
          </Button>
        </div>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Are you sure absolutely to adding a category?
            </SheetTitle>
          </SheetHeader>
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>

      <DataTable data={categories} columns={columns} />
    </PrintAbleLayout>
  );
});

export default Category;
