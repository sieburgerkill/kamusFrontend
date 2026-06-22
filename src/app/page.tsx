import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center korean-bg px-4">
      {/* Logo Mark */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-hanbok rounded-2xl mb-4 shadow-lg">
          <span className="text-white text-3xl font-bold" style={{ fontFamily: 'serif' }}>한</span>
        </div>
        <h1 className="text-3xl font-bold text-ink tracking-tight">Kamus EPS-TOPIK</h1>
        <p className="text-gray-500 mt-2 text-sm">Belajar Korea untuk ujian EPS-TOPIK</p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link href="/auth/login" className="btn-primary text-center block py-3 rounded-xl bg-hanbok text-white font-semibold hover:bg-red-700 transition-colors">
          Masuk
        </Link>
        <Link href="/auth/register" className="btn-ghost text-center block py-3 rounded-xl border border-mist text-ink font-medium hover:bg-mist transition-colors">
          Daftar Akun Baru
        </Link>
      </div>
    </main>
  );
}
