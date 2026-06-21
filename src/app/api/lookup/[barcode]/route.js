import { NextResponse } from "next/server";
import { getOrCreateProduct } from "@/lib/getOrCreateProduct";

export async function GET(request, { params }) {
  const { barcode } = await params;
  const product = await getOrCreateProduct(barcode);
  return NextResponse.json({ product });
}
