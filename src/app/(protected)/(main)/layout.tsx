import MenuLayout from "@/components/layouts/MenuLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MenuLayout>{children}</MenuLayout>;
}
