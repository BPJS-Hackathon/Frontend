import ClaimBtn from "@/components/claim-btn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MedicalRecordAdminTable } from "@/lib/schema";
import { AuthStore } from "@/store/auth-store";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";

export const adminColumn: ColumnDef<MedicalRecordAdminTable>[] = [
  {
    accessorKey: "peserta_nik",
    header: "NIK"
  },
  {
    accessorKey: "diagnosis_code",
    header: "kode diagnosis",
  },
  {
    accessorKey: "note",
    header: "Catatan",
  },
  {
    accessorKey: "jenis_rawat",
    header: "Jenis Rawat",
  },
  {
    accessorKey: "admission_date",
    header: "Tanggal Masuk"
  },
  {
    accessorKey: "discharge_date",
    header: "Tanggal Keluar"
  },
  {
    accessorKey: "outcome",
    header: "Hasil",
  },
  {
    accessorKey: "amount",
    header: "Biaya",
  },
  {
    accessorKey: "status",
    header: "Status Klaim",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={ status === "SUBMITTED" ? "default" : (status === "REJECTED" ? "destructive" : "outline")}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;
      const data = {
        btnText: "Claim",
        dialogTitle: "Apakah anda ingin menerima claim?",
        dialogDesc: "Dengan menekan setuju claim bpjs dengan informasi yang tertera akan dibuat.",
        successText: "Terima",
        data: {
          status: row.getValue("status") as string,
          amount: row.getValue("amount") as number,
          verified: "Terverifikasi"
        }
      }
      const {user} = AuthStore();

      if (user?.role !== "admin") {
        return null;
      }
      
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
          <ClaimBtn 
            id={record.claim_id} 
            btnText={data.btnText}
            dialogTitle={data.dialogTitle}
            dialogDesc={data.dialogDesc}
            successText={data.successText}
            data={data.data}
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Hapus</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      )
    }
  },   
];
