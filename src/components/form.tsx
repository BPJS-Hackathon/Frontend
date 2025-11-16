"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface FormProps {
  schema: z.ZodObject<any>;
  onSubmit: (data: any) => Promise<void>;
  defaultValues?: Record<string, any>;
}

export function MedicalForm({ schema, onSubmit, defaultValues }: FormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || Object.fromEntries(
      Object.keys(schema.shape).map(key => [key, ""])
    ),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button className="flex gap-1" type="button">
            <Plus className="mt-[1.5px]"/>
            <span>
              Rekam Medis
            </span>
          </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Form Rekam Medis</DialogTitle>
              <DialogDescription>
                Tambah rekam medis untuk melakukan claim BPJS
              </DialogDescription>
            </DialogHeader>
            {Object.entries(schema.shape).map(([key, field]) => {
              const zodField = field as z.ZodString; 
              return (
                <FormField
                  key={key}
                  control={form.control}
                  name={key}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>
                        {key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...formField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                "Kirim"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}