"use client";

import { DataTable } from "@/components/data-table";
import { medicalPatientSchema } from "@/lib/schema";
import { patientColumns } from "./colums";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import PatientForm from "@/components/patient-form";
import { GetPatientMockData } from "@/mock/patient-data";

export default function DaftarPeserta() {
  const [mounted, setMounted] = useState(false);
  
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

  const data = GetPatientMockData();

  return (
    <div className="mx-4 flex flex-col gap-4">
      <div className="flex justify-between mb-6">
        <h1 className="text-lg mx-2 font-bold">Daftar Peserta BPJS</h1>
        <PatientForm onSubmit={handleSubmit} schema={medicalPatientSchema}/>
      </div>

      <section>
        <DataTable
          columns={patientColumns}
          data={data}
          searchKey="nomor_peserta"
          pagination
          pageSize={5}
        />
      </section>
    </div>
  );
}