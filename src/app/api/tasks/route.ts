import { NextResponse } from "next/server";
import { pgPool } from "../../lib/db";

// GET /api/tasks — Get all tasks
export async function GET() {
  try {
    const result = await pgPool.query("SELECT * FROM tasks ORDER BY id ASC");
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/tasks — Create a new task
export async function POST(request: Request) {
  try {
    const { text, completed = false } = await request.json();
    if (!text) {
      return NextResponse.json(
        { error: "Task text is required" },
        { status: 400 }
      );
    }

    const result = await pgPool.query(
      "INSERT INTO tasks (text, completed) VALUES ($1, $2) RETURNING *",
      [text, completed]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
