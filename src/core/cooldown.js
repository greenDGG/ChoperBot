const Lottery = require("../models/Lottery");
const Profile = require("../models/Profile");
const Inventory = require("../models/Inventory");

const LOTTERY_HOUR = 16;
const LOTTERY_TICKET_ID = 1015;

async function checkLottery() {
  const now = new Date();
  const utc3 = new Date(now.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
  if (utc3.getHours() !== LOTTERY_HOUR || utc3.getMinutes() !== 0) return;

  const lottery = await Lottery.findOne({});
  if (!lottery) return;

  const today = utc3.toISOString().slice(0, 10);
  if (lottery.lastDrawDate === today || lottery.participants.length === 0) return;

  const winnerId = lottery.participants[Math.floor(Math.random() * lottery.participants.length)];
  const prize = lottery.pot;

  const winner = await Profile.findOne({ id: winnerId });
  if (winner) {
    winner.bank.cash += prize;
    await winner.save();
  }
  for (const participantId of lottery.participants) {
    await removeAllTickets(participantId);
  }

  lottery.lastWinners.unshift({ id: winnerId, amount: prize });
  if (lottery.lastWinners.length > 10) lottery.lastWinners.pop();
  lottery.pot = 0;
  lottery.participants = [];
  lottery.lastDrawDate = today;
  await lottery.save();
}

async function cdFunc(client) {
  checkLottery();
  setInterval(checkLottery, 60000);
}

async function removeAllTickets(userId) {
  const inventory = await Inventory.findOne({ id: userId });
  if (!inventory) return;

  const tickets = inventory.items.get(String(LOTTERY_TICKET_ID));
  if (!tickets) return;

  inventory.items.delete(String(LOTTERY_TICKET_ID));
  await inventory.save();
}
module.exports = { cdFunc };
