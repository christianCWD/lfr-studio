import {defineType, defineField} from "sanity"

export default defineType({
  name: "pricingConfig",
  title: "Prisopsætning",
  type: "object",
  fields: [
    defineField({
      name: "ticketsSource",
      title: "Billetkilder",
      type: "string",
      options: { list: ["manual","api","hybrid"] },
      initialValue: "manual",
    }),
    defineField({
      name: "hotelsSource",
      title: "Hotelkilder",
      type: "string",
      options: { list: ["manual","api","hybrid"] },
      initialValue: "manual",
    }),
    defineField({
      name: "defaultMarkupPct",
      title: "Standard avance (%)",
      type: "number",
      description: "Bruges når der ikke er manuel pris. Fx 15 for 15%.",
      initialValue: 15,
    }),
    defineField({
      name: "minNights",
      title: "Min. nætter (for API-hoteller)",
      type: "number",
      initialValue: 2
    }),
    // Supplier mapping
    defineField({ name: "supplier", title: "Billet-leverandør", type: "string", initialValue: "DPA" }),
    defineField({ name: "supplierEventId", title: "Supplier Event ID", type: "string" }),
    defineField({ name: "hotelSupplierCityId", title: "Hotel supplier City ID", type: "string" }),
    // Manuelle lister
    defineField({ name: "manualTicketCategories", title: "Manuelle billetkategorier", type: "array", of: [{type: "ticketCategoryManual"}] }),
    defineField({ name: "manualHotels", title: "Manuelle hoteller", type: "array", of: [{type: "hotelManual"}] }),
  ],
})
