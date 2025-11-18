import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EllipsisVertical } from "lucide-react";
import { toast } from "sonner";
import { MedicalPatientData, medicalPatientSchema } from "@/lib/schema";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import EditPatientForm from "@/components/edit-patient-form";

const hubunganLabels: Record<number, string> = {
  1: "Peserta",
  2: "Suami",
  3: "Istri",
  4: "Anak",
  5: "Keluarga Tambahan",
};

const jenisKelaminLabels: Record<number, string> = {
  1: "Laki-laki",
  2: "Perempuan",
};

const statusPerkawinanLabels: Record<number, string> = {
  1: "Belum Kawin",
  2: "Kawin",
  3: "Cerai",
};

const segmentasiLabels: Record<number, string> = {
  1: "BP",
  2: "PBI APBN",
  3: "PBI APBD",
  4: "PBPU",
  5: "PPU",
};

const jenisFaskesOptions: Record<number, string> = {
  1: "Puskesmas",
  2: "Klinik Pratama",
  3: "Dokter Umum"
};

export const patientColumns: ColumnDef<MedicalPatientData>[] = [
  {
    accessorKey: "nomor_peserta",
    header: "Nomor Peserta",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("nomor_peserta")}</div>
    ),
  },
  {
    accessorKey: "nomor_keluarga",
    header: "Nomor Keluarga",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("nomor_keluarga")}</div>
    ),
  },
  {
    accessorKey: "tanggal_lahir",
    header: "Tgl Lahir",
    cell: ({ row }) => {
      const date = row.getValue("tanggal_lahir") as string;
      return new Date(date).toLocaleDateString("id-ID");
    },
  },
  {
    accessorKey: "hubungan_keluarga",
    header: "Hubungan",
    cell: ({ row }) => hubunganLabels[parseInt(row.getValue("hubungan_keluarga"))] || "-",
  },
  {
    accessorKey: "jenis_kelamin",
    header: "Jenis Kelamin",
    cell: ({ row }) => jenisKelaminLabels[parseInt(row.getValue("jenis_kelamin"))] || "-",
  },
  {
    accessorKey: "status_perkawinan",
    header: "Status Kawin",
    cell: ({ row }) => statusPerkawinanLabels[parseInt(row.getValue("status_perkawinan"))] || "-",
  },
  {
    accessorKey: "kelas_rawat",
    header: "Kelas",
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("kelas_rawat")}</Badge>,
  },
  {
    accessorKey: "segmentasi_peserta",
    header: "Segmentasi",
    cell: ({ row }) => segmentasiLabels[parseInt(row.getValue("segmentasi_peserta"))] || "-",
  },
  {
    accessorKey: "provinsi_tinggal",
    header: "Provinsi",
  },
  {
    accessorKey: "status_kepesertaan",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status_kepesertaan") as string;
      return (
        <Badge variant={status === "aktif" ? "default" : "destructive"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const patient = row.original;
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <EllipsisVertical className="w-5 h-5"/>
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <EditPatientForm
            onSubmit={handleSubmit}
            schema={medicalPatientSchema}
            defaultValues={patient}
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Hapus</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      );
    },
  },
];