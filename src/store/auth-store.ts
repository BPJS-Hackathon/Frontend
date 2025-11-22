import { api } from "@/lib/api";
import { persist } from "zustand/middleware"
import { create } from "zustand";
import { toast } from "sonner";
import { boolean } from "zod";

interface Loginpayload {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  message: string
}

export interface User {
  id: string;
  name: string;
  username: string;
  role: string;
  faskes: Faskes
}

interface Faskes {
  id: string;
  nama_faskes: string;
  jenis_faskes: string;
}

interface AuthStore {
  isLoading: boolean;
  isSuccess: boolean;
  user: User | null;

  login: (data: Loginpayload) => Promise<LoginResponse>;
  logout: () => void;
  me: () => void;
}

export const AuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoading: false,
      isSuccess: false,
      user: null,

      login: async (data: any) => {
        set({ isLoading: true, isSuccess: false});
        const loadingToastId = toast.loading("Menunggu");
        try {
          const res = await fetch(api.auth.login(), {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });

          if (!res.ok) {
            throw new Error("Gagal masuk");
          }

          const response = await res.json();
          toast.success(response.message, {id: loadingToastId});
          return response;
        } catch (error) {
          if (error instanceof Error) {
            toast.error( error.message, {id: loadingToastId})
          }
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        localStorage.clear();
      },

      me: async () => {
        try {
          const token = localStorage.getItem("access_token");
          const res = await fetch(api.auth.me(), {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
          });

          if (!res.ok) {
            return;
          }

          const { data } = await res.json();
          set({ user: data });
          set
        } catch (error) {
        } 
      }
    })
  , {
    name: "user-storage",
  })
)

