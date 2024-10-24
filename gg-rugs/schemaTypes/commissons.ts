import {defineField, defineType} from 'sanity'

export const commissions = defineType({
  name: 'commissions',
  title: 'Commissions',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}]}),
    defineField({
      name: 'mediagallery',
      title: 'Media Gallery',
      type: 'array',
      of: [
        {type: 'image'}, // Allows image uploads
        {type: 'file'}, // Allows file uploads
      ],
      options: {
        layout: 'grid', // The grid layout is maintained
      },
    }),
    defineField({
      name: 'gridstructure',
      title: 'Grid Structure',
      type: 'array',
      of: [
        {
          type: 'number',
          title: 'Number of images in row',
          validation: (Rule) =>
            Rule.min(1).max(3).error('You can select between 1 and 3 images per row.'),
        },
      ],
      description:
        'Define the number of images per row. Example: 2, 3, 1 means first row has 2 images, second row has 3, and third row has 1 image.',
    }),
  ],
})
