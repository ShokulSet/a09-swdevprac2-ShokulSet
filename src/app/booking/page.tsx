import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import BookingForm from "@/components/BookingForm";

function formatMemberSince(createdAt: string) {
  try {
    const d = new Date(createdAt);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return createdAt;
  }
}

export default async function BookingPage() {
  const session = await getServerSession(authOptions);
  let profile: Awaited<ReturnType<typeof getUserProfile>> | null = null;

  if (session?.user?.token) {
    try {
      profile = await getUserProfile(session.user.token);
    } catch {
      profile = null;
    }
  }

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Venue Booking</h1>
      {profile?.data && (
        <div className="mb-6 p-4 bg-neutral-100 rounded-lg space-y-1">
          <p><strong>Name:</strong> {profile.data.name}</p>
          <p><strong>Email:</strong> {profile.data.email}</p>
          <p><strong>Tel.:</strong> {profile.data.tel}</p>
          <p><strong>Member Since:</strong> {formatMemberSince(profile.data.createdAt)}</p>
        </div>
      )}
      <BookingForm />
    </main>
  );
}
