import { z } from "zod";

const baseMedicalSchema = z.object({
  NIK: z.string().min(1, "NIK perserta wajib diisi"),
  kode_diagnosis: z.enum(["A00", "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09"], "pilih salah satu"),
  note: z.string().nullable(),
  tanggal_pendaftaran: z.iso.date("Tanggal pendaftaran wajib diisi"),
  hasil: z.enum(["SEMBUH", "RUJUK"], "pilih salah satu"),
  amount: z.number()
});

const rawatJalanSchema = z.object({
  ...baseMedicalSchema.shape,
  jenis_rawat: z.literal("RAWAT JALAN"),
  tanggal_pulang: z.string().nullable()
});

const rawatInapSchema = z.object({
  ...baseMedicalSchema.shape,
  jenis_rawat: z.literal("RAWAT INAP"),
  tanggal_pulang: z.iso.date("Tanggal pendaftaran wajib diisi")
});

export const medicalRecordSchema = z.discriminatedUnion("jenis_rawat", [
  rawatJalanSchema,
  rawatInapSchema
]);

export const medicalPatientSchema = z.object({
  nomor_peserta: z.string().min(1, "Nomor peserta wajib diisi").max(32, "Nomor peserta maksimal 32 karakter"),
  nomor_keluarga: z.string().min(1, "Nomor keluarga wajib diisi").max(32, "Nomor keluarga maksimal 32 karakter"),
  tanggal_lahir: z.iso.date("tanggal lahir wajib diisi"),
  hubungan_keluarga: z.number().int().min(1).max(5),
  jenis_kelamin: z.number().int().min(1).max(2),
  status_perkawinan: z.number().int().min(1).max(3),
  kelas_rawat: z.string().min(1).max(10),
  segmentasi_peserta: z.number().int().min(1).max(5),
  provinsi_tinggal: z.string().min(1, "masukan kode wilayah yang sesuai").max(4, "masukan kode wilayah yang sesuai"),
  kabupaten_kota_tinggal: z.string("Kabupaten wajib diisi").min(1, "masukan kode wilayah yang sesuai").max(4, "masukan kode wilayah yang sesuai"),
  kepemilikan_faskes: z.string(),
  jenis_faskes: z.number().int().min(1).max(3),
  provinsi_faskes: z.string().min(1, "masukan kode wilayah yang sesuai").max(4, "masukan kode wilayah yang sesuai"),
  kabupaten_kota_faskes: z.string().min(1, "masukan kode wilayah yang sesuai").max(4, "masukan kode wilayah yang sesuai"),
  bobot: z.string(),
  tahun_sampel: z.number().int(),
  status_kepesertaan: z.string().min(1).max(16),
  tahun_meninggal: z.number().int().nullable().optional(),
  created_by: z.string().nullable().optional(),
});

export const medicalRecordTable = z.object({
  NIK: z.string(),
  kode_diagnosis: z.string(),
  note: z.string(),
  tanggal_pendaftaran: z.string(),
  hasil: z.string(),
  jenis_rawat: z.string(),
  tanggal_pulang: z.string()
});

export const medicalRecordAdminTable = z.object({
  NIK: z.string(),
  kode_diagnosis: z.string(),
  note: z.string(),
  tanggal_pendaftaran: z.string(),
  hasil: z.string(),
  jenis_rawat: z.string(),
  tanggal_pulang: z.string(),
  status: z.string(),
  amount: z.number(),
  claim_id: z.string(),
});

export type MedicalRecordAdminTable = z.infer<typeof medicalRecordAdminTable>;
export type MedicalRecordTable = z.infer<typeof medicalRecordTable>;
export type MedicalRecordData = z.infer<typeof medicalRecordSchema>;
export type MedicalPatientData = z.infer<typeof medicalPatientSchema>