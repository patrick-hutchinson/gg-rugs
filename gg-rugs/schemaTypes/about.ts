import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'biography', title: 'Biography', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'emoji', title: 'Emoji', type: 'string'}),
  ],
})
