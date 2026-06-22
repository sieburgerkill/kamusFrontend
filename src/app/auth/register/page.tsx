'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser, saveToken } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nama wajib diisi';
    if (!form.email) e.email = 'Email wajib diisi';
    if (form.password.length < 6) e.password = 'Password minimal 6 karakter';
    if (form.password !== form.confirm) e.confirm = 'Password tidak cocok';
    return e;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setApiError('');

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const { access_token } = await registerUser({
        name: form.name.trim(),
        email: form.email,
        password: form.password,
      });
      saveToken(access_token);
      router.push('/dashboard');
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Pendaftaran gagal');
    } finally {
      setLoading(false);
    }
  }

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { level: 1, label: 'Lemah', color: 'bg-hanbok' };
    if (p.length < 10) return { level: 2, label: 'Sedang', color: 'bg-gold' };
    return { level: 3, label: 'Kuat', color: 'bg-jade' };
  })();

  return (
    <div className="auth-card p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink mb-1">Buat akun baru</h1>
        <p className="text-gray-500 text-sm">Daftar dan mulai belajar EPS-TOPIK hari ini</p>
      </div>

      {/* API Error Banner */}
      {apiError && (
        <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-100 text-hanbok rounded-xl px-4 py-3 text-sm">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Name */}
        <div>
          <label htmlFor="name" className="label">Nama lengkap</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nama kamu"
            className={`input-field ${errors.name ? 'border-hanbok ring-2 ring-hanbok/20' : ''}`}
          />
          {errors.name && <p className="error-msg">⚠ {errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="nama@email.com"
            className={`input-field ${errors.email ? 'border-hanbok ring-2 ring-hanbok/20' : ''}`}
          />
          {errors.email && <p className="error-msg">⚠ {errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="label mb-0">Password</label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-gray-400 hover:text-ink transition-colors"
            >
              {showPassword ? 'Sembunyikan' : 'Tampilkan'}
            </button>
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Min. 6 karakter"
            className={`input-field ${errors.password ? 'border-hanbok ring-2 ring-hanbok/20' : ''}`}
          />
          {/* Password strength */}
          {passwordStrength && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i <= passwordStrength.level ? passwordStrength.color : 'bg-mist'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400">
                Keamanan password: <span className="font-medium text-ink">{passwordStrength.label}</span>
              </p>
            </div>
          )}
          {errors.password && <p className="error-msg">⚠ {errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirm" className="label">Konfirmasi password</label>
          <input
            id="confirm"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            placeholder="Ulangi password"
            className={`input-field ${errors.confirm ? 'border-hanbok ring-2 ring-hanbok/20' : ''}`}
          />
          {errors.confirm && <p className="error-msg">⚠ {errors.confirm}</p>}
          {form.confirm && !errors.confirm && form.password === form.confirm && (
            <p className="text-jade text-sm mt-1">✓ Password cocok</p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Mendaftar...
              </span>
            ) : (
              'Daftar'
            )}
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="divider my-6">atau</div>

      {/* Login link */}
      <p className="text-center text-sm text-gray-500">
        Sudah punya akun?{' '}
        <Link href="/auth/login" className="text-hanbok font-semibold hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
