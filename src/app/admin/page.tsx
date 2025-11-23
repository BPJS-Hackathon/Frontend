"use client"

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { adminColumn } from "./column";
import { AuthStore } from "@/store/auth-store";
import { api } from "@/lib/api";
import { blockchainColumn } from "./column-blockchain";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [datas, setDatas] = useState([]);
  const [block, setBlock] = useState([]);

  const handleSubmit = async (data: any) => {
    const promise = new Promise((r) => setTimeout(r, 2000));
    toast.promise(promise, {
      loading: "Menyimpan...",
      success: "Berhasil!",
      error: "Gagal",
    });
    await promise;
  };

  const fetchMedicalClaim = async () => {
    const token = localStorage.getItem("access_token");

    const res = await fetch(api.admin.getAllClaims(), {
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
    const transformedData = response.data.map(item => ({
      ...item.rekam_medis,
      amount: item.amount,
      status: item.status,
      claim_id: item.claim_id
    }));
    setDatas(transformedData);
  }

  const fetchBlockChain = async () => {
    const res = await fetch("http://192.168.18.27:6691/api/blocks", {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
      }
    });

    if (!res.ok) {
      toast.error("Gagal memuat data!");
      return;
    }

    const response = await res.json();
    setBlock(response);
    console.log(response);
  }

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("access_token")) {
      fetchMedicalClaim();
      fetchBlockChain();
    }
  }, []); 

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <div className="mx-4 flex flex-col gap-4">
      <div className="flex mb-2 justify-between">
        <span className="text-lg mx-2 font-bold ">Pengajuan Claim</span>
      </div>
      <section>
        <DataTable
          columns={adminColumn}
          data={datas}
          searchKey="peserta_nik"
          pagination
          pageSize={5}
        />
      </section>
      <section>
        <DataTable
          columns={blockchainColumn}
          data={block}
          searchKey="height"
          pagination
          pageSize={5}
        />
      </section>
    </div>
  )
}
