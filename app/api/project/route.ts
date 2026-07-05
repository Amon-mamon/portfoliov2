"use server"
import { createClient } from "@/app/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient()
    const { data, error } = await supabase.from("project_table").select("*")

    if(error){
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
    return NextResponse.json(data);
}