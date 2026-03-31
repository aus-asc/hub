export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-[#3d8cc4] rounded-full spin" />
      <p className="text-xs text-gray-400">Loading leaderboard…</p>
    </div>
  );
}
