const API_BASE = "https://a08-venue-explorer-backend.vercel.app/api/v1";

export interface LoginResponse {
  token: string;
  email?: string;
  name?: string;
  [key: string]: unknown;
}

export default async function userLogIn(
  userEmail: string,
  userPassword: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: userEmail, password: userPassword }),
  });
  if (!res.ok) throw new Error("Login failed");
  const json = await res.json() as Record<string, unknown>;
  const data = json.data as { token?: string; user?: { email?: string; name?: string } } | undefined;
  return {
    ...json,
    token: (json.token as string) ?? data?.token,
    email: (json.email as string) ?? data?.user?.email ?? userEmail,
    name: (json.name as string) ?? data?.user?.name,
  } as LoginResponse;
}
