import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'match',
  title: 'Kamp (Event)',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: r => r.required()}),
    defineField({
      name: "packageFrom",
      title: "Ophold fra (dato)",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: r => r.required()
    }),
    defineField({
      name: "packageTo",
      title: "Ophold til (dato)",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: r => r.required().custom((to, ctx) => {
        const from = (ctx.parent as any)?.packageFrom
        if (!from || !to) return true
        return new Date(to) >= new Date(from) ? true : "Til-dato kan ikke være tidligere end Fra-dato"
      })
    }),

    // (Valgfrit) behold kampens kickoff hvis I får den senere
    defineField({
      name: "kickoff",
      title: "Kampens kickoff (valgfri)",
      type: "datetime",
      hidden: true, // sæt til false hvis I vil bruge den
    }),
    defineField({name: 'homeTeam', title: 'Hjemmehold', type: 'reference', to: [{type: 'team'}], validation: r => r.required()}),
    defineField({name: 'awayTeam', title: 'Udehold', type: 'reference', to: [{type: 'team'}], validation: r => r.required()}),
    defineField({name: 'stadium', title: 'Stadion', type: 'reference', to: [{type: 'stadium'}]}),
    defineField({name: 'hero', title: 'Hero-billede', type: 'image', options: {hotspot: true}}),
    defineField({name: 'excerpt', title: 'Kort intro', type: 'text'}),

    defineField({
      name: "fromPrice",
      title: "Fra-pris (DKK)",
      type: "number",
      description: "Pris pr. person (hele kroner). Vises som 'Fra DKK xxx /person'.",
      validation: r => r.min(0)
    }),

    defineField({
  name: "pricing",
  title: "Pris & kilder",
  type: "pricingConfig",
}),

    
    defineField({name: 'body', title: 'Tekst', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'supplier', title: 'Leverandør', type: 'string', initialValue: 'DPA'}),
    defineField({name: 'supplierEventId', title: 'Supplier Event ID', type: 'string', description: 'ID fra DPA', validation: r => r.required()}),
    defineField({name: 'seoTitle', title: 'SEO Titel', type: 'string'}),
    defineField({name: 'seoDescription', title: 'SEO Beskrivelse', type: 'text'}),
  ],
})
