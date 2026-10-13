import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  //controller
  try {
    // queries 
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

// export async function PATCH() {

//   try {
//     const { data, error } = await supabase
//     .from("project_table")
//     .select("*")

//     if(error) {
//       return NextResponse.json({ message: error.message}, { status: 500});
//     }

//     return NextResponse.json(data);
//   }

// }