export default function ScoreBadge({ score }: { score: number }) {
    return (
      <div className="text-6xl font-bold text-teal-600">
        {score.toLocaleString()}
      </div>
    );
  }
  