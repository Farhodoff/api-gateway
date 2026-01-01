# API Gateway

## Loyiha Haqida (About)
Ushbu loyiha zamonaviy mikroservis arxitekturasi uchun mo'ljallangan yuqori unumdor **API Gateway** hisoblanadi. U barcha kiruvchi so'rovlar uchun yagona kirish nuqtasi (Entry Point) sifatida xizmat qiladi va xavfsizlik, marshrutlash (routing) hamda trafikni boshqarish vazifalarini bajaradi.

## Asosiy Maqsadi
Loyiha orqa fondagi xizmatlarni (backend services) to'g'ridan-to'g'ri internetga chiqishdan himoya qiladi va mijozlar (frontend, mobile) uchun yagona, soddalashtirilgan interfeysni taqdim etadi.

## Asosiy Xususiyatlari (Features)
- **Markazlashgan Marshrutlash (Centralized Routing):** Barcha so'rovlarni tegishli mikroservislarga avtomatik yo'naltirish.
- **Xavfsizlik (JWT Authentication):** Barcha himoyalangan yo'llar uchun markazlashgan token tekshiruvi.
- **Rate Limiting (Redis):** Tizimni ortiqcha yuklama va DDOS hujumlaridan himoya qilish uchun so'rovlar sonini cheklash.
- **Proksi (Proxy):** `http-proxy-middleware` yordamida so'rovlarni o'zgartirmasdan yoki kerakli o'zgartirishlar bilan uzatish.
- **Interfeysni Soddalashtirish:** Mijoz tomoni uchun murakkab backend strukturasini yashirish.

## Texnologiyalar (Tech Stack)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database (Kesh):** Redis (Rate Limiting uchun)
- **Security:** JSON Web Token (JWT)
- **Proxy:** http-proxy-middleware

## O'rnatish va Ishga Tushirish (Installation)

1. **Repozitoriyni klonlash:**
   ```bash
   git clone <repository_url>
   cd api_gateway
   ```

2. **Kerakli kutubxonalarni o'rnatish:**
   ```bash
   npm install
   ```

3. **Redis serverni ishga tushirish:**
   Loyihada Redis ishlatilgani uchun lokal kompyuteringizda Redis o'rnatilgan va ishlayotgan bo'lishi kerak.
   ```bash
   redis-server
   ```

4. **Muhit o'zgaruvchilarini sozlash (.env):**
   `.env` faylida quyidagi sozlamalar bo'lishi kerak:
   ```
   PORT=3005
   REDIS_URL=redis://127.0.0.1:6379
   JWT_SECRET=maxfiy_kalit
   RATE_LIMIT_POINTS=50
   RATE_LIMIT_DURATION=1
   ```

5. **Loyihani ishga tushirish:**
   ```bash
   npm start
   ```

## Foydalanish
Server ishga tushgandan so'ng, u `http://localhost:3005` manzilida ishlaydi.
- **/health**: Tizim holatini tekshirish.
- **/login**: Test uchun token olish (mock).
- Boshqa so'rovlar sozlangan konfiguratsiyaga qarab tegishli servislarga yo'naltiriladi.
