import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table"

export const medicalRecordSchema = z.object({
  patient_id: z.string().min(1, "Id pasien wajib diisi"),
  facility_id: z.string().min(1, "Id fasilitas wajib diisi"),
  doctor_name: z.string().min(1, "Nama dokter wajib diisi"),
  diagnosis: z.string().min(1, "Diagnosis wajib diisi"),
  treatment: z.string().min(1, "Tindakan wajib diisi"),
});

export const medicalPatientSchema = z.object({
  nomor_peserta: z.string(),
	nomor_keluarga: z.string(),
	tanggal_lahir: z.string(),
	hubungan_keluarga: z.int(),
  jenis_kelamin: z.int(),
  status_perkawinan: z.int(),
  kelas_rawat: z.string(),
  segmentasi_peserta: z.int(),
  provinsi_tinggal: z.string(),
  kabupaten_kota_tinggal: z.string(),
  kepemilikan_faskes: z.string(),
  jenis_faskes: z.string(),
  provinsi_faskes: z.string(),
  kabupaten_kota_faskes: z.string(),
  bobot: z.float64(),
  tahun_sampel: z.int(),
  status_kepesertaan: z.string(),
  tahun_meninggal: z.int() || null,
  created_by: z.string()
});

export const medicalRecordTable = z.object({
  id: z.string(),
  patient_id: z.string(),
  facility_id: z.string(),
  doctor_name: z.string(),
  diagnosis: z.string(),
  treatment: z.string(),
  created_at: z.string(),
});

export const columns: ColumnDef<MedicalRecordTable>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "patient_id",
    header: "Id Pasien",
  },
  {
    accessorKey: "facility_id",
    header: "Id Fasilitas",
  },
  {
    accessorKey: "doctor_name",
    header: "Nama Dokter",
  },
  {
    accessorKey: "diagnosis",
    header: "Treatment"
  },
  {
    accessorKey: "created_at",
    header: "Tanggal",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return date.toLocaleDateString("id-ID");
    },
  },
];

export type MedicalRecordTable = z.infer<typeof medicalRecordTable>;
export type MedicalRecordData = z.infer<typeof medicalRecordSchema>;