import { createClient } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
  //controller
  try {
    const supabase = await createClient();
    
    // this should be in service 
    const { data, error } = await supabase
      .from("project_table")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}