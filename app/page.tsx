import Leaderboard from "@/components/Leaderboard";

export default async function Home() {
  // server-side fetch of your static JSON
  const rows: {
    rank: number;
    doi: string;
    title: string;
    aiCites: number;
  }[] = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/mock/leaderboard.json`, {
    cache: "no-store",
  }).then(res => res.json());

  return (
    <div className="min-h-screen p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold">AI-Cite Score</h1>
        <p className="text-gray-600">How often are AIs citing your work?</p>
      </header>
      <Leaderboard rows={rows} />
    </div>
  );
}