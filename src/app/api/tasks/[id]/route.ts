import { NextResponse } from "next/server";
import { pgPool } from "../../../lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { text, completed } = await request.json();

  const result = await pgPool.query(
    "UPDATE tasks SET text = COALESCE($1, text), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *",
    [text, completed, id]
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const result = await pgPool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Task deleted successfully" });
}
