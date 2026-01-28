module.exports.config = {
  name: "roast",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Hridoy Hossen",
  description: "Mention a user to give a funny roast",
  commandCategory: "Utility",
  usages: ".roast @user",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args, Users }) => {
  const { threadID, messageID, mentions } = event;

  // Check if someone is mentioned
  const mentionIDs = Object.keys(mentions);
  if (mentionIDs.length === 0) {
    return api.sendMessage(
      "😂 কাকে roast করবো? একজনকে mention কর ভাই!",
      threadID,
      messageID
    );
  }

  const targetID = mentionIDs[0];
  const targetName = mentions[targetID];

  // 🔥 50+ Funny Roast Lines
  const roasts = [
    "তোর ব্রেইন WiFi এর মতো—সবসময় connected দেখায়, কিন্তু কাজ করে না 🤡",
    "তুই এত স্লো, Googleও তোর জন্য loading দেখায় 🐢",
    "তোর আত্মবিশ্বাস iPhone charger এর মতো—সবসময় কম থাকে 🔋",
    "তুই প্রমাণ যে evolution মাঝে মাঝে break নেয় 🙃",
    "তোর কথা শুনে মনে হয় brain.exe কাজ করা বন্ধ করেছে 💀",
    "তুই NPC হলেও main character ভাবিস 🎮",
    "তোর আইডিয়া এত দুর্বল যে virusও ignore করে 😭",
    "তুই meme না, কিন্তু লোকজন তোকে দেখেই হাসে 🤣",
    "তোর presence মানেই group chat silent mode 🔕",
    "তুই এত confusing, calculatorও তোকে solve করতে পারে না 🧮",
    "তোর sense of style Windows 95 এর মতো—outdated ⌛",
    "তোর IQ নাপিতের তেল-গন্ধের মতো—কম, কিন্তু spread হয় 🥴",
    "তুই এত lazy যে gravity ও তোকে inspire করে না 🌍",
    "তোর memory RAM এর মতো—full, কিন্তু কাজ কিছু না 🖥️",
    "তুই social media filter ছাড়া scary 😱",
    "তোর jokes fridge এর মতো—cold, কিন্তু কেউ laugh করে না ❄️",
    "তুই so basic যে Python তুই skip করে দেয় 🐍",
    "তোর thought process buffering এর মতো 🕹️",
    "তুই elevator না, but ups and downs বেশি 😅",
    "তোর energy ghost এর মতো—কখনো দেখা যায় না 👻",
    "তুই clock এর battery শেষ হওয়া হবার মতো—slow ticking ⏰",
    "তোর plan Google Maps ছাড়া কখনো কাজ করে না 🗺️",
    "তুই sponge, কিন্তু knowledge absorb করতে পারিস না 🧽",
    "তোর patience snail এর মতো 🐌",
    "তুই pizza delivery এর মতো late 🍕",
    "তুই Photoshop ছাড়া normal 😬",
    "তোর confidence switch এর মতো—সবসময় off 🔌",
    "তুই ghost mode তে হলেও attention চায় 👻",
    "তোর logic broken WiFi এর মতো 📡",
    "তুই background app—exist but useless 📱",
    "তুই solar panel, কিন্তু সূর্য দেখলেই hide হয় ☀️",
    "তুই antivirus ছাড়া virus 😷",
    "তুই snake এর মতো slippery, কিন্তু dangerous না 🐍",
    "তুই calculator এর minus button—সবসময় negative ➖",
    "তুই headphone, কিন্তু সব শব্দ muffled 🎧",
    "তোর jokes outdated Internet Explorer এর মতো 🌐",
    "তুই coffee ছাড়া active হতে পারিস না ☕",
    "তুই battery saver mode এ সবসময় 🔋",
    "তোর presence lag করে, ghost এর মতো 👻",
    "তুই WiFi hotspot, but signal zero 📶",
    "তোর face CAPTCHA এর মতো—ভুল করি সবাই 🤖",
    "তুই alarm clock, কিন্তু nobody wakes up ⏰",
    "তুই Google translate এর মতো—misunderstood 🤷‍♂️",
    "তুই elevator music—সবার attention ধরে না 🎵",
    "তুই password hint—useful না, irritating 🤯",
    "তুই Zoom call এর frozen screen ❄️",
    "তুই background noise, কিন্তু annoying 🗣️",
    "তুই ice cream গলে যেও, heat এ 😅",
    "তুই remote control, but battery dead 🔋",
    "তুই Minecraft এর block—exist কিন্তু boring 🧱",
    "তুই autocorrect—সবসময় wrong 😬",
    "তুই spam mail—everyone ignore করে 📧",
    "তুই offline mode—social skills missing 🌐",
    "তুই TikTok trend—2 second এ outdated 📱",
    "তুই emoji pack—looks cute, but useless 😹",
    "তুই WiFi password ভুলে গেলে everyone সমস্যা পায় 🔑",
    "তুই mirror এর সামনে stand করলেও confuse হয় 🪞",
    "তুই alarm এর snooze button—delay all the time ⏰",
    "তুই flashlight, কিন্তু অন্ধকারে useless 🔦"
  ];

  // Random roast pick
  const roast = roasts[Math.floor(Math.random() * roasts.length)];

  // Send mention + roast
  return api.sendMessage(
    {
      body: `🔥 𝗥𝗢𝗔𝗦𝗧 𝗧𝗜𝗠𝗘 🔥\n\n@${targetName}\n${roast}`,
      mentions: [
        {
          tag: targetName,
          id: targetID
        }
      ]
    },
    threadID,
    messageID
  );
};