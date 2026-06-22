'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, removeToken } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.replace('/auth/login');
    } else {
      setReady(true);
    }
  }, [router]);

  function handleLogout() {
    removeToken();
    router.push('/auth/login');
  }

  if (!ready) return null;

  return (
    <div className="min-h-screen korean-bg">
      {/* Navbar */}
      <header className="bg-white border-b border-mist px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-hanbok rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm" style={{ fontFamily: 'serif' }}>한</span>
          </div>
          <span className="font-semibold text-ink">Kamus EPS-TOPIK</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-hanbok transition-colors font-medium"
        >
          Keluar
        </button>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="auth-card p-10">
          <div className="text-4xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-ink mb-2">Login berhasil!</h1>
          <p className="text-gray-500 text-sm">
            Kamu sudah berhasil terhubung ke backend. Sekarang bisa mulai bangun halaman kamus, grammar, dan topik.
          </p>
          <div className="mt-6 p-4 bg-mist rounded-xl text-left text-xs font-mono text-gray-600 space-y-1">
            <p>✅ POST /auth/register — terhubung</p>
            <p>✅ POST /auth/login — terhubung</p>
            <p>✅ JWT token tersimpan di localStorage</p>
          </div>
        </div>
      </main>
    </div>
  );
}
