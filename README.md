# 🚗 Hammad Rent Car

Full-stack car rental website — React frontend + Node/Express backend + MongoDB database.

Every feature you asked for is wired up as separate files so you can extend each piece independently:

- Car listing with search & filters (city, category, price, transmission, fuel, seats)
- Booking system with date-overlap checking and pricing calculation
- User signup/login (JWT auth, bcrypt password hashing)
- Admin panel (manage cars, view/update bookings, view users, dashboard stats)
- Reviews & ratings per car
- Pickup / drop-off location fields
- Optional Stripe payment integration
- Mobile-responsive UI (Tailwind CSS)
- SEO basics (meta tags, Open Graph, robots.txt, sitemap.xml)

## Folder structure

```
hammad-rent-car/
├── backend/              Node.js + Express + MongoDB API
│   ├── config/db.js
│   ├── models/           User, Car, Booking, Review
│   ├── middleware/       auth (JWT), admin
│   ├── routes/           auth, cars, bookings, reviews, admin, payments
│   ├── utils/generateToken.js
│   ├── server.js
│   └── .env.example
│
└── frontend/              React (Vite) + Tailwind CSS
    ├── src/
    │   ├── api/axios.js          preconfigured axios instance
    │   ├── context/AuthContext.jsx
    │   ├── components/           Navbar, Footer, CarCard, SearchFilters, ReviewList, ProtectedRoute
    │   ├── pages/                Home, CarListing, CarDetails, Booking, Login, Signup, Profile, AdminDashboard
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/robots.txt, sitemap.xml
    └── .env.example
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env     # then fill in MONGO_URI, JWT_SECRET, etc.
npm run dev               # starts on http://localhost:5000
```

You need a MongoDB database — either install MongoDB locally or create a free cluster on
MongoDB Atlas and paste its connection string into `MONGO_URI`.

### Make the first admin user
There's no public "become admin" endpoint (for security). After signing up normally through
the site, open your database and change that user's `role` field from `"user"` to `"admin"` —
e.g. in MongoDB Compass, or with `mongosh`:

```js
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env     # VITE_API_URL should point to your backend, e.g. http://localhost:5000/api
npm run dev               # starts on http://localhost:5173
```

## 3. Payments (optional)

The booking form lets a user pick "Pay Online (Stripe)" as a method, and
`backend/routes/paymentRoutes.js` has a ready `/api/payments/create-payment-intent` endpoint.
To activate it:
1. Get a Stripe secret key and put it in `backend/.env` as `STRIPE_SECRET_KEY`.
2. On the frontend, install `@stripe/stripe-js` and `@stripe/react-stripe-js`, then use
   `create-payment-intent` + Stripe Elements on the Booking page to collect card details.

Without a Stripe key, the site still works fully with "Cash on Pickup" / "Card at office" as
payment methods — nothing breaks.

## 4. What to extend next
- Image uploads (currently cars take image URLs — wire up `multer` + a storage bucket like
  Cloudinary or S3 for real uploads).
- Email notifications (booking confirmations) — e.g. with Nodemailer.
- More granular admin permissions, car availability calendar, discount codes.
- Replace the placeholder favicon/OG image in `frontend/public/`.

## 5. New in this update
- **Hero background video** on the homepage (Home.jsx) — the video URL is one line at the top of that file (`HERO_VIDEO_URL`), change it any time.
- **Featured cars on homepage** — automatically pulls the latest cars from your database, no manual work needed once you add cars in Admin.
- **"Booked" badge** — cars with an active booking covering today automatically show a "Booked" label.
- **New-car notifications** — a bell icon appears in the navbar for logged-in users; when admin adds a car, everyone sees an unread badge and a message in the dropdown.
- **Country/region selector** — cars now have a `country` field; users can filter by country as well as city.
- **Location map** — the car details page embeds a Google Map of the pickup location (no API key needed for the basic embed).
- **Email + WhatsApp notifications** — see the two sections below.

### Email notifications (new booking alerts)
Add to `backend/.env`:
```
ADMIN_EMAIL=owner@example.com
EMAIL_USER=youraccount@gmail.com
EMAIL_PASS=your_16_char_app_password
```
`EMAIL_USER`/`EMAIL_PASS` must be a Gmail account with an **App Password** (Google Account →
Security → 2-Step Verification → App Passwords). Without these two vars set, the app just
skips sending email — booking still works normally.

### WhatsApp contact button
Add your WhatsApp number (digits only, with country code, no `+` or spaces) to **both**:
```
backend/.env   → ADMIN_WHATSAPP=923001234567
frontend/.env  → VITE_ADMIN_WHATSAPP=923001234567
```
A floating WhatsApp button then appears on every page.

## Tech stack
**Frontend:** React 18, React Router, Tailwind CSS, Axios, react-helmet-async (SEO tags)
**Backend:** Node.js, Express, MongoDB + Mongoose, JWT, bcryptjs, express-validator, Stripe (optional)
