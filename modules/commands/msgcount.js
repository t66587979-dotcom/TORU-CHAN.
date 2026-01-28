const fs = require("fs");
const path = __dirname + "/cache/msgcount.json";

module.exports.config = {
  name: "msgcount",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hridoy Hossen",
  description: "Top message ranking",
  commandCategory: "Group",
  usages: ".msgcount [number]",
  cooldowns: 5
};

// 🔹 Message count listener
module.exports.handleEvent = async ({ event }) => {
  if (!event.senderID || event.type !== "message") return;

  let data = {};
  if (fs.existsSync(path)) {
    data = JSON.parse(fs.readFileSync(path));
  }

  if (!data[event.threadID]) data[event.threadID] = {};
  if (!data[event.threadID][event.senderID])
    data[event.threadID][event.senderID] = 0;

  data[event.threadID][event.senderID]++;

  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

// 🔹 Leaderboard command
module.exports.run = async ({ api, event, args, Users }) => {
  const { threadID, messageID } = event;
  const top = parseInt(args[0]) || 10;

  if (!fs.existsSync(path))
    return api.sendMessage("❌ No message data found!", threadID, messageID);

  const data = JSON.parse(fs.readFileSync(path));
  if (!data[threadID])
    return api.sendMessage("❌ This group has no data!", threadID, messageID);

  const sorted = Object.entries(data[threadID])
    .sort((a, b) => b[1] - a[1])
    .slice(0, top);

  let msg =
`📊 𝗧𝗢𝗣 ${top} 𝗠𝗘𝗦𝗦𝗔𝗚𝗘 𝗥𝗔𝗡𝗞𝗜𝗡𝗚
━━━━━━━━━━━━━━━━━━
`;

  let i = 1;
  for (const [uid, count] of sorted) {
    const name = await Users.getNameUser(uid);
    const medal = i === 1 ? "🥇" : i === 2 ? "🥈" : i === 3 ? "🥉" : "🔹";

    msg += `${medal} ${i}. ${name}\n💬 Messages: ${count}\n\n`;
    i++;
  }

  msg += "━━━━━━━━━━━━━━━━━━\n🔥 Keep chatting to rank up!";

  api.sendMessage(msg.trim(), threadID, messageID);
};