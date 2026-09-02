const express = require('express');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔗 Вкажіть тут ваш URL з Google Apps Script (Deploy -> Web app URL)
const GAS_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

// Простий веб-сервер для Render, щоб сервіс вважав застосунок активним
app.get('/', (req, res) => {
  res.send('Pinger is running 24/7!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Функція для надсилання GET-запиту на Google Apps Script
function pingGAS() {
  https.get(GAS_URL, (res) => {
    console.log(`[${new Date().toISOString()}] Ping status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`[${new Date().toISOString()}] Ping error:`, err.message);
  });
}

// Пінгуємо кожні 4 хвилини (240 000 мс)
const PING_INTERVAL = 4 * 60 * 1000;
setInterval(pingGAS, PING_INTERVAL);

// Перший запуск одразу після старту
pingGAS();
