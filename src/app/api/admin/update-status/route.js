import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabaseServer";
import { createAdminClient } from "@/lib/supabaseAdmin";

export async function POST(request) {
  const supabase = await createServerSupabase();

  // 1. Confirm there's a logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  // 2. Confirm that user is in the moderators table
  const { data: moderator } = await supabase
    .from("moderators")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!moderator) {
    return NextResponse.json(
      { error: "Not authorized — not a moderator" },
      { status: 403 }
    );
  }

  // 3. Apply the change using the admin client (bypasses RLS for the write)
  const body = await request.json();
  const { barcode, status, certificateNote } = body;

  if (!barcode || !["halal_certified", "not_certified", "haram"].includes(status)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("products")
    .update({
      status,
      certificate_note: certificateNote || null,
      certified_by: status === "halal_certified" ? user.id : null,
      updated_at: new Date().toISOString(),
    })
    .eq("barcode", barcode)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: data });
}
