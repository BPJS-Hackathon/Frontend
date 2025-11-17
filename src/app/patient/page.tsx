"use client";

import { DataTable } from "@/components/data-table";
import { MedicalPatientData, medicalPatientSchema } from "@/lib/schema";
import { patientColumns } from "./colums";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import PatientForm from "@/components/patient-form";

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

  const mockPatients: MedicalPatientData[] = [
    {
      nomor_peserta: "0001234567890",
      nomor_keluarga: "0012345678901",
      tanggal_lahir: "2025-11-17",
      hubungan_keluarga: 1,
      jenis_kelamin: 1,
      status_perkawinan: 2,
      kelas_rawat: "3",
      segmentasi_peserta: 1,
      provinsi_tinggal: "Jawa Barat",
      kabupaten_kota_tinggal: "Bandung",
      kepemilikan_faskes: "Pemerintah",
      jenis_faskes: 1,
      provinsi_faskes: "Jawa Barat",
      kabupaten_kota_faskes: "Bandung",
      bobot: 1.0,
      tahun_sampel: 2025,
      status_kepesertaan: "aktif",
      tahun_meninggal: 2025,
      created_by: "admin",
    },
    {
      nomor_peserta: "0001234567891",
      nomor_keluarga: "0012345678901",
      tanggal_lahir: "1987-07-22",
      hubungan_keluarga: 2,
      jenis_kelamin: 2,
      status_perkawinan: 2,
      kelas_rawat: "3",
      segmentasi_peserta: 1,
      provinsi_tinggal: "3200",
      kabupaten_kota_tinggal: "3273",
      kepemilikan_faskes: "Pemerintah",
      jenis_faskes: 2,
      provinsi_faskes: "3200",
      kabupaten_kota_faskes: "3273",
      bobot: 1.0,
      tahun_sampel: 2025,
      status_kepesertaan: "aktif",
      tahun_meninggal: null,
      created_by: "admin",
    },
    {
      nomor_peserta: "0001234567892",
      nomor_keluarga: "0012345678901",
      tanggal_lahir: "2010-12-05",
      hubungan_keluarga: 3,
      jenis_kelamin: 1,
      status_perkawinan: 1,
      kelas_rawat: "3",
      segmentasi_peserta: 1,
      provinsi_tinggal: "3200",
      kabupaten_kota_tinggal: "3273",
      kepemilikan_faskes: "Pemerintah",
      jenis_faskes: 3,
      provinsi_faskes: "3200",
      kabupaten_kota_faskes: "3273",
      bobot: 1.0,
      tahun_sampel: 2025,
      status_kepesertaan: "aktif",
      tahun_meninggal: null,
      created_by: "admin",
    },
    {
      nomor_peserta: "0001234567893",
      nomor_keluarga: "0012345678902",
      tanggal_lahir: "1990-05-18",
      hubungan_keluarga: 1,
      jenis_kelamin: 2,
      status_perkawinan: 1,
      kelas_rawat: "2",
      segmentasi_peserta: 2,
      provinsi_tinggal: "3100",
      kabupaten_kota_tinggal: "3175",
      kepemilikan_faskes: "Swasta",
      jenis_faskes: 1,
      provinsi_faskes: "3100",
      kabupaten_kota_faskes: "3175",
      bobot: 1.0,
      tahun_sampel: 2025,
      status_kepesertaan: "aktif",
      tahun_meninggal: null,
      created_by: "admin",
    },
    {
      nomor_peserta: "0001234567894",
      nomor_keluarga: "0012345678903",
      tanggal_lahir: "1975-08-30",
      hubungan_keluarga: 1,
      jenis_kelamin: 1,
      status_perkawinan: 2,
      kelas_rawat: "1",
      segmentasi_peserta: 3,
      provinsi_tinggal: "3300",
      kabupaten_kota_tinggal: "3374",
      kepemilikan_faskes: "Pemerintah",
      jenis_faskes: 2,
      provinsi_faskes: "3300",
      kabupaten_kota_faskes: "3374",
      bobot: 1.0,
      tahun_sampel: 2025,
      status_kepesertaan: "aktif",
      tahun_meninggal: null,
      created_by: "admin",
    },
    {
      nomor_peserta: "0001234567895",
      nomor_keluarga: "0012345678904",
      tanggal_lahir: "1965-02-14",
      hubungan_keluarga: 1,
      jenis_kelamin: 1,
      status_perkawinan: 3,
      kelas_rawat: "3",
      segmentasi_peserta: 1,
      provinsi_tinggal: "3500",
      kabupaten_kota_tinggal: "3578",
      kepemilikan_faskes: "Pemerintah",
      jenis_faskes: 3,
      provinsi_faskes: "3500",
      kabupaten_kota_faskes: "3578",
      bobot: 1.0,
      tahun_sampel: 2025,
      status_kepesertaan: "non-aktif",
      tahun_meninggal: 2024,
      created_by: "admin",
    },
    {
      nomor_peserta: "0001234567896",
      nomor_keluarga: "0012345678905",
      tanggal_lahir: "1995-11-20",
      hubungan_keluarga: 1,
      jenis_kelamin: 2,
      status_perkawinan: 2,
      kelas_rawat: "2",
      segmentasi_peserta: 2,
      provinsi_tinggal: "5100",
      kabupaten_kota_tinggal: "5171",
      kepemilikan_faskes: "Swasta",
      jenis_faskes: 3,
      provinsi_faskes: "5100",
      kabupaten_kota_faskes: "5171",
      bobot: 1.0,
      tahun_sampel: 2025,
      status_kepesertaan: "aktif",
      tahun_meninggal: null,
      created_by: "admin",
    },
    {
      nomor_peserta: "0001234567897",
      nomor_keluarga: "0012345678905",
      tanggal_lahir: "2015-04-08",
      hubungan_keluarga: 3,
      jenis_kelamin: 1,
      status_perkawinan: 1,
      kelas_rawat: "2",
      segmentasi_peserta: 2,
      provinsi_tinggal: "5100",
      kabupaten_kota_tinggal: "5171",
      kepemilikan_faskes: "Swasta",
      jenis_faskes: 2,
      provinsi_faskes: "5100",
      kabupaten_kota_faskes: "5171",
      bobot: 1.0,
      tahun_sampel: 2025,
      status_kepesertaan: "aktif",
      tahun_meninggal: null,
      created_by: "admin",
    },
    {
      nomor_peserta: "0001234567898",
      nomor_keluarga: "0012345678906",
      tanggal_lahir: "1980-09-12",
      hubungan_keluarga: 1,
      jenis_kelamin: 1,
      status_perkawinan: 2,
      kelas_rawat: "3",
      segmentasi_peserta: 1,
      provinsi_tinggal: "6400",
      kabupaten_kota_tinggal: "6471",
      kepemilikan_faskes: "Pemerintah",
      jenis_faskes: 2,
      provinsi_faskes: "6400",
      kabupaten_kota_faskes: "6471",
      bobot: 1.0,
      tahun_sampel: 2025,
      status_kepesertaan: "aktif",
      tahun_meninggal: null,
      created_by: "admin",
    },
    {
      nomor_peserta: "0001234567899",
      nomor_keluarga: "0012345678907",
      tanggal_lahir: "1992-06-25",
      hubungan_keluarga: 1,
      jenis_kelamin: 2,
      status_perkawinan: 1,
      kelas_rawat: "2",
      segmentasi_peserta: 2,
      provinsi_tinggal: "7300",
      kabupaten_kota_tinggal: "7371",
      kepemilikan_faskes: "Pemerintah",
      jenis_faskes: 3,
      provinsi_faskes: "7300",
      kabupaten_kota_faskes: "7371",
      bobot: 1.0,
      tahun_sampel: 2025,
      status_kepesertaan: "aktif",
      tahun_meninggal: null,
      created_by: "admin",
    },
  ];

  return (
    <div className="mx-4 flex flex-col gap-4">
      <div className="flex justify-between mb-6">
        <h1 className="text-lg mx-2 font-bold">Daftar Peserta BPJS</h1>
        <PatientForm onSubmit={handleSubmit} schema={medicalPatientSchema}/>
      </div>

      <section>
        <DataTable
          columns={patientColumns}
          data={mockPatients}
          searchKey="nomor_peserta"
          pagination
          pageSize={5}
        />
      </section>
    </div>
  );
}