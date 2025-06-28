import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { loginUser } from "@/services/auth";

import { useAuthStore } from "@/stores/auth";

import { toast } from "@/hooks/use-toast";

import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { LoginValues, loginSchema } from "@/validators/auth";

import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data: LoginValues) => {
    try {
      setIsLoading(true);
      const response = await loginUser(data);

      if (!response.success) throw new Error("Login failed");

      toast({ title: "Login successful!" });
      login(response.token, response.data);

      if (response.data.role === "admin") {
        return navigate("/dashboard");
      }

      return navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner className='fixed z-10 bg-black/50' />}
      <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-8'>
        <div>
          <div className='flex flex-col gap-6'>
            <Card className='overflow-hidden'>
              <CardContent>
                <form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex flex-col gap-6'>
                    <div className='flex flex-col items-center text-center'>
                      <h1 className='text-2xl font-bold'>Welcome</h1>
                      <p className='text-balance text-muted-foreground'>
                        Login to your Jua Bareh account
                      </p>
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
                      <Label htmlFor='password'>Password</Label>
                      <Controller
                        name='password'
                        control={control}
                        render={({ field }) => (
                          <div
                            className={cn(
                              "relative flex items-center rounded-md border pr-2 focus-within:ring-1 focus-within:ring-ring",
                              { "border-destructive": errors.password }
                            )}
                          >
                            <Input
                              type={showPassword ? "text" : "password"}
                              {...field}
                              className='border-0 shadow-none focus-visible:ring-0'
                              placeholder='password'
                              aria-label='password'
                            />
                            <button
                              type='button'
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <EyeOffIcon className='h-5 w-5 text-muted-foreground' />
                              ) : (
                                <EyeIcon className='h-5 w-5 text-muted-foreground' />
                              )}
                            </button>
                          </div>
                        )}
                      />
                      {errors.password?.message && (
                        <span className='text-xs text-destructive'>
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <Button
                      type='submit'
                      className='w-full'
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
