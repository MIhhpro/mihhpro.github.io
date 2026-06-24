import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const BOOKINGS_PATH = path.join(__dirname, "data", "bookings.json");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const DEFAULT_SLOTS = Array.from({ length: 10 }, (_, idx) => `${String(idx + 12).padStart(2, "0")}:00`);
const AVAILABLE_DOW = new Set([1, 3, 5, 6]);

function ensureStore() {
  const dir = path.dirname(BOOKINGS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(BOOKINGS_PATH)) fs.writeFileSync(BOOKINGS_PATH, "[]\n", "utf8");
}

function readBookings() {
  ensureStore();
  try {
    const raw = fs.readFileSync(BOOKINGS_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeBookings(bookings) {
  fs.writeFileSync(BOOKINGS_PATH, `${JSON.stringify(bookings, null, 2)}\n`, "utf8");
}

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isTime(value) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function isDateOpen(dateString) {
  if (!isIsoDate(dateString)) return false;
  const date = new Date(`${dateString}T00:00:00`);
  return AVAILABLE_DOW.has(date.getDay());
}

app.get("/api/slots", (req, res) => {
  const date = String(req.query.date || "");
  if (!isIsoDate(date)) {
    return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
  }

  if (!isDateOpen(date)) {
    return res.json({ date, slots: [] });
  }

  const bookings = readBookings();
  const reserved = new Set(
    bookings
      .filter((b) => b.date === date && b.status === "booked")
      .map((b) => b.time)
  );

  const slots = DEFAULT_SLOTS.map((time) => ({
    time,
    available: !reserved.has(time)
  }));

  return res.json({ date, slots });
});

app.post("/api/bookings", (req, res) => {
  const body = req.body || {};
  const required = ["fname", "lname", "email", "service", "date", "time", "message"];
  for (const field of required) {
    if (!String(body[field] || "").trim()) {
      return res.status(400).json({ error: `Missing required field: ${field}` });
    }
  }

  const date = String(body.date);
  const time = String(body.time);
  if (!isIsoDate(date)) {
    return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
  }
  if (!isTime(time)) {
    return res.status(400).json({ error: "Invalid time format. Use HH:MM." });
  }
  if (!isDateOpen(date)) {
    return res.status(400).json({ error: "Selected date is not available." });
  }
  if (!DEFAULT_SLOTS.includes(time)) {
    return res.status(400).json({ error: "Selected time is outside available hours." });
  }

  const bookings = readBookings();
  const taken = bookings.some((b) => b.date === date && b.time === time && b.status === "booked");
  if (taken) {
    return res.status(409).json({ error: "Ez az időpont már foglalt. Válassz másikat." });
  }

  const booking = {
    id: Date.now(),
    fname: String(body.fname).trim(),
    lname: String(body.lname).trim(),
    email: String(body.email).trim(),
    phone: String(body.phone || "").trim(),
    service: String(body.service).trim(),
    date,
    time,
    message: String(body.message).trim(),
    status: "booked",
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);
  writeBookings(bookings);

  return res.status(201).json({ ok: true, bookingId: booking.id });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
