"use client"

import { toast } from "sonner";
import { medicalRecordSchema } from "@/lib/schema";
import { MedicalForm } from "@/components/form";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { medicalColumns } from "./column";
import { GetMedicalRecordMockData } from "@/mock/medical-record";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  const data = GetMedicalRecordMockData();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-10 h-10" />;
  const handleSubmit = async (data: any) => {
    const promise = new Promise((r) => setTimeout(r, 2000));
    toast.promise(promise, {
      loading: "Menyimpan...",
      success: "Berhasil!",
      error: "Gagal",
    });
    await promise;
  };

  return (
    <div className="mx-4 flex flex-col gap-4">
      <div className="flex mb-2 justify-between">
        <span className="text-lg mx-2 font-bold ">Rekam Medis</span>
        <div className="">
          <MedicalForm
            schema={medicalRecordSchema} 
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <section>
        <DataTable
          columns={medicalColumns}
          data={data}
          searchKey="patient_id"
          pagination
          pageSize={5}
        />
      </section>
    </div>
  )
}
