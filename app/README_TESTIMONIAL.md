# RYVEN STORE - Halaman Testimoni

## Deskripsi
Halaman testimoni untuk RYVEN STORE yang menampilkan testimoni pelanggan dengan gambar, rating, dan deskripsi produk.

## Struktur File
```
app/
├── testimonial/
│   └── page.js          # Halaman testimoni utama
├── public/
│   └── testimonial/     # Folder gambar testimoni
│       ├── image1.jpg
│       ├── IMG_20240906_140823.jpg
│       ├── IMG_20240906_140839.jpg
│       ├── IMG_20240906_140902.jpg
│       ├── IMG_20240906_140915.jpg
│       ├── IMG_20240906_140950.jpg
│       └── IMG_20240906_143031.jpg
└── components/
    ├── Header.js        # Header dengan navigasi
    └── Footer.js        # Footer
```

## Cara Menambah Testimoni Baru

### 1. Tambahkan Gambar
- Simpan gambar testimoni di folder `public/testimonial/`
- Pastikan format gambar adalah JPG, PNG, atau WebP
- Gunakan nama file yang deskriptif

### 2. Edit Data Testimoni
Buka file `testimonial/page.js` dan tambahkan data testimoni baru ke dalam array `testimonials`:

```javascript
{
    id: 8, // ID unik (increment dari ID terakhir)
    image: "/testimonial/nama-gambar.jpg", // Path relatif dari folder public
    productName: "Nama Produk",
    price: "Rp 50.000",
    rating: 5, // Rating 1-5 (bisa desimal seperti 4.5)
    description: "Deskripsi testimoni dari pelanggan...",
    customerName: "Nama Pelanggan"
}
```

### 3. Format Data Lengkap
```javascript
const testimonials = [
    // Testimoni yang sudah ada...
    {
        id: 8,
        image: "/testimonial/gambar-baru.jpg",
        productName: "Diamond Mobile Legends",
        price: "Rp 50.000",
        rating: 5,
        description: "Top up berhasil dengan cepat! Admin ramah dan responsive.",
        customerName: "Nama Pelanggan"
    }
]
```

## Fitur Halaman

### 🎨 **Desain & UI**
- Tema gelap dengan gradien warna
- Animasi smooth menggunakan Framer Motion
- Responsive design untuk desktop dan mobile
- Hover effects pada kartu testimoni

### 📊 **Statistik**
- Jumlah testimoni positif (otomatis update)
- Rating rata-rata (4.8)
- Persentase kepuasan pelanggan (100%)

### ⭐ **Sistem Rating**
- Rating 1-5 bintang
- Support setengah bintang (4.5)
- Bintang kosong untuk rating rendah

### 🖼️ **Gambar**
- Fallback image jika gambar tidak tersedia
- Optimized untuk web
- Aspect ratio konsisten

## Deployment di Vercel

### 1. Pastikan Struktur Folder Benar
```
public/
└── testimonial/
    └── [semua gambar testimoni]
```

### 2. Path Gambar
- Gunakan path relatif dari folder `public`
- Format: `/testimonial/nama-gambar.jpg`
- Jangan gunakan `/testimonial/image/nama-gambar.jpg`

### 3. Deploy
- Push ke repository GitHub
- Connect ke Vercel
- Deploy otomatis akan berjalan

## Troubleshooting

### Gambar Tidak Muncul
1. Pastikan gambar ada di folder `public/testimonial/`
2. Periksa nama file (case sensitive)
3. Pastikan format file didukung (JPG, PNG, WebP)
4. Cek console browser untuk error

### Error di Vercel
1. Pastikan semua gambar sudah di-push ke repository
2. Periksa build log di Vercel dashboard
3. Pastikan path gambar benar

## Kontak
Untuk bantuan lebih lanjut, hubungi developer RYVEN STORE.
