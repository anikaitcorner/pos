import { fetchBusiness } from "@/app/actions/business.action";
import { fetchCategory } from "@/app/actions/category.action";
import { fetchUnits } from "@/app/actions/unit.action";
import { PrintAbleLayout } from "@/app/components/printable-layout";
import { useAppDispatch, useTypedSelector } from "@/app/store";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { createProductSchema } from "@codernex/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
const Products = () => {
  const dispatch = useAppDispatch();
  const { business } = useTypedSelector((state) => state.business);
  const { categories } = useTypedSelector((state) => state.categories);
  const { units } = useTypedSelector((state) => state.units);
  const { products } = useTypedSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchUnits());
    dispatch(fetchCategory());
  }, [dispatch]);

  const navigate = useNavigate();
  useEffect(() => {
    // dispatch(fetchProducts());
    dispatch(fetchBusiness(navigate));
  }, [dispatch, navigate]);

  const form = useForm<z.infer<typeof createProductSchema>>({
    defaultValues: {
      businessId: business?.id,
      categoryId: "",
      name: "",
      price: 0,
      unitCost: 0,
      unitType: "",
      sku: "2458564466",
    },
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof createProductSchema>> = (
    value
  ) => {
    console.log(value);

    // dispatch(createProducts(value));
  };

  const [open, setOpen] = useState(false);
  return (
    <PrintAbleLayout title="Products">
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
        <SheetContent className="overflow-y-scroll scrollbar-hide">
          <SheetHeader>Are you sure to add a product?</SheetHeader>
          <Form {...form}>
            <form
              className="space-y-3 mt-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: HeadLight" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="name"
              />
              <FormField
                control={form.control}
                render={({ field: { onChange, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Unit Cost</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="eg: 20.00"
                        onChange={(e) => onChange(Number(e.target.value))}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="unitCost"
              />

              <FormField
                control={form.control}
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Parts Number</FormLabel>
                    <FormControl>
                      <Input value={value} onChange={onChange} {...rest} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="sku"
              />
              <FormField
                render={() => (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                )}
                name="businessId"
              />
              <FormField
                control={form.control}
                render={({ field: { onChange, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Sells Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="eg: 50.00"
                        onChange={(e) => onChange(Number(e.target.value))}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="price"
              />
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please Select A Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((item) => {
                          return (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
                name="categoryId"
              />

              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please Select A Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {units.map((item) => {
                          return (
                            <SelectItem key={item.id} value={item.shortName}>
                              {item.shortName}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
                name="unitType"
              />
              <Button>Add Product</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
      <DataTable
        columns={[
          {
            accessorKey: "id",
            header: "SL",
            cell: ({ row }) => {
              return row.index + 1;
            },
          },
          {
            accessorKey: "name",
            header: "Product Name",
          },
          {
            accessorKey: "unitCost",
            header: "Unit Cost",
          },
          {
            accessorKey: "price",
            header: "Sells Price",
          },
          {
            accessorKey: "quantity",
            header: "QTY",
          },
          {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => {
              return row.original.category?.name;
            },
          },
        ]}
        data={products}
      />
    </PrintAbleLayout>
  );
};

export default Products;
