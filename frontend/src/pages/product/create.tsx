/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";

import { createProduct } from "@/services/product";

import { toast } from "@/hooks/use-toast";

import { Main } from "@/components/dashboard/main";
import InputDropzone from "@/components/product/input-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ProductValues, productSchema } from "@/validators/product";

import { cn } from "@/lib/utils";

export default function ProductCreate() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      image: undefined,
      name: "",
      price: 0,
      stock: 0,
    },
  });

  const onSubmit = async (data: ProductValues) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value instanceof File ? value : String(value));
        }
      });

      const response = await createProduct(formData);
      if (response.success) {
        toast({
          title: "Product created successfully!",
        });
        navigate(-1);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error instanceof Error ? error.message : "Submission failed",
      });
    }
  };

  const onError = (errors: any) => {
    const errorMessages = Object.values(errors).map(
      (error: any) => error.message
    );

    toast({
      variant: "destructive",
      title: `There ${errorMessages.length > 1 ? "were" : "was"} ${errorMessages.length} error${errorMessages.length > 1 && "s"} with your submission`,
      description: (
        <ul className='list-disc pl-4'>
          {errorMessages.map((message, i) => (
            <li key={i}>{message}</li>
          ))}
        </ul>
      ),
    });
  };

  return (
    <Main>
      <div className='mb-6 flex justify-between'>
        <h1 className='text-2xl font-bold'>Add Product</h1>
        <Button type='button' variant='outline' onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      <form className='space-y-2' onSubmit={handleSubmit(onSubmit, onError)}>
        <div className='flex gap-4'>
          <Controller
            name='image'
            control={control}
            render={({ field }) => (
              <InputDropzone
                label='Product Image'
                description='Click to browse image or drag & drop here'
                errors={errors}
                {...field}
              />
            )}
          />
          <div className='w-full space-y-2'>
            <div className='w-full space-y-2'>
              <Label>Product Name</Label>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <Input
                    type='text'
                    placeholder='Your product name'
                    className={cn("border-gray-500", {
                      "border-destructive": errors.name,
                    })}
                    {...field}
                  />
                )}
              />
            </div>

            <div className='w-full space-y-2'>
              <Label>Product Stock</Label>
              <Controller
                name='stock'
                control={control}
                render={({ field }) => (
                  <Input
                    type='number'
                    min={0}
                    placeholder='Your product stock'
                    className={cn("border-gray-500", {
                      "border-destructive": errors.stock,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
            <div className='w-full space-y-2'>
              <Label>Product Price</Label>
              <Controller
                name='price'
                control={control}
                render={({ field }) => (
                  <Input
                    type='number'
                    min={0}
                    placeholder='Your product price (e.g. 10000, 40000)'
                    className={cn("border-gray-500", {
                      "border-destructive": errors.price,
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className='flex w-full justify-end'>
          <Button type='submit' className='mt-6 px-6' disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Main>
  );
}
