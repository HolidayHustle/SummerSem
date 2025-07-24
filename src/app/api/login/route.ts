import jwt from "jsonwebtoken";
const SECRET = "my-secret-key";

export async function POST(request: Request): Promise<Response> {
  const { username, password } = await request.json();

  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    return new Response(
      JSON.stringify({ message: "Login successful", token }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
