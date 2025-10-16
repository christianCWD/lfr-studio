import {defineType, defineField} from "sanity"

export default defineType({
  name: "ticketCategoryManual",
  title: "Billetkategori (manuel)",
  type: "object",
  fields: [
    defineField({ name: "key", title: "Nøgle (intern)", type: "string", validation: r => r.required() }),
    defineField({ name: "label", title: "Visningsnavn", type: "string", validation: r => r.required() }),
    defineField({ name: "grossPerPerson", title: "Pris pr. person (DKK)", type: "number" }),
    defineField({ name: "netPerPerson", title: "Kostpris pr. person (DKK)", type: "number", hidden: true }),
    defineField({ name: "supplierCategoryCode", title: "Supplier category code (valgfri)", type: "string" }),
    defineField({ name: "isDefault", title: "Forvalgt", type: "boolean" }),
  ],
})
