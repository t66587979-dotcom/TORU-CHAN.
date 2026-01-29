const fs = require("fs-extra");
const path = require("path");

const filePath = path.join(__dirname, "../../cache/currencies.json");

module.exports = {
  config: {
    name: "Game",
    description: "Economy system for TORU-CHAN",
    usage: "[.bal/.money/.balance/.give/.setmoney/.daily]",
    cooldown: 1,
    hasPermssion: 0
  },

  init: async function() {
    if(!fs.existsSync(filePath)) fs.writeJSONSync(filePath, {
      "100003673251961": { balance: 10000000000000000000000, daily: 0 } // special ID
    });
  },

  getBalance: async function(userID) {
    let data = await fs.readJSON(filePath);
    if(!data[userID]) {
      data[userID] = { balance: 10000, daily: 0 }; // new user default 10000$
      await fs.writeJSON(filePath, data, { spaces: 2 });
    }
    return data[userID].balance;
  },

  setBalance: async function(userID, amount) {
    let data = await fs.readJSON(filePath);
    if(!data[userID]) data[userID] = { balance: 10000, daily: 0 };
    data[userID].balance = amount;
    await fs.writeJSON(filePath, data, { spaces: 2 });
  },

  addBalance: async function(userID, amount) {
    let data = await fs.readJSON(filePath);
    if(!data[userID]) data[userID] = { balance: 10000, daily: 0 };
    data[userID].balance += amount;
    await fs.writeJSON(filePath, data, { spaces: 2 });
  },

  removeBalance: async function(userID, amount) {
    let data = await fs.readJSON(filePath);
    if(!data[userID]) data[userID] = { balance: 10000, daily: 0 };
    if(userID == "100003673251961") return; // special ID permanent
    data[userID].balance -= amount;
    if(data[userID].balance < 0) data[userID].balance = 0;
    await fs.writeJSON(filePath, data, { spaces: 2 });
  },

  daily: async function(userID) {
    let data = await fs.readJSON(filePath);
    if(!data[userID]) data[userID] = { balance: 10000, daily: 0 };
    const now = Date.now();
    if(now - data[userID].daily < 24 * 60 * 60 * 1000) return false; // 24h cooldown
    data[userID].balance += 1000; // daily reward
    data[userID].daily = now;
    await fs.writeJSON(filePath, data, { spaces: 2 });
    return true;
  }
}
