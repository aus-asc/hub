export default function ErrorState({ onRetry }) {
  return (
    <div className="py-14 text-center anim-fade-up">
      <div className="text-3xl mb-3">⚠️</div>
      <p className="text-sm font-bold text-gray-700 mb-1">Couldn't load data</p>
      <p className="text-xs text-gray-400 mb-4">
        Check your connection or try again.
      </p>
      <button
        onClick={onRetry}
        className="text-xs font-semibold text-[var(--color-blue)] border border-[var(--color-blue)]/30 px-4 py-1.5 rounded-full hover:bg-[var(--color-blue)]/5 transition-colors cursor-pointer"
      >
        Retry
      </button>
    </div>
  );
}
