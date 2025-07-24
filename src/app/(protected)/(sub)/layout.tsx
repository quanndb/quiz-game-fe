import MenuLayout from "@/components/layouts/MenuLayout";

const SubLayout = ({ children }: { children: React.ReactNode }) => {
  return <MenuLayout isShowLogo={false}>{children}</MenuLayout>;
};

export default SubLayout;
