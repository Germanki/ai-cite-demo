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

  const data = await fetch(`/mock/doi/${filename}.json`, { cache: "no-store" })
    .then(r => r.json()) as {
      doi: string;
      title: string;
      aiCites: number;
      timeline: number[];
    };

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
