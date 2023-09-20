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
import { createUnitSchema } from "@codernex/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { IUnit } from "@codernex/types";
import { ColumnDef } from "@tanstack/react-table";
import { useAppDispatch, useTypedSelector } from "@/app/store";
import { DataTable } from "@/components/data-table";
import { fetchUnits, postUnit } from "@/app/actions/unit.action";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
const columns: ColumnDef<IUnit>[] = [
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
  {
    accessorKey: "shortName",
    header: "Short Name",
  },
];

const Unit = React.memo(() => {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof createUnitSchema>>({
    defaultValues: {
      name: "",
      shortName: "",
    },
    resolver: zodResolver(createUnitSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof createUnitSchema>> = (value) => {
    dispatch(postUnit(value));
    form.reset();
  };

  useEffect(() => {
    dispatch(fetchUnits());
  }, [dispatch]);

  const { units, isLoading } = useTypedSelector((state) => state.units);

  const [open, setOpen] = useState(false);

  return (
    <PrintAbleLayout title="Units">
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
          <SheetHeader>Are you sure to adding an unit?</SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 py-4"
            >
              <FormField
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Unit Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                name="name"
              />
              <FormField
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Short Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
                name="shortName"
              />
              <Button>Submit</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>

      <DataTable data={units} columns={columns} />
    </PrintAbleLayout>
  );
});

export default Unit;
