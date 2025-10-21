// schemaTypes/ticketCategoryManual.ts
import {defineType, defineField} from "sanity"

export default defineType({
  name: "ticketCategoryManual",
  title: "Billetkategori (manuel)",
  type: "object",
  fields: [
    defineField({ name: "key", title: "Nøgle (unik)", type: "string", validation: r => r.required() }),
    defineField({ name: "label", title: "Visningsnavn", type: "string", validation: r => r.required() }),
    defineField({ name: "grossPerPerson", title: "Brutto / person (DKK)", type: "number" }),
    defineField({ name: "netPerPerson", title: "Netto / person (DKK)", type: "number" }),
    defineField({ name: "supplierCategoryCode", title: "Supplier kategori-kode", type: "string" }),
    defineField({ name: "isDefault", title: "Standardvalg", type: "boolean" }),

    // NYT: lager
    defineField({
      name: "stockAvailable",
      title: "Lager (tilgængelige billetter)",
      type: "number",
      description: "Aktuelt antal billetter på hylden for denne kategori",
      initialValue: 0,
      validation: r => r.min(0)
    }),
    defineField({
      name: "stockWarnAt",
      title: "Advar ved (få tilbage)",
      type: "number",
      description: "Vis badge 'Få tilbage' når tilgængeligt antal er <= dette tal",
      initialValue: 5,
      validation: r => r.min(0)
    }),
  ],
})
