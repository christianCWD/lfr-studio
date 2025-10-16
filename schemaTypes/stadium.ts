import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'stadium',
  title: 'Stadion',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Navn', type: 'string', validation: r => r.required()}),
    defineField({name: 'city', title: 'By', type: 'string'}),
    defineField({name: 'image', title: 'Billede', type: 'image', options: {hotspot: true}}),
    defineField({name: 'guide', title: 'Stadionguide', type: 'array', of: [{type: 'block'}]}),
  ],
})
