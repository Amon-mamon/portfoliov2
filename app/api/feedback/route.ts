import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const { data, error} = await supabase.from("feedbacks").select("*").order("id", {ascending: false});

        if(error){
            return NextResponse.json({ message: error.message})
        }

        return NextResponse.json(data);

    } catch(err:any) {
        return NextResponse.json({ message: err.message},{ status:500 })
    }

}