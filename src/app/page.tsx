import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { ArrowRight, FileCheck, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 min-h-screen">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 opacity-30" />
          <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 backdrop-blur px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Claim BPJS lebih cepat & transparan
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Klaim BPJS
                <span className="block text-primary mt-2">
                  Tanpa Ribet, 100% Digital
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl">
                Kelola data peserta, rekam medis, dan submit klaim BPJS dalam hitungan menit. 
                Aman, cepat, dan sesuai regulasi Kemenkes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline">
                  <Stethoscope className="mr-2 h-4 w-4" />
                  Lihat Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                  <div>
                    <div className="font-semibold">Terenkripsi</div>
                    <div className="text-sm text-muted-foreground">Data aman 256-bit</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileCheck className="h-10 w-10 text-primary" />
                  <div>
                    <div className="font-semibold">99.9% Akurasi</div>
                    <div className="text-sm text-muted-foreground">Validasi otomatis</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl -z-10 animate-pulse" />
              <Card className="overflow-hidden border-2 shadow-2xl">
                <div className="p-8">
                  <div className="space-y-6">
                    
                    <div className="bg-background/95 backdrop-blur rounded-2xl p-6 border shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Dashboard Klaim Hari Ini</h3>
                        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Klaim</span>
                          <span className="font-bold text-2xl">127</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Berhasil</span>
                          <span className="font-bold text-green-600">119</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Pending</span>
                          <span className="font-bold text-yellow-600">8</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <Stethoscope className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">dr. Sarah M.</div>
                            <div className="text-xs text-muted-foreground">Sedang memverifikasi 12 klaim</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
