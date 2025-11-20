import { CircleGauge, User } from "lucide-react";

export const sidebarUser = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Rekam Medis",
      url: "/dashboard",
      icon: CircleGauge,
    }, 
    {
      title: "Peserta",
      url: "/patient",
      icon: User
    }
  ],
}

export const sidebarAdmin = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Claim",
      url: "/dashboard",
      icon: CircleGauge,
    },
  ],
}