import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-darker border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">👟</span>
              <span className="text-xl font-bold text-white">DOPE KICKS</span>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed">
              Your destination for designer shoes and rare collectibles. Authentic kicks,
              unbeatable style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/products', label: 'All Products' },
                { href: '/categories', label: 'Categories' },
                { href: '/reviews', label: 'Customer Reviews' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-muted hover:text-brand-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter placeholder */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Stay Connected
            </h3>
            <p className="text-brand-muted text-sm mb-4">
              Follow us for the latest drops and exclusive releases.
            </p>
            <div className="flex gap-3">
              {['Twitter', 'Instagram', 'TikTok'].map((platform) => (
                <span
                  key={platform}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-card border border-brand-border text-brand-muted hover:text-brand-accent hover:border-brand-accent transition-colors text-xs font-bold cursor-pointer"
                >
                  {platform.charAt(0)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-muted text-sm">
            &copy; {currentYear} Dope Kicks. All rights reserved.
          </p>
          <p className="text-brand-muted text-xs">
            Powered by{' '}
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent hover:text-brand-accent-light transition-colors"
            >
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}