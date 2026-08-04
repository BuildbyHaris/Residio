// src/modules/findHostel/components/FindHostelPagination.jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FindHostelPagination = ({ page = 1, totalPages = 1, onChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const push = (p) => pages.push(p);
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) push(i);
  } else {
    push(1);
    if (page > 4) push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) push(i);
    if (page < totalPages - 3) push('...');
    push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="w-9 h-9 rounded-lg border border-[#EDEDED] flex items-center justify-center disabled:opacity-40 hover:border-[#F5732C]"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`e-${i}`} className="px-2 text-gray-400">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
              p === page
                ? 'bg-[#F5732C] text-white'
                : 'bg-white border border-[#EDEDED] text-[#1B2333] hover:border-[#F5732C]'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="w-9 h-9 rounded-lg border border-[#EDEDED] flex items-center justify-center disabled:opacity-40 hover:border-[#F5732C]"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default FindHostelPagination;