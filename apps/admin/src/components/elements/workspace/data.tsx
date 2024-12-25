import {
  Bolt,
  Cloud,
  FileText,
  HelpCircle,
  LayoutDashboard,
  User,
} from "lucide-react";

export const menuItems = [
  {
    name: "Dashboard",
    menu: [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={15} />,
        href: "/",
      },
      {
        name: "Analytics",
        icon: <FileText size={15} />,
        href: "/analytics",
        items: [
          { name: "Overview", href: "/test" },
          { name: "Reports", href: "/analytics/reports" },
          { name: "Traffic", href: "/analytics/traffic" },
        ],
      },
      {
        name: "Settings",
        icon: <Bolt size={15} />,
        href: "/settings",
        items: [
          { name: "General", href: "/settings/general" },
          { name: "Security", href: "/test/table" },
          { name: "Billing", href: "/settings/billing" },
          { name: "Integrations", href: "/settings/integrations" },
        ],
      },
      {
        name: "Profile",
        icon: <User size={15} />,
        href: "/profile",
        items: [
          { name: "General", href: "/profile/general" },
          { name: "Security", href: "/profile/security" },
          { name: "Billing", href: "/profile/billing" },
          { name: "Privacy", href: "/profile/privacy" },
        ],
      },
    ],
  },
  {
    name: "Applications",
    menu: [
      {
        name: "Cloud Storage",
        icon: <Cloud size={15} />,
        href: "/cloud-storage",
        items: [
          { name: "Files", href: "/cloud-storage/files" },
          { name: "Backups", href: "/cloud-storage/backups" },
          { name: "Settings", href: "/cloud-storage/settings" },
        ],
      },
      {
        name: "Documents",
        icon: <FileText size={15} />,
        href: "/documents",
        items: [
          { name: "Create Document", href: "/documents/create" },
          { name: "Manage Documents", href: "/documents/manage" },
          { name: "Templates", href: "/documents/templates" },
        ],
      },
    ],
  },
  {
    name: "Help",
    menu: [
      {
        name: "Support",
        icon: <HelpCircle size={15} />,
        href: "/help/support",
      },
      {
        name: "FAQ",
        icon: <HelpCircle size={15} />,
        href: "/help/faq",
      },
    ],
  },
];
