/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Mail, Lock, ShieldCheck, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { register as registerUser } from "@/services/auth.api";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success(res.message);
      router.push("/");
      reset();
      reset();
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md">
          <Card className="border rounded shadow-xs">
            <CardContent className="p-8 rounded">
              {/* Header */}
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>

                <h1 className="text-3xl font-bold">Create Account</h1>

                <p className="mt-2 text-sm text-muted-foreground">
                  Register to enjoy a faster checkout experience
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Full Name</label>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      {...register("name", {
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "Full name must be at least 2 characters",
                        },
                      })}
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10 h-12 rounded"
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Email Address</label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 h-12 rounded"
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password with Show/Hide */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Password</label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-12 h-12 rounded"
                      aria-invalid={errors.password ? "true" : "false"}
                    />

                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="h-12 rounded w-full text-base font-medium cursor-pointer mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Sign Up"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>

                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="border rounded py-2 text-sm font-medium hover:bg-primary hover:text-white duration-300 cursor-pointer"
                  >
                    Google
                  </button>

                  <button
                    type="button"
                    className="border rounded py-2 text-sm font-medium hover:bg-primary hover:text-white duration-300 cursor-pointer"
                  >
                    Facebook
                  </button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/logIn"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
