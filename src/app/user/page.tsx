"use client"

import { toast } from "sonner";
import { medicalRecordSchema } from "@/lib/schema";
import { MedicalForm } from "@/components/form";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { medicalColumns } from "./column";
import { api } from "@/lib/api";
import { AuthStore } from "@/store/auth-store";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [datas, setDatas] = useState([]);
  const {user, me} = AuthStore();
  const isFaskes1 = user?.faskes.jenis_faskes === 'FASKES 1';
  const API = isFaskes1 ? api.faskes1.rekamMedis() : api.faskes2.rekamMedisClaim();

  const handleSubmit = async (data: any) => {
    const token = localStorage.getItem("access_token");
    const res = fetch(API, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    toast.promise(res, {
      loading: "Menyimpan",
      success: "Berhasil menambahkan rekam medis",
      error: "Gagal menambahkan rekam medis"
    });
    return res;
  };

  const fetchMedicalClaim = async () => {
    const token = localStorage.getItem("access_token");

    const res = await fetch(API, {
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
    setDatas(response.data);
  }

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("access_token");
    if (token) {
      me();
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    if (user && localStorage.getItem("access_token")) {
      fetchMedicalClaim();
    }
  }, [user]);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <div className="mx-4 flex flex-col gap-4">
      <div className="flex mb-2 justify-between">
        <span className="text-lg mx-2 font-bold ">Rekam Medis</span>
        <div className="">
          <MedicalForm
            schema={medicalRecordSchema} 
            onSubmit={handleSubmit}
            user={user}
          />
        </div>
      </div>
      <section>
        <DataTable
          columns={medicalColumns}
          data={datas}
          pagination
          pageSize={5}
        />
      </section>
    </div>
  )
}
