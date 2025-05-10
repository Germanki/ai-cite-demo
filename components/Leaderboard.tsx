"use client";
import Link from "next/link";
type Row = { rank: number; doi: string; title: string; aiCites: number };
export default function Leaderboard({ rows }: { rows: Row[] }) {
  return (
    <table className="w-full">
      <thead className="text-sm font-semibold text-gray-600">
        <tr><th>Rank</th><th>Paper</th><th className="text-right">AI-Cites</th></tr>
      </thead>
      <tbody className="space-y-2">
        {rows.map(r => (
          <tr key={r.doi} className="bg-white shadow-md rounded-xl hover:scale-[1.02] transition">
            <td className="p-4">{r.rank}</td>
            <td className="p-4">
              <Link href={`/${encodeURIComponent(r.doi)}`} className="underline">
                {r.title}
              </Link>
            </td>
            <td className="p-4 text-right font-medium">{r.aiCites}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
