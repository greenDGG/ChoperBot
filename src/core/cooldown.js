const Cooldown = require("../models/Cooldown");
const Profile = require("../models/Profile");
const Lottery = require("../models/Lottery");

const LOTTERY_HOUR = 16;
const LOTTERY_TICKET_ID = "1015";

async function checkLottery() {
  const now = new Date();
  const utc3 = new Date(now.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
  if (utc3.getHours() === LOTTERY_HOUR && utc3.getMinutes() === 0) {
    const ticket = await Lottery.findOne({ ticketId: LOTTERY_TICKET_ID });
    if (!ticket || ticket.claimed) return;
    const winner = await Profile.findOne({ id: ticket.winnerId });
    if (!winner) return;
    const prize = ticket.prize || 0;
    winner.bank.cash += prize;
    await winner.save();
    ticket.claimed = true;
    await ticket.save();
  }
}

async function cdFunc(client) {
  setInterval(checkLottery, 60000);
}

module.exports = { cdFunc, checkLottery };
