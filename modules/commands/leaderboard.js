const economy = require("./Economy.js");

module.exports.config = {
  name: "leaderboard",
  version: "2.1.0",
  hasPermssion: 0,
  credits: "Hridoy Hossen",
  description: "Show top richest users",
  commandCategory: "Economy",
  usages: ".leaderboard [number]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args, Users }) => {
  const { threadID, messageID } = event;

  const topCount = parseInt(args[0]) || 10;
  const allData = economy.getAllBalances();

  if (!allData || allData.length === 0) {
    return api.sendMessage(
      "📉 𝗡𝗼 𝗘𝗰𝗼𝗻𝗼𝗺𝘆 𝗗𝗮𝘁𝗮 𝗙𝗼𝘂𝗻𝗱!",
      threadID,
      messageID
    );
  }

  const sorted = allData
    .sort((a, b) => b.balance - a.balance)
    .slice(0, topCount);

  let msg =
`◥🏆 𝗘𝗖𝗢𝗡𝗢𝗠𝗬 𝗟𝗘𝗔𝗗𝗘𝗥𝗕𝗢𝗔𝗥𝗗 🏆◤
— 𝗧𝗼𝗽 ${topCount} 𝗥𝗶𝗰𝗵𝗲𝘀𝘁 𝗨𝘀𝗲𝗿𝘀 —

━━━━━━━━━━━━━━━━━━
`;

  let index = 1;

  for (const user of sorted) {
    let name;
    try {
      name = global.data.userName.get(user.userID) ||
             await Users.getNameUser(user.userID);
    } catch {
      name = "Unknown User";
    }

    const medal =
      index === 1 ? "🥇" :
      index === 2 ? "🥈" :
      index === 3 ? "🥉" : "🔹";

    msg +=
`${medal} #${index}
👤 Name : ${name}
💰 Balance : ${user.balance.toLocaleString()} Coins
🆔 UID : ${user.userID}

`;
    index++;
  }

  msg += "━━━━━━━━━━━━━━━━━━\n💡 Earn more to climb the ranks!";

  api.sendMessage(msg.trim(), threadID, messageID);
};