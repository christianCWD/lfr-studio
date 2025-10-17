import {defineType, defineField} from "sanity"

export default defineType({
  name: "pricingConfig",
  title: "Prisopsætning",
  type: "object",
  groups: [
    { name: "tickets", title: "Billetter" },
    { name: "hotels", title: "Hoteller" },
    { name: "advanced", title: "Avanceret" },
    { name: "deprecated", title: "Forældet", hidden: true },
  ],
  fields: [
    // ---------------------------
    // BILLETTER
    // ---------------------------
    defineField({
      name: "ticketsSource",
      title: "Billetkilder",
      type: "string",
      options: { list: ["manual","api","hybrid"] },
      initialValue: "manual",
      group: "tickets",
    }),
    defineField({
      name: "ticketsProvider",
      title: "Billet-leverandør (API)",
      type: "object",
      group: "tickets",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "type",
          title: "Type",
          type: "string",
          options: { list: [{title:"DPA", value:"DPA"}] },
          initialValue: "DPA",
        }),
        defineField({
          name: "env",
          title: "Environment",
          type: "string",
          options: { list: [{title:"Dev", value:"dev"}, {title:"Prod", value:"prod"}] },
          initialValue: "dev",
        }),
        defineField({
          name: "eventId",
          title: "Supplier Event ID",
          type: "string",
          description: "Event-id hos leverandøren (kræves for DPA).",
        }),
      ],
      hidden: ({parent}) => parent?.ticketsSource === "manual",
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const src = (ctx.parent as any)?.ticketsSource
          if (src === "api" || src === "hybrid") {
            if (!val?.eventId) return "Udfyld eventId for billetleverandøren"
          }
          return true
        }),
    }),
    defineField({
      name: "manualTicketCategories",
      title: "Manuelle billetkategorier",
      type: "array",
      of: [{ type: "ticketCategoryManual" }],
      group: "tickets",
      hidden: ({parent}) => parent?.ticketsSource === "api",
    }),

    // ---------------------------
    // HOTELLER
    // ---------------------------
    defineField({
      name: "hotelsSource",
      title: "Hotelkilder",
      type: "string",
      options: { list: ["manual","api","hybrid"] },
      initialValue: "manual",
      group: "hotels",
    }),

    // NYT: flere hotel-providers pr. pakke
    defineField({
      name: "hotelProviders",
      title: "Hotel-leverandører (API)",
      type: "array",
      group: "hotels",
      of: [
        {
          type: "object",
          name: "hotelProvider",
          title: "Leverandør",
          options: { collapsible: true, collapsed: false },
          fields: [
            defineField({
              name: "enabled",
              title: "Aktiv",
              type: "boolean",
              initialValue: true,
            }),
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: { list: [
                {title:"DPA", value:"DPA"},
                // Flere kan tilføjes senere (Travco, HotelBeds, eget feed, osv.)
              ]},
              initialValue: "DPA",
            }),
            defineField({
              name: "env",
              title: "Environment",
              type: "string",
              options: { list: [{title:"Dev", value:"dev"}, {title:"Prod", value:"prod"}] },
              initialValue: "dev",
            }),

            // --- FÆLLES FELTER (så langt muligt) ---
            defineField({
              name: "city",
              title: "By (tekst eller ID)",
              type: "string",
              description: "Bruges til søgning hos leverandøren (DPA: city=London).",
            }),
            defineField({
              name: "minStars",
              title: "Min. stjerner (filter)",
              type: "number",
              validation: r => r.min(0).max(5),
            }),

            // --- DPA-specifikt (rooms[roomId]=X) ---
            defineField({
              name: "dpaRoomId",
              title: "DPA room_id (til rooms[room_id]=X)",
              type: "number",
              description: "Fx 345 → vi sender rooms[345]=antal_værelser baseret på rejsende.",
              hidden: ({parent}) => parent?.type !== "DPA",
            }),
            defineField({
              name: "occupancyPerRoom",
              title: "Personer pr. værelse",
              type: "number",
              initialValue: 2,
              description: "Bruges til at beregne hvor mange rooms der skal forespørges (ceil(rejsende / occupancy)).",
              hidden: ({parent}) => parent?.type !== "DPA",
            }),
            defineField({
              name: "extraParams",
              title: "Ekstra query-parametre",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "key", title: "Key", type: "string" },
                    { name: "value", title: "Value", type: "string" },
                  ],
                },
              ],
              description: "Valgfri – sendes som &key=value. Bruges til leverandørspecifik tuning.",
            }),
            defineField({
              name: "note",
              title: "Note",
              type: "text",
              rows: 2,
              description: "Intern note, fx reference til opsætning eller kontrakter.",
            }),
          ],
          preview: {
            select: { type: "type", env: "env", city: "city", enabled: "enabled" },
            prepare: ({type, env, city, enabled}) => ({
              title: `${enabled ? "✅" : "⛔"} ${type || "Provider"} (${env || "env"})`,
              subtitle: city || "",
            }),
          },
        },
      ],
      hidden: ({parent}) => parent?.hotelsSource === "manual",
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const src = (ctx.parent as any)?.hotelsSource
          if (src === "api" || src === "hybrid") {
            if (!val || val.length === 0) return "Tilføj mindst én hotel-leverandør"
          }
          return true
        }),
    }),

    defineField({
      name: "manualHotels",
      title: "Manuelle hoteller",
      type: "array",
      of: [{ type: "hotelManual" }],
      group: "hotels",
      hidden: ({parent}) => parent?.hotelsSource === "api",
    }),

    // ---------------------------
    // AVANCERET / FÆLLES
    // ---------------------------
    defineField({
      name: "defaultMarkupPct",
      title: "Standard avance (%)",
      type: "number",
      description: "Bruges når der ikke er manuel pris. Fx 15 for 15%.",
      initialValue: 15,
      group: "advanced",
    }),
    defineField({
      name: "minNights",
      title: "Min. nætter (API-hoteller)",
      type: "number",
      initialValue: 2,
      group: "advanced",
    }),

    // ---------------------------
    // FORÆLDET (behold for bagudkompatibilitet)
    // ---------------------------
    defineField({
      name: "supplier",
      title: "Billet-leverandør (forældet)",
      type: "string",
      initialValue: "DPA",
      group: "deprecated",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "supplierEventId",
      title: "Supplier Event ID (forældet)",
      type: "string",
      group: "deprecated",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "hotelSupplierCityId",
      title: "Hotel supplier City ID (forældet)",
      type: "string",
      group: "deprecated",
      hidden: true,
      readOnly: true,
    }),
  ],
})
