import ClainBtn from "@/components/claim-btn";
import { EditMedicalForm } from "@/components/edit-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { medicalRecordSchema, MedicalRecordTable } from "@/lib/schema";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { toast } from "sonner";

const claimStatusLabels: Record<number, string> = {
  1: "Aktif",
  2: "Tidak Aktif",
  3: "Belum Diajukan"
}

export const medicalColumns: ColumnDef<MedicalRecordTable>[] = [
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
  {
    accessorKey: "claim_status",
    header: "Status Klaim",
    cell: ({ row }) => {
      const status = row.getValue("claim_status") as number;
      return (
        <Badge variant={ status === 1 ? "default" : (status === 2 ? "destructive" : "outline")}>
          {claimStatusLabels[status]}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;
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
          <EditMedicalForm
            onSubmit={handleSubmit}
            schema={medicalRecordSchema}
            defaultValues={record}
          />
          <ClainBtn id={record.patient_id}/>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Hapus</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      )
    }
  },
];
