import ClainBtn from "@/components/claim-btn";
import { EditMedicalForm } from "@/components/edit-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { medicalRecordSchema, MedicalRecordTable } from "@/lib/schema";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { toast } from "sonner";


export const medicalColumns: ColumnDef<MedicalRecordTable>[] = [
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const record = row.original;
  //     const handleSubmit = async (data: any) => {
  //     const promise = new Promise((r) => setTimeout(r, 2000));
  //     toast.promise(promise, {
  //       loading: "Menyimpan...",
  //       success: "Berhasil!",
  //       error: "Gagal",
  //     });
  //     await promise;
  //   };
  //     return (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button
  //           variant="ghost"
  //           className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
  //           size="icon"
  //         >
  //           <EllipsisVertical className="w-5 h-5"/>
  //           <span className="sr-only">Open menu</span>
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent align="end" className="w-32">
  //         <EditMedicalForm
  //           onSubmit={handleSubmit}
  //           schema={medicalRecordSchema}
  //           defaultValues={record}
  //         />
  //         <ClainBtn 
  //           id={record.NIK}
  //           btnText="Buat Claim"
  //           dialogTitle="Apakah anda ingin membuat claim?"
  //           dialogDesc="Dengan menekan setuju claim bpjs dengan informasi yang tertera akan dibuat."
  //           successText="Kirim"
  //         />
  //         <DropdownMenuSeparator />
  //         <DropdownMenuItem variant="destructive">Hapus</DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //     )
  //   }
  // },
];
