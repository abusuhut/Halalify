import { createServerSupabase } from "@/lib/supabaseServer";
import { createAdminClient } from "@/lib/supabaseAdmin";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  let moderatorRow = null;
  if (user) {
    const { data } = await supabase
      .from("moderators")
      .select("id, role")
      .eq("id", user.id)
      .maybeSingle();
    moderatorRow = data;
  }

  let recent = [];
  if (moderatorRow) {
    const admin = createAdminClient();
    const { data } = await admin
      .from("products")
      .select("barcode, product_name, status, updated_at")
      .order("updated_at", { ascending: false })
      .limit(20);
    recent = data || [];
  }

  return (
    <AdminClient
      user={user ? { email: user.email } : null}
      moderatorRow={moderatorRow}
      recent={recent}
    />
  );
}
