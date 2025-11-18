"use client"

import { toast } from "sonner";
import { medicalRecordSchema, MedicalRecordTable } from "@/lib/schema";
import { MedicalForm } from "@/components/form";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { medicalColumns } from "./column";

function getData(): MedicalRecordTable[] {
  return [
    {
      id: "728ed52f",
      patient_id: "156ad1dd",
      facility_id: "njl457qy",
      doctor_name: "John Doe",
      diagnosis: "Demam Berdarah",
      treatment: "Rawat Inap",
      claim_status: 1,
      created_at: "2025-11-16",
    },
    {
      id: "a13fd9b2",
      patient_id: "c51ae77f",
      facility_id: "plk923ht",
      doctor_name: "Dr. Sarah Mahendra",
      diagnosis: "Infeksi Saluran Pernapasan Akut",
      treatment: "Obat Jalan",
      claim_status: 2,
      created_at: "2025-11-16",
    },
    {
      id: "c4e98f11",
      patient_id: "99ad71cc",
      facility_id: "hsu821mn",
      doctor_name: "Dr. Made Sukarta",
      diagnosis: "Tipes",
      treatment: "Rawat Inap",
      claim_status: 3,
      created_at: "2025-11-16",
    },
    {
      id: "d59fa33c",
      patient_id: "67bc22ab",
      facility_id: "qwe552jk",
      doctor_name: "Dr. Luh Ayu Kartika",
      diagnosis: "Asma",
      treatment: "Nebulizer & Obat Jalan",
      claim_status: 1,
      created_at: "2025-11-16",
    },
    {
      id: "e71bd44e",
      patient_id: "ac52b87d",
      facility_id: "lop481zs",
      doctor_name: "Dr. Bagus Pratama",
      diagnosis: "Hipertensi",
      treatment: "Kontrol Rutin",
      claim_status: 2,
      created_at: "2025-11-16",
    },
    {
      id: "f82ce55f",
      patient_id: "f33ee12c",
      facility_id: "mnb134qx",
      doctor_name: "Dr. Andi Surya",
      diagnosis: "Diabetes Mellitus",
      treatment: "Terapi & Obat Jalan",
      claim_status: 3,
      created_at: "2025-11-16",
    },
    {
      id: "a92bd66a",
      patient_id: "8ce771bb",
      facility_id: "tgr445op",
      doctor_name: "Dr. Citra Dewi",
      diagnosis: "Demam Tinggi",
      treatment: "Observasi",
      claim_status: 1,
      created_at: "2025-11-16",
    },
    {
      id: "bc3ad77c",
      patient_id: "77af19de",
      facility_id: "bvc778km",
      doctor_name: "Dr. Putu Yogi",
      diagnosis: "Pneumonia",
      treatment: "Rawat Inap",
      claim_status: 2,
      created_at: "2025-11-16",
    },
    {
      id: "cd4be88d",
      patient_id: "9df4a11c",
      facility_id: "zxc991lp",
      doctor_name: "Dr. Rizky Hanif",
      diagnosis: "Gastritis",
      treatment: "Obat Jalan",
      claim_status: 3,
      created_at: "2025-11-16",
    },
    {
      id: "de5cf99e",
      patient_id: "bb7e812a",
      facility_id: "vfr224gh",
      doctor_name: "Dr. Ni Made Yuliani",
      diagnosis: "Migrain",
      treatment: "Obat Jalan",
      claim_status: 1,
      created_at: "2025-11-16",
    },
    {
      id: "de5cf99e",
      patient_id: "bb7e812a",
      facility_id: "vfr224gh",
      doctor_name: "Dr. Ni Made Yuliani",
      diagnosis: "Migrain",
      treatment: "Obat Jalan",
      claim_status: 2,
      created_at: "2025-11-16",
    }
  ]
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  const data = getData();

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
