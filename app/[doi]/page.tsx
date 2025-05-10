// app/[doi]/page.tsx
import ScoreBadge from "@/components/ScoreBadge";
import SparkLine from "@/components/SparkLine";
import Link from "next/link";

export default async function PaperPage(
  { params }: { params: { doi: string } } 
) {
  // convert the DOI into the mock‑file name
  const filename = params.doi.replaceAll("/", "_");

  const data: {
    doi: string;
    title: string;
    aiCites: number;
    timeline: number[];
  } = await fetch(`/mock/doi/${filename}.json`, { cache: "no-store" })
    .then(r => r.json());

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <Link href="/" className="text-sm text-teal-600 underline">
        ← Back to leaderboard
      </Link>

      <h1 className="text-3xl font-bold mt-4">{data.title}</h1>
      <ScoreBadge score={data.aiCites} />

      <div className="mt-8">
        <SparkLine points={data.timeline} />
      </div>
    </div>
  );
}
