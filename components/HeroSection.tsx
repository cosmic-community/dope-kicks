import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-darker">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
            New Drops Every Week
          </span>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Step Into
            <br />
            <span className="gradient-text">Greatness</span>
          </h1>

          <p className="text-xl text-brand-muted-light max-w-xl mb-10 leading-relaxed">
            Exclusive designer shoes and rare collectibles. Authentic kicks for
            the culture — from deadstock Jordans to vintage grails.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-accent hover:bg-brand-accent-dark text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-accent/25 text-base"
            >
              Shop Collection
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-brand-border-light hover:border-brand-accent text-white font-bold rounded-xl transition-all text-base"
            >
              Browse Categories
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
          {[
            { label: 'Exclusive Drops', value: '100+' },
            { label: 'Happy Customers', value: '5K+' },
            { label: 'Brands', value: '50+' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl md:text-3xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-brand-muted text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}