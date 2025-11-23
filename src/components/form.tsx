"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Plus } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { User } from "@/store/auth-store";
import { api } from "@/lib/api";
import { toast } from "sonner";

const kodeDiagnosisOptions = [
  { label: "A00", value:"A00" },
  { label: "A01", value:"A01" },
  { label: "A02", value:"A02" },
  { label: "A03", value:"A03" },
  { label: "A04", value:"A04" },
  { label: "A05", value:"A05" },
  { label: "A06", value:"A06" },
  { label: "A07", value:"A07" },
  { label: "A08", value:"A08" },
  { label: "A09", value:"A09" },
];

const hasilOptions = [
  { label: "RUJUK" , value: "RUJUK"},
  { label: "SEMBUH", value: "SEMBUH" },
];

const jenisRawatOptions = [
  { label: "RAWAT JALAN", value: "RAWAT JALAN" },
  { label: "RAWAT INAP", value: "RAWAT INAP" },
];

const jenisFaskesOptions = [
  { label: "Faskes 1", value: "Faskes 1" },
  { label: "Faskes 2", value: "Faskes 2" }
]

interface FormProps {
  schema: z.ZodObject<any>;
  onSubmit: (data: any) => Promise<Response>;
  defaultValues?: Record<string, any>;
  user: User | null
}

export function MedicalForm({ schema, onSubmit, defaultValues, user }: FormProps) {
  const [amount, setAmount] = useState([]);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      NIK: "",
      kode_diagnosis: "A00",
      note: "",
      tanggal_pendaftaran: "",
      jenis_rawat: "RAWAT JALAN",
      hasil: "SEMBUH",
      tanggal_pulang: "",
      amount: 500000,
      jenis_faskes: null
    }
  });

  const isFaskes1 = user?.faskes.jenis_faskes === 'FASKES 1';
  const API = isFaskes1 ? api.faskes1.getAllDiagnosis() : api.faskes2.getAllDiagnosis();
  const BLOCKCHAIN_API = isFaskes1 ? api.blockchain.nodeFaskes1() : api.blockchain.nodeFaskes2()
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setShow] = useState(false);

  const selectedDiagnosis = form.watch("kode_diagnosis");
  const selectedRujukan = form.watch("hasil");

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    
    const newData = {
      "peserta_nik": data.NIK,
      "diagnosis_code": data.kode_diagnosis,
      "note": data.note,
      "jenis_rawat": data.jenis_rawat,
      "admission_date": toUnixTimestamp(data.tanggal_pendaftaran),
      "discharge_date": toUnixTimestamp(data.tanggal_pulang),
      "outcome": data.hasil
    }
    const rekam_medis = {
      "rekam_medis": newData
    }

    let aggregator;
    if (!isFaskes1) {
      const claims = {
        "amount": data.amount,
      }
      aggregator = {
        ...rekam_medis,
        claims,
      }
    }

    try {
      const payload = isFaskes1 ? rekam_medis : aggregator
      const res = await onSubmit(payload);
      if (res.ok) {

        const r = await res.json();
        let bcPayload;
        if (isFaskes1) {
          bcPayload = {
            ...payload,
            "id": r.rekam_medis_id,
          }
        } else {
          bcPayload = {
            ...payload,
            "id": r.rekam_medis_id,
            "claim_id": r.claim_id,
          }
        }

        console.log(bcPayload);
        const endpoint = isFaskes1 ? "/api/rekam_medis/fk1" : "/api/rekam_medis/fk2"
        const res2 = await fetch(`${BLOCKCHAIN_API}${endpoint}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bcPayload)
        });

        if (!res2.ok) {
          console.log(await res2.json());
          return;
        }

        // const bc = await res2.json()
        // console.log(bc.rujukan_id)

        form.reset();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toUnixTimestamp = (data: any) => {
    const now: Date = new Date();
    const unixTimestampInMilliseconds: number = now.getTime();
    const unixTimestampInSeconds: number = Math.floor(unixTimestampInMilliseconds / 1000);
    return unixTimestampInSeconds;
  }

  const fetchAmount = async () => {
    const token = localStorage.getItem('access_token');

    const res = await fetch(API, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (res.ok) {
      const {data} = await res.json();
      setAmount(data);
    }
  }

  useEffect(() => {
    if (selectedDiagnosis && amount.length > 0) {
      const diagnosis = amount.find(d => d.code === selectedDiagnosis);
      form.setValue("amount", diagnosis.harga);
    }
  }, [selectedDiagnosis]);

  useEffect(() => {
    if (selectedRujukan && selectedRujukan === "RUJUK") {
      setShow(true);
    } else {
      setShow(false)
    }
  }, [selectedRujukan]);

  useEffect(() => {
    if (user && localStorage.getItem("access_token")) {
      fetchAmount();
    }
  }, [user]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-1" type="button">
          <Plus className="mt-[1.5px]"/>
          <span>
            Tambah Rekam Medis
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Tambah Rekam Medis</DialogTitle>
          <DialogDescription>
            Tambah data peserta untuk BPJS
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  key="NIK"
                  control={form.control}
                  name="NIK"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        NIK
                      </FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kode_diagnosis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Diagnosis</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih kode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {kodeDiagnosisOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tanggal_pendaftaran"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Pendaftaran</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  key="note"
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Catatan
                      </FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jenis_rawat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Rawat</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih jenis rawat" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jenisRawatOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hasil</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih hasil" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hasilOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tanggal_pulang"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Pulang</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!isFaskes1 && (
                  <FormField
                    key="amount"
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Jumlah
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="..."  {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                { isShow && (
                  <FormField
                    control={form.control}
                    name="jenis_faskes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>JenisFaskes</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih hasil" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {jenisFaskesOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                "Kirim"
              )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}