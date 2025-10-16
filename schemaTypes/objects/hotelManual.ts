import {defineType, defineField} from "sanity"

export default defineType({
  name: "hotelManual",
  title: "Hotel (manuel)",
  type: "object",
  fields: [
    defineField({ name: "key", title: "Nøgle (intern)", type: "string", validation: r => r.required() }),
    defineField({ name: "name", title: "Hotelnavn", type: "string", validation: r => r.required() }),
    defineField({ name: "distanceKm", title: "Afstand til stadion (km)", type: "number" }),
    defineField({ name: "nightsIncluded", title: "Antal nætter i pakken", type: "number", initialValue: 2 }),
    defineField({ name: "grossPerPerson", title: "Pris pr. person (DKK)", type: "number" }),
    defineField({ name: "netPerPerson", title: "Kostpris pr. person (DKK)", type: "number", hidden: true }),
    defineField({ name: "supplierHotelId", title: "Supplier hotel id (valgfri)", type: "string" }),
    defineField({ name: "image", title: "Billede", type: "image", options: {hotspot: true} }),
    defineField({ name: "badge", title: "Badge (fx 4★ / 4.3)", type: "string" }),
    defineField({ name: "included", title: "Tekst under kortet (fx Inkluderet i pakken)", type: "string" }),
  ],
})
