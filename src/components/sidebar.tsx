"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CircleGauge, User } from "lucide-react"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AuthStore } from "@/store/auth-store"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navUser: [
    {
      title: "Rekam Medis",
      url: "/user",
      icon: CircleGauge,
    }, 
    {
      title: "Peserta",
      url: "/user/patient",
      icon: User
    },
    
  ],
  navAdmin: [
    {
      title: "Claim",
      url: "/admin",
      icon: User
    },
    // {
    //   title: "",
    //   url: ""
    //   icon:
    // }
  ],
  navAuditor: [

  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = /admin/g.test(usePathname());
  const {user, logout} = AuthStore();
  const newUser = {
    name: user?.name || "",
    email: user?.username || "",
    avatar: "/avatars/shadcn.jpg",
    logout: logout
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                <span className="text-base font-semibold">BPJS</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={path ? data.navAdmin : data.navUser} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={newUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
