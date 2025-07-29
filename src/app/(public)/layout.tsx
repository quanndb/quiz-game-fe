import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization")?.value;

  if (token) {
    redirect("/");
  }
  return <>{children}</>;
}
