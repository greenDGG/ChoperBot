const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType } = require("discord.js");
const itemsData = require("../../../data/items.json");
const shipsData = require("../../../data/ships.json");

const CATEGORIES = {
  food: { name: "Comidas", emoji: "🍽️" },
  fishing_rod: { name: "Cañas de Pescar", emoji: "🎣" },
  chest: { name: "Cofres", emoji: "📦" },
  fruit: { name: "Frutas del Diablo", emoji: "🍈" },
  ship: { name: "Barcos", emoji: "🚢" },
};

module.exports = {
  name: "shop",
  alias: ["tienda"],
  description: "Muestra los objetos disponibles en la tienda",
  async execute(client, messageOrInteraction) {
    const isSlash = messageOrInteraction.isChatInputCommand?.();
    const author = messageOrInteraction.author || messageOrInteraction.user;

    if (isSlash) {
      if (!messageOrInteraction.deferred) await messageOrInteraction.deferReply();
    }

    const shopItems = itemsData.filter(i => i.price).map(i => ({ ...i, _source: "items" }));
    const shipItems = shipsData.filter(s => s.id > 0).map(s => ({ ...s, _source: "ships", type: "ship" }));
    const allItems = [...shopItems, ...shipItems];

    const categories = Object.keys(CATEGORIES);
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("shop_category")
      .setPlaceholder("Selecciona una categoría")
      .addOptions(
        categories.map((key) => ({
          label: CATEGORIES[key].name,
          emoji: CATEGORIES[key].emoji,
          value: key,
        }))
      );

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const formatPrice = (p) => {
      if (!p) return "—";
      if (p >= 1000000) return `${(p / 1000000).toFixed(p % 1000000 === 0 ? 0 : 1)}M`;
      if (p >= 1000) return `${(p / 1000).toFixed(0)}K`;
      return `${p}`;
    };

    const allLines = allItems.map((item) => {
      const p = item.price || 0;
      return `${item.emoji || "📦"} **${item.name}** — <:berri:907114454108491806>${formatPrice(p)}`;
    });

    const embed = new EmbedBuilder()
      .setTitle("🏪 Tienda")
      .setDescription("Selecciona una categoría abajo para ver los productos.\n\n**Todos los productos:**\n" + allLines.join("\n"))
      .setColor("Green")
      .setFooter({ text: "Usa op!buy [item] para comprar" });

    if (isSlash) {
      const msg = await messageOrInteraction.editReply({ embeds: [embed], components: [row], fetchReply: true });
      const collector = msg.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        filter: (i) => i.user.id === author.id,
        time: 120000,
      });
      collector.on("collect", async (i) => {
        const cat = i.values[0];
        let catItems;
        if (cat === "ship") {
          catItems = shipsData.filter(s => s.id > 0).map(s => ({ ...s, _source: "ships", price: s.price }));
        } else {
          catItems = itemsData.filter(item => item.type === cat && item.price);
        }

        const formatPrice = (p) => {
          if (!p) return "—";
          if (p >= 1000000) return `${(p / 1000000).toFixed(p % 1000000 === 0 ? 0 : 1)}M`;
          if (p >= 1000) return `${(p / 1000).toFixed(0)}K`;
          return `${p}`;
        };

        const catEmbed = new EmbedBuilder()
          .setTitle(`${CATEGORIES[cat].emoji} ${CATEGORIES[cat].name}`)
          .setDescription(
            catItems.length > 0
              ? catItems
                  .map((item) => {
                    const p = item.price || 0;
                    return `${item.emoji || "📦"} **${item.name}** — <:berri:907114454108491806>${formatPrice(p)}\n${item.description || ""}`;
                  })
                  .join("\n\n")
              : "No hay productos en esta categoría."
          )
          .setColor("Green")
          .setFooter({ text: "Usa op!buy [item] para comprar" });
        await i.update({ embeds: [catEmbed] });
      });
    } else {
      messageOrInteraction.channel.send({ embeds: [embed] });
    }
  },
};
