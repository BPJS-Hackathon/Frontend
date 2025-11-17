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
  nomor_peserta: z.string().min(1, "Nomor peserta wajib diisi").max(32, "Nomor peserta maksimal 32 karakter"),
  nomor_keluarga: z.string().min(1, "Nomor keluarga wajib diisi").max(32, "Nomor keluarga maksimal 32 karakter"),
  tanggal_lahir: z.iso.date("tanggal lahir wajib diisi"),
  hubungan_keluarga: z.number().int().min(1).max(5),
  jenis_kelamin: z.number().int().min(1).max(2),
  status_perkawinan: z.number().int().min(1).max(3),
  kelas_rawat: z.string().min(1).max(10),
  segmentasi_peserta: z.number().int().min(1).max(5),
  provinsi_tinggal: z.string(),
  kabupaten_kota_tinggal: z.string("Kabupaten wajib diisi"),
  kepemilikan_faskes: z.string(),
  jenis_faskes: z.number().int().min(1).max(3),
  provinsi_faskes: z.string(),
  kabupaten_kota_faskes: z.string(),
  bobot: z.number(),
  tahun_sampel: z.number().int(),
  status_kepesertaan: z.string().min(1).max(16),
  tahun_meninggal: z.number().int().nullable().optional(),
  created_by: z.string().nullable().optional(),
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
export type MedicalPatientData = z.infer<typeof medicalPatientSchema>