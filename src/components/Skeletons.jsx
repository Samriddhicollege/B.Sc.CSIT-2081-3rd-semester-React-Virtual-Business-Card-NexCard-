export function CardSkeleton() {
  return (
    <div className="bg-[#111318] rounded-xl border border-white/[0.06] overflow-hidden animate-pulse">
      <div className="h-2 w-full bg-gradient-to-r from-[#1a1d26] to-[#222630]" />
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#1a1d26] shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-[#1a1d26] rounded-lg w-3/4" />
            <div className="h-3 bg-[#1a1d26] rounded-lg w-1/2" />
            <div className="flex gap-3 mt-3">
              <div className="h-2.5 bg-[#1a1d26] rounded w-16" />
              <div className="h-2.5 bg-[#1a1d26] rounded w-20" />
            </div>
          </div>
        </div>
        <div className="mt-4 h-8 bg-[#0d0f14] rounded-lg" />
        <div className="mt-4 flex gap-2">
          <div className="flex-1 h-9 bg-[#1a1d26] rounded-lg" />
          <div className="flex-1 h-9 bg-[#1a1d26] rounded-lg" />
          <div className="w-10 h-9 bg-[#1a1d26] rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function TemplateSkeleton() {
  return (
    <div className="bg-[#111318] rounded-xl border border-white/[0.06] overflow-hidden animate-pulse">
      <div className="aspect-[1.75/1] bg-[#1a1d26]" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-[#1a1d26] rounded-lg w-2/3" />
        <div className="h-3 bg-[#1a1d26] rounded-lg w-1/3" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="w-9 h-9 rounded-full bg-[#1a1d26]" />
      <div className="space-y-1.5">
        <div className="h-3 bg-[#1a1d26] rounded w-20" />
        <div className="h-2 bg-[#1a1d26] rounded w-28" />
      </div>
    </div>
  );
}
