# Film Kütüphanesi - React Frontend

Modern ve kullanıcı dostu bir film kütüphanesi uygulaması. TMDB API'den film verilerini çeker ve kullanıcıların kişisel film kütüphanelerini oluşturmasına olanak tanır.

## 🎬 Özellikler

- **Ana Sayfa**: Popüler, en çok oy alan, vizyonda ve yakında gelecek filmler
- **Film Arama**: Gelişmiş film arama özelliği
- **Kişisel Kütüphane**: Filmleri kütüphaneye ekleme/çıkarma
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Modern UI**: Tailwind CSS ile güzel arayüz
- **Gerçek Zamanlı Güncelleme**: Context API ile anlık durum yönetimi

## 🛠️ Teknolojiler

- **React 18** - Modern React hooks ve functional components
- **TypeScript** - Tip güvenliği
- **React Router** - Sayfa yönlendirme
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP istekleri
- **Heroicons** - Modern ikonlar
- **Headless UI** - Erişilebilir UI bileşenleri

## 🚀 Kurulum

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

2. **Uygulamayı başlatın:**
   ```bash
   npm start
   ```

3. **Tarayıcıda açın:**
   ```
   http://localhost:3000
   ```

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── Header.tsx      # Navigasyon header'ı
│   ├── MovieCard.tsx   # Film kartı bileşeni
│   └── MovieGrid.tsx   # Film grid bileşeni
├── pages/              # Sayfa bileşenleri
│   ├── HomePage.tsx    # Ana sayfa
│   ├── SearchPage.tsx  # Arama sayfası
│   └── LibraryPage.tsx # Kütüphane sayfası
├── services/           # API servisleri
│   └── api.ts         # API çağrıları
├── types/              # TypeScript tip tanımları
│   └── index.ts       # Interface'ler
└── App.tsx            # Ana uygulama bileşeni
```

## 🎯 Kullanım

### Ana Sayfa
- Popüler filmler
- En çok oy alan filmler
- Şu anda vizyonda olan filmler
- Yakında gelecek filmler

### Film Arama
- Film adına göre arama
- Gerçek zamanlı sonuçlar
- Detaylı film bilgileri

### Kütüphane
- Kişisel film koleksiyonu
- Film ekleme/çıkarma
- Kütüphane istatistikleri
- Kullanıcı değiştirme (testuser1, testuser2)

## 🔧 API Entegrasyonu

Backend API endpoint'leri:
- `GET /api/movies/popular` - Popüler filmler
- `GET /api/movies/top-rated` - En çok oy alan filmler
- `GET /api/movies/now-playing` - Vizyonda olan filmler
- `GET /api/movies/upcoming` - Yakında gelecek filmler
- `GET /api/movies/search` - Film arama
- `GET /api/user-library/{userId}` - Kullanıcı kütüphanesi
- `POST /api/user-library/{userId}/movies/{movieId}` - Film ekleme
- `DELETE /api/user-library/{userId}/movies/{movieId}` - Film çıkarma

## 🎨 Tasarım

- **Renk Paleti**: Koyu tema (gray-900, gray-800)
- **Ana Renk**: Turuncu (primary-500, primary-600)
- **Tipografi**: Modern sans-serif fontlar
- **Animasyonlar**: Hover efektleri ve geçişler
- **Responsive**: Mobil-first yaklaşım

## 📱 Responsive Tasarım

- **Mobil**: 1 sütun grid
- **Tablet**: 2-3 sütun grid
- **Desktop**: 4-5 sütun grid
- **Büyük Ekran**: 5+ sütun grid

## 🔄 State Yönetimi

- **Context API**: Kütüphane durumu
- **Local State**: Sayfa durumları
- **Real-time Updates**: Anlık kütüphane güncellemeleri

## 🚀 Geliştirme

```bash
# Geliştirme sunucusu
npm start

# Production build
npm run build

# Test çalıştırma
npm test

# Lint kontrolü
npm run lint
```

## 📝 Notlar

- Backend'in çalışır durumda olması gerekiyor (port 8080)
- CORS ayarları backend'de yapılandırılmış
- Test kullanıcıları: testuser1, testuser2
- TMDB API entegrasyonu backend üzerinden

## 🎉 Özellikler

✅ Film listeleme  
✅ Film arama  
✅ Kütüphane yönetimi  
✅ Responsive tasarım  
✅ Modern UI/UX  
✅ TypeScript desteği  
✅ Context API  
✅ Real-time updates  
✅ Error handling  
✅ Loading states  
