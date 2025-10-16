import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Navn', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}, validation: r => r.required()}),
    defineField({name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}}),
  ],
})
