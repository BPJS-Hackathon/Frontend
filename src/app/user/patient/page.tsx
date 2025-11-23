"use client";

import { DataTable } from "@/components/data-table";
import { MedicalPatientData, medicalPatientSchema } from "@/lib/schema";
import { patientColumns } from "./colums";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import PatientForm from "@/components/patient-form";
import { api } from "@/lib/api";

export default function DaftarPeserta() {
  const [mounted, setMounted] = useState(false);
  const [patients, setPatients] = useState<MedicalPatientData[]>([]);

  // const handleSubmit = async (data: any) => {
  //   const token = localStorage.getItem("access_token");

  //   const promise = fetch(api.user(), {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`
  //     },
  //     body: JSON.stringify(data)
  //   });

  //   toast.promise(promise, {
  //     loading: "Menyimpan...",
  //     success: "Berhasil!",
  //     error: "Gagal",
  //   });
  //   return promise;
  // };

  const fetchPatients = async () => {
    const token = localStorage.getItem("access_token");

    const res = await fetch(api.faskes1.peserta(), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!res.ok) {
      toast.error("Gagal memuat data!");
      return;
    }

    const response = await res.json();
    setPatients(response.data);
  }

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("access_token")) {
      fetchPatients();
    }
  }, []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <div className="mx-4 flex flex-col gap-4">
      <div className="flex justify-between mb-6">
        <h1 className="text-lg mx-2 font-bold">Daftar Peserta BPJS</h1>
        {/* <PatientForm onSubmit={handleSubmit} schema={medicalPatientSchema}/> */}
      </div>

      <section>
        <DataTable
          columns={patientColumns}
          data={patients}
          searchKey="nomor_peserta"
          pagination
          pageSize={5}
        />
      </section>
    </div>
  );
}