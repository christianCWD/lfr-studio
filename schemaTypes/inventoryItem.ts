import {defineType, defineField} from "sanity"

export default defineType({
  name: "inventoryItem",
  title: "Lager – Billetkategori",
  type: "document",
  fields: [
    defineField({ name: "matchSlug", title: "Match slug", type: "string", validation: r => r.required() }),
    defineField({ name: "ticketId",  title: "Ticket key", type: "string", validation: r => r.required() }),
    defineField({ name: "available", title: "Available",  type: "number", initialValue: 0, validation: r => r.min(0) }),
    defineField({ name: "onHold",    title: "On hold",    type: "number", initialValue: 0, validation: r => r.min(0) }),
    defineField({ name: "sold",      title: "Sold",       type: "number", initialValue: 0, validation: r => r.min(0) }),
    defineField({ name: "updatedAt", title: "Updated at", type: "datetime" }),
  ],
  preview: {
    select: { title: "matchSlug", subtitle: "ticketId" }
  }
})
