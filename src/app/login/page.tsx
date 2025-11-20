"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { toast } from "sonner"
import { api } from "@/lib/api";

const formSchema = z.object({
  username: z.string().min(1, "Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const promise = fetch(api.auth.login(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    toast.promise(promise, {
      loading: "Tunggu Sebentar...",
      success: "Berhasil masuk",
      error: "Gagal",
    });

    try { 
      const res = await promise; 
      if (res.status === 200) {
        const resData = await res.json();
        localStorage.setItem("access_token", resData.token);
        
      }
    } finally { 
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl glass">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome back</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="space-y-6">

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Sign in"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </a>
        </p>
      </Card>
    </div>
  );
}