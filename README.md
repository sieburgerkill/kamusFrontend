# Kamus EPS-TOPIK — Frontend (Next.js)

## Setup

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local: ubah NEXT_PUBLIC_API_URL ke URL backend kamu
npm run dev   # berjalan di http://localhost:3001
```

## Struktur

```
src/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx       # Halaman login → POST /auth/login
│   │   ├── register/page.tsx    # Halaman daftar → POST /auth/register
│   │   └── layout.tsx           # Layout split-panel auth
│   ├── dashboard/page.tsx       # Protected dashboard
│   ├── globals.css
│   └── layout.tsx
└── lib/
    └── api.ts                   # Fungsi fetch ke backend + token helper
```

## Endpoint yang dipakai

| Halaman    | Method | Endpoint         |
|------------|--------|-----------------|
| Register   | POST   | /auth/register   |
| Login      | POST   | /auth/login      |

Token JWT disimpan di `localStorage` dengan key `eps_token`.
