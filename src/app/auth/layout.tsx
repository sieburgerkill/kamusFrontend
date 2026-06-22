import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex korean-bg">
      {/* Left panel - decorative (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink flex-col justify-between p-12 relative overflow-hidden">
        {/* Korean characters decorative */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="text-white select-none" style={{ fontSize: '40vw', fontFamily: 'serif', lineHeight: 1 }}>
            한
          </span>
        </div>

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-3 group">
          <div className="w-10 h-10 bg-hanbok rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white text-xl font-bold" style={{ fontFamily: 'serif' }}>한</span>
          </div>
          <span className="text-white font-semibold text-lg">Kamus EPS-TOPIK</span>
        </Link>

        {/* Tagline */}
        <div className="relative z-10">
          <p className="text-gray-400 text-sm mb-3 uppercase tracking-widest font-medium">Mulai perjalananmu</p>
          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Kuasai<br />
            <span className="text-hanbok">Korean</span><br />
            untuk EPS
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Kosakata, tata bahasa, dan contoh kalimat lengkap untuk persiapan ujian EPS-TOPIK kamu.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-8">
          {[
            { num: '2.000+', label: 'Kosakata' },
            { num: '50+', label: 'Topik' },
            { num: '500+', label: 'Contoh' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-white font-bold text-xl">{s.num}</div>
              <div className="text-gray-500 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-9 h-9 bg-hanbok rounded-xl flex items-center justify-center">
            <span className="text-white text-lg font-bold" style={{ fontFamily: 'serif' }}>한</span>
          </div>
          <span className="font-semibold text-ink">Kamus EPS-TOPIK</span>
        </Link>

        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
