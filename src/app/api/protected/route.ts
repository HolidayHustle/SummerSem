import jwt from "jsonwebtoken";

const SECRET = "my-secret-key";

export async function GET(request: Request): Promise<Response> {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ message: "Unauthorized: No token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    return new Response(
      JSON.stringify({ message: "Token is valid", user: decoded }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ message: "Invalid or expired token" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
