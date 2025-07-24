import { NextResponse } from "next/server";
import { pgPool } from "../../lib/db"; // adjust path as needed

export async function GET() {
  try {
    const result = await pgPool.query("SELECT NOW()");
    return NextResponse.json({
      message: "Database connected successfully",
      time: result.rows[0].now,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database connection failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
