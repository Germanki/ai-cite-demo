// app/[doi]/page.tsx
import ScoreBadge from "@/components/ScoreBadge";
import SparkLine from "@/components/SparkLine";
import Link from "next/link";

type Props = {
  /** Next.js supplies this for dynamic routes */
  params: Promise<{ doi: string }>;
};

export default async function PaperPage({ params }: Props) {
  // If for some reason params is undefined, show a fallback
  if (!params) return <p className="p-8">No DOI provided.</p>;

  const { doi } = await params;
  const filename = doi.replaceAll("/", "_");
  const url = `/mock/doi/${filename}.json`;

  console.log(`Fetching data for DOI: ${doi}, filename: ${filename}, URL: ${url}`);

  let data;
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      return <p className="p-8">Error loading paper data. Status: {response.status}</p>;
    }
    data = await response.json() as {
      doi: string;
      title: string;
      aiCites: number;
      timeline: number[];
    };
  } catch (error) {
    console.error(`Error during fetch for ${url}:`, error);
    return <p className="p-8">An unexpected error occurred while loading paper data.</p>;
  }

  if (!data) {
    return <p className="p-8">Paper data could not be loaded.</p>;
  }

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <Link href="/" className="text-sm text-teal-600 underline">
        ← Back to leaderboard
      </Link>

      <h1 className="text-3xl font-bold mt-4">{data.title}</h1>
      <ScoreBadge score={data.aiCites} />

      <div className="mt-8">
        <SparkLine points={data.timeline} />
      </div>
    </div>
  );
}
