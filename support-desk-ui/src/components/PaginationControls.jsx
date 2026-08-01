export default function PaginationControls({ page, totalPages, totalElements, onPrev, onNext }) {
  const canGoPrev = page > 0;
  const canGoNext = page < totalPages - 1;

  return (
    <div className="pagination-controls">
      <button
        className="pagination-btn"
        disabled={!canGoPrev}
        onClick={onPrev}
      >
        &larr; Previous
      </button>

      <span className="pagination-info">
        Page <strong>{page + 1}</strong> of <strong>{totalPages || 1}</strong>
        <span className="pagination-total"> ({totalElements} tickets)</span>
      </span>

      <button
        className="pagination-btn"
        disabled={!canGoNext}
        onClick={onNext}
      >
        Next &rarr;
      </button>
    </div>
  );
}
