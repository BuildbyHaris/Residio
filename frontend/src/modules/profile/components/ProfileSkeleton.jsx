const Skeleton = ({ className }) => (
  <div
    className={`animate-pulse rounded-2xl bg-gray-200 ${className}`}
  />
);

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#FEF7F2]">
      {/* Navbar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-8">
          <Skeleton className="h-10 w-36 rounded-xl" />

          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-8 px-8 py-8">
        {/* Sidebar */}
        <aside className="w-72 rounded-3xl bg-white p-6 shadow-sm">
          <Skeleton className="mb-8 h-8 w-40" />

          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          {/* Hero Card */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex items-center gap-6">
              <Skeleton className="h-28 w-28 rounded-full" />

              <div className="flex-1">
                <Skeleton className="mb-4 h-8 w-64" />
                <Skeleton className="mb-3 h-5 w-80" />
                <Skeleton className="h-5 w-52" />
              </div>

              <Skeleton className="h-12 w-36 rounded-xl" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white p-6 shadow-sm"
              >
                <Skeleton className="mb-4 h-10 w-10 rounded-xl" />
                <Skeleton className="mb-2 h-8 w-16" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>

          {/* Banner */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <Skeleton className="mb-4 h-8 w-80" />
            <Skeleton className="mb-3 h-5 w-full" />
            <Skeleton className="mb-6 h-5 w-2/3" />
            <Skeleton className="h-12 w-44 rounded-xl" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileSkeleton;