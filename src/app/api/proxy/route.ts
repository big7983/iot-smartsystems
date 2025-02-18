// src/app/api/proxy.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {

    const body = await req.json();

    // Destructure required fields from the request body
    const {
      token,
      apipath,
    } = body;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${apipath}`,
      {
        headers: {
          Accept: "application/json",
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
