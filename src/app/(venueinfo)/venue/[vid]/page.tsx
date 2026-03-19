import getVenue from "@/libs/getVenue";

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ vid: string }>;
}) {
  const { vid } = await params;

  let data: Awaited<ReturnType<typeof getVenue>>["data"] | null = null;
  try {
    const res = await getVenue(vid);
    data = res.data;
  } catch {
    data = null;
  }

  if (!data) {
    return (
      <main className="p-8">
        <p>Venue not found.</p>
      </main>
    );
  }

  const pictureUrl = data.picture.includes("drive.google.com")
    ? `/api/image-proxy?url=${encodeURIComponent(data.picture)}`
    : data.picture;

  return (
    <main className="p-8">
      <div className="flex flex-wrap gap-8 items-start max-w-4xl mx-auto border border-gray-300 rounded-lg overflow-hidden bg-white">
        <div className="flex-1 min-w-[200px] rounded-l-lg overflow-hidden">
          <img
            src={pictureUrl}
            alt={data.name}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="flex-1 min-w-[200px] p-6 space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
          <p className="text-gray-700">{data.address}</p>
          <p className="text-gray-700">{data.province}</p>
          <p className="text-gray-700">{data.postalcode}</p>
          <p className="text-gray-700">{data.tel}</p>
          <p className="text-gray-900 font-medium">
            อัตราค่าเช่า: ฿{data.dailyrate.toLocaleString()}/วัน
          </p>
        </div>
      </div>
    </main>
  );
}
