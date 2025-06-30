import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";

import { createUser } from "@/services/user";

import { toast } from "@/hooks/use-toast";

import { Main } from "@/components/dashboard/main";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UserValues, userSchema } from "@/validators/user";

import { cn } from "@/lib/utils";

export default function UserCreate() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "12345678",
      role: "cashier",
    },
  });

  const onSubmit = async (data: UserValues) => {
    try {
      const response = await createUser(data);

      if (!response.success) throw new Error("Login failed");

      toast({ title: "Login successful!" });
      navigate(-1);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again",
      });
    }
  };

  return (
    <Main>
      <form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-2xl font-bold'>Welcome</h1>
            <p className='text-balance text-muted-foreground'>
              Login to your Jua Bareh account
            </p>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input
                  type='text'
                  {...field}
                  className={cn(
                    "border focus-within:ring-0 focus-within:ring-ring",
                    { "border-destructive": errors.name }
                  )}
                  placeholder='name'
                  aria-label='name'
                />
              )}
            />
            {errors.name?.message && (
              <span className='text-xs text-destructive'>
                {errors.name.message}
              </span>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='username'>Username</Label>
            <Controller
              name='username'
              control={control}
              render={({ field }) => (
                <Input
                  type='text'
                  {...field}
                  className={cn(
                    "border focus-within:ring-0 focus-within:ring-ring",
                    { "border-destructive": errors.username }
                  )}
                  placeholder='username'
                  aria-label='username'
                />
              )}
            />
            {errors.username?.message && (
              <span className='text-xs text-destructive'>
                {errors.username.message}
              </span>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='role'>Role</Label>
            <Controller
              name='role'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className='capitalize'>
                    <SelectValue>{value}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='cashier'>Cashier</SelectItem>
                    <SelectItem value='admin'>Admin</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Main>
  );
}
