import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const hubunganOptions = [
  { value: 1, label: "Peserta" },
  { value: 2, label: "Suami" },
  { value: 3, label: "Istri" },
  { value: 4, label: "Anak" },
  { value: 5, label: "Keluarga Tambahan" },
];

const jenisKelaminOptions = [
  { value: 1, label: "Laki-laki" },
  { value: 2, label: "Perempuan" },
];

const statusPerkawinanOptions = [
  { value: 1, label: "Belum Kawin" },
  { value: 2, label: "Kawin" },
  { value: 3, label: "Cerai" },
];

const segmentasiOptions = [
  { value: 1, label: "BP" },
  { value: 2, label: "PBI APBN" },
  { value: 3, label: "PBI APBD" },
  { value: 4, label: "PBPU" },
  { value: 5, label: "PPU" },
];

const jenisFaskesOptions = [
  { value: 1, label: "Puskesmas" },
  { value: 2, label: "Klinik Pratama" },
  { value: 3, label: "Dokter Umum" }
];

interface PatienceProp {
  schema: z.ZodObject<any>
  onSubmit: (data: any) => Promise<void>
  defaultValues?: any
}

export default function EditPatientForm({schema, onSubmit, defaultValues}:PatienceProp) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      nomor_peserta: "",
      nomor_keluarga: "",
      tanggal_lahir: new Date(),
      hubungan_keluarga: 1,
      jenis_kelamin: 1,
      status_perkawinan: 1,
      kelas_rawat: "",
      segmentasi_peserta: 1,
      provinsi_tinggal: "",
      kabupaten_kota_tinggal: "",
      kepemilikan_faskes: "",
      jenis_faskes: "",
      provinsi_faskes: "",
      kabupaten_kota_faskes: "",
      bobot: 0,
      tahun_sampel: new Date().getFullYear(),
      status_kepesertaan: "",
      created_by: "",
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      form.reset();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
        Edit
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Daftar Peserta</DialogTitle>
          <DialogDescription>
            Tambah data peserta untuk BPJS
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  key="nomor_peserta"
                  control={form.control}
                  name="nomor_peserta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nomor Peserta
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
                  name="nomor_keluarga"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Keluarga</FormLabel>
                      <FormControl>
                        <Input placeholder="0012345678901" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tanggal_lahir"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hubungan_keluarga"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Hubungan Keluarga</FormLabel>
                      <Select onValueChange={(v) => field.onChange(parseInt(v))} defaultValue={field.value.toString()}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih hubungan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hubunganOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value.toString()}>
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
                  name="jenis_kelamin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Kelamin</FormLabel>
                      <Select onValueChange={(v) => field.onChange(parseInt(v))} defaultValue={field.value.toString()}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jenisKelaminOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value.toString()}>
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
                  name="status_perkawinan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Perkawinan</FormLabel>
                      <Select onValueChange={(v) => field.onChange(parseInt(v))} defaultValue={field.value.toString()}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusPerkawinanOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value.toString()}>
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
                  name="kelas_rawat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelas Rawat</FormLabel>
                      <FormControl>
                        <Input placeholder="1 / 2 / 3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="segmentasi_peserta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Segmentasi Peserta</FormLabel>
                      <Select onValueChange={(v) => field.onChange(parseInt(v))} defaultValue={field.value.toString()}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih segmentasi" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {segmentasiOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value.toString()}>
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
                  name="provinsi_tinggal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provinsi Tinggal</FormLabel>
                      <FormControl>
                        <Input placeholder="Jawa Barat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kabupaten_kota_tinggal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kabupaten/Kota Tinggal</FormLabel>
                      <FormControl>
                        <Input placeholder="Bandung" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kepemilikan_faskes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kepemilikan Faskes</FormLabel>
                      <FormControl>
                        <Input placeholder="Pemerintah" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jenis_faskes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Faskes</FormLabel>
                      <Select onValueChange={(v) => field.onChange(parseInt(v))} defaultValue={field.value.toString()}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih jenis faskes" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {jenisFaskesOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value.toString()}>
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
                  name="provinsi_faskes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provinsi Faskes</FormLabel>
                      <FormControl>
                        <Input placeholder="Jawa Barat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kabupaten_kota_faskes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kabupaten/Kota Faskes</FormLabel>
                      <FormControl>
                        <Input placeholder="Bandung" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bobot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bobot</FormLabel>
                      <FormControl>
                        <Input placeholder="1.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tahun_sampel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tahun Sampel</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status_kepesertaan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Kepesertaan</FormLabel>
                      <FormControl>
                        <Input placeholder="aktif" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tahun_meninggal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tahun Meninggal (Opsional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Kosongkan jika masih hidup"
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value === "" ? null : parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}