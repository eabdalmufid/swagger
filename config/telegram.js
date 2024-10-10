const axios = require('axios');
require('dotenv').config();

const sendTelegramNotification = (user) => {
  const message = `New user registered: ${user.email}`;
  axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    chat_id: process.env.TELEGRAM_CHAT_ID,
    text: message,
  });
};

module.exports = sendTelegramNotification;