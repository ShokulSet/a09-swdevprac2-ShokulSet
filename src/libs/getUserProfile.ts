const API_BASE = "https://a08-venue-explorer-backend.vercel.app/api/v1";

export interface UserProfileData {
  _id: string;
  name: string;
  email: string;
  tel: string;
  role: string;
  createdAt: string;
  __v: number;
}

export interface UserProfileResponse {
  success: boolean;
  data: UserProfileData;
}

export default async function getUserProfile(
  token: string
): Promise<UserProfileResponse> {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  const json: UserProfileResponse = await res.json();
  return json;
}
