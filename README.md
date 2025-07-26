# 🎬 Film Kütüphanesi

Modern ve kullanıcı dostu bir film kütüphanesi uygulaması. TMDB API'den film verilerini çeker ve kullanıcıların kişisel film kütüphanelerini oluşturmasına olanak tanır.

## 🚀 Hızlı Başlangıç

### Backend (Spring Boot)
```bash
# Backend dizinine git
cd film-app

# Uygulamayı başlat
./mvnw spring-boot:run
```

### Frontend (React)
```bash
# Frontend dizinine git
cd frontend

# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npm start
```

## 🌐 Erişim

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Database**: MySQL (filmdb)

## 🛠️ Teknoloji Stack

### Backend
- **Spring Boot 3.5.4** - Ana framework
- **Spring Data JPA** - Veritabanı işlemleri
- **MySQL 8.0** - Veritabanı
- **TMDB API** - Film verileri
- **Maven** - Build tool
- **Java 24** - Programlama dili

### Frontend
- **React 18** - UI framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **Heroicons** - İkonlar

## 📁 Proje Yapısı

```
film-app/
├── src/main/java/com/film_app/
│   ├── controller/     # REST API controllers
│   ├── service/        # Business logic
│   ├── repository/     # Data access layer
│   ├── entity/         # Database entities
│   ├── dto/           # Data transfer objects
│   └── config/        # Configuration classes
├── src/main/resources/
│   └── application.properties
├── frontend/          # React uygulaması
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── package.json
└── README.md
```

## 🎯 Özellikler

### ✅ Tamamlanan Özellikler
- [x] Film listeleme (Popüler, En çok oy alan, Vizyonda, Yakında)
- [x] Film arama
- [x] Kişisel kütüphane oluşturma
- [x] Film ekleme/çıkarma
- [x] Responsive tasarım
- [x] Modern UI/UX
- [x] Real-time güncellemeler
- [x] Error handling
- [x] Loading states
- [x] TypeScript desteği
- [x] Context API
- [x] CORS yapılandırması

### 🔄 API Endpoints

#### Film Endpoints
- `GET /api/movies/popular` - Popüler filmler
- `GET /api/movies/top-rated` - En çok oy alan filmler
- `GET /api/movies/now-playing` - Vizyonda olan filmler
- `GET /api/movies/upcoming` - Yakında gelecek filmler
- `GET /api/movies/search?query={query}` - Film arama
- `GET /api/movies/{id}` - Film detayları

#### Kullanıcı Endpoints
- `GET /api/users` - Tüm kullanıcılar
- `GET /api/users/{id}` - Kullanıcı detayları
- `POST /api/users` - Yeni kullanıcı
- `PUT /api/users/{id}` - Kullanıcı güncelleme
- `DELETE /api/users/{id}` - Kullanıcı silme

#### Kütüphane Endpoints
- `GET /api/user-library/{userId}` - Kullanıcı kütüphanesi
- `POST /api/user-library/{userId}/movies/{movieId}` - Film ekleme
- `DELETE /api/user-library/{userId}/movies/{movieId}` - Film çıkarma
- `GET /api/user-library/{userId}/movies/{movieId}/check` - Film kontrolü
- `GET /api/user-library/{userId}/count` - Kütüphane sayısı

## 🗄️ Veritabanı Şeması

### Users Tablosu
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL
);
```

### User_Libraries Tablosu
```sql
CREATE TABLE user_libraries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    tmdb_movie_id BIGINT NOT NULL,
    added_date DATETIME NOT NULL,
    movie_title VARCHAR(255),
    movie_poster_path VARCHAR(500),
    movie_overview TEXT,
    movie_release_date VARCHAR(50),
    movie_rating DOUBLE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🔧 Konfigürasyon

### Backend Konfigürasyonu
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/filmdb?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=852147

# TMDB API
tmdb.api.key=c53547adb8998db79080f21bd7190fb7
tmdb.api.base-url=https://api.themoviedb.org/3
tmdb.api.image-base-url=https://image.tmdb.org/t/p/w500

# CORS
spring.web.cors.allowed-origins=http://localhost:3000
```

### Frontend Konfigürasyonu
```typescript
// API Base URL
const API_BASE_URL = 'http://localhost:8080/api';
```

## 👥 Test Kullanıcıları

Backend başlatıldığında otomatik olarak oluşturulan test kullanıcıları:

1. **testuser1** (ID: 1)
2. **testuser2** (ID: 2)

## 🎨 UI/UX Özellikleri

- **Koyu Tema**: Göz yormayan koyu arka plan
- **Responsive Design**: Mobil ve masaüstü uyumlu
- **Modern Animasyonlar**: Hover efektleri ve geçişler
- **Intuitive Navigation**: Kolay kullanım
- **Loading States**: Kullanıcı deneyimi için yükleme göstergeleri
- **Error Handling**: Kullanıcı dostu hata mesajları

## 🚀 Deployment

### Backend Deployment
```bash
# JAR dosyası oluştur
./mvnw clean package

# JAR dosyasını çalıştır
java -jar target/film-app-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
# Production build
npm run build

# Build klasörünü web sunucusuna yükle
```

## 🔍 Troubleshooting

### Yaygın Sorunlar

1. **CORS Hatası**: Backend'de CORS ayarlarını kontrol edin
2. **Database Bağlantı Hatası**: MySQL servisinin çalıştığından emin olun
3. **API Key Hatası**: TMDB API key'inin doğru olduğunu kontrol edin
4. **Port Çakışması**: 8080 ve 3000 portlarının boş olduğunu kontrol edin

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Proje hakkında sorularınız için issue açabilirsiniz.

---

**🎬 Film Kütüphanesi** - Modern film keşif deneyimi 