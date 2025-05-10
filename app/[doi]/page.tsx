import ScoreBadge from "@/components/ScoreBadge";
import SparkLine from "@/components/SparkLine";
import Link from "next/link";

interface Params { params: { doi: string } }

export default async function PaperPage({ params }: Params) {
  // turn URL-encoded DOI back into a filename
  const filename = params.doi.replaceAll("/", "_");
  const data: {
    doi: string;
    title: string;
    aiCites: number;
    timeline: number[];
  } = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/mock/doi/${filename}.json`,
    { cache: "no-store" }
  ).then(r => r.json());

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
