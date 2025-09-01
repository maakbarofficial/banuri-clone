import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminPanel() {
  const cookieStore = cookies();
  const auth = cookieStore.get("auth")?.value;

  if (auth !== "true") {
    redirect("/login");
  }

  return (
    <div className="p-8 font-nori">
      <h1 className="text-3xl mb-4">Admin Panel</h1>
      <p>Welcome, admin! Only logged-in users can see this page.</p>
    </div>
  );
}