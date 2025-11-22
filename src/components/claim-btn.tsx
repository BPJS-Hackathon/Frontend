import { useState } from "react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Clock, DollarSign, FileCheck } from "lucide-react";
import { api } from "@/lib/api";

interface verifData {
  status: string,
  amount: number
  verified: string
}

interface props {
  id: string
  btnText: string
  dialogTitle: string
  dialogDesc: string
  successText: string
  data: verifData
  isDisabled: boolean
}

export default function ClaimBtn({ 
  id,
  btnText,
  dialogTitle,
  dialogDesc,
  successText,
  data,
  isDisabled
} : props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClaim = async (data:any) => {
    setIsLoading(true);
    const token = localStorage.getItem("access_token");
    const promise = fetch(api.admin.putClaimById(id), {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    toast.promise(promise, {
      loading: "Menyimpan...",
      success: `Berhasil membuat Perubahan claim ${id}`,
      error: "Gagal",
    });
    try { await promise; } finally { setIsLoading(false) }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full
        ${isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}>
          {btnText}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {dialogDesc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="px-6 py-4 space-y-3">
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Status</span>
            </div>
            <Badge variant={data.status === "SUBMITTED" ? "default" : (data.status === "REJECTED" ? "destructive" : "secondary")}>
              {data.status}
            </Badge>
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span>Jumlah Klaim</span>
            </div>
            <span className="text-base font-semibold">
              {formatCurrency(data.amount)}
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileCheck className="w-4 h-4" />
              <span>Verifikasi</span>
            </div>
            <Badge variant="outline">
              {data.verified}
            </Badge>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleClaim({status: "REJECTED"})} disabled={isLoading}>
            Tolak
          </AlertDialogAction>
          <AlertDialogAction onClick={() => handleClaim({status: "PAID"})} disabled={isLoading}>
            {successText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}