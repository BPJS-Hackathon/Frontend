"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { RoleCard } from "@/components/role-card";
import { User, Briefcase } from "lucide-react";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  role: z.enum(["faskes", "bpjs"])
});

type FormData = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "faskes",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const promise = fetch(api.auth.register(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    toast.promise(promise, {
      loading: "Membuat Akun...",
      success: "Akun Berhasil dibuat!",
      error: "Gagal!",
    });
    try { 
      const res = await promise; 
      if (res.status === 201) {
        redirect('/login');
      }
    } finally { 
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl grid md:grid-cols-1 items-center">

        <Card className="p-8 shadow-xl glass">
          <h2 className="text-3xl font-bold text-center mb-8">Sign up</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RoleCard
                          title="Fasilitas Kesehatan"
                          description="Penyedia layanan kesehatan"
                          icon={<User className="w-8 h-8" />}
                          selected={field.value === "faskes"}
                          onClick={() => field.onChange("faskes")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RoleCard
                          title="BPJS"
                          description="Pemberi jaminan sosial"
                          icon={<Briefcase className="w-8 h-8" />}
                          selected={field.value === "bpjs"}
                          onClick={() => field.onChange("bpjs")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

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

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign up" }
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}