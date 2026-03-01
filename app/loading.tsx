export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-brand-border" />
          <div className="absolute inset-0 rounded-full border-4 border-brand-accent border-t-transparent animate-spin" />
        </div>
        <p className="text-brand-muted-light text-sm font-medium tracking-wide uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
}