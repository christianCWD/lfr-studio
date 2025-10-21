import {defineType, defineField} from "sanity"

export default defineType({
  name: "inventoryHold",
  title: "Reservation (Hold)",
  type: "document",
  fields: [
    defineField({ name: "item",       title: "Inventory item", type: "reference", to: [{type: "inventoryItem"}], validation: r => r.required() }),
    defineField({ name: "matchSlug",  title: "Match slug",     type: "string",    validation: r => r.required() }),
    defineField({ name: "ticketId",   title: "Ticket key",     type: "string",    validation: r => r.required() }),
    defineField({ name: "qty",        title: "Qty",            type: "number",    validation: r => r.required().min(1) }),
    defineField({ name: "status",     title: "Status",         type: "string",    options:{list:["held","committed","released","expired"]}, initialValue:"held" }),
    defineField({ name: "createdAt",  title: "Created at",     type: "datetime" }),
    defineField({ name: "expiresAt",  title: "Expires at",     type: "datetime" }),
    defineField({ name: "orderId",    title: "Order ID (optional)", type: "string" }),
    defineField({ name: "customerEmail", title: "Customer email (optional)", type: "string" }),
  ],
})
