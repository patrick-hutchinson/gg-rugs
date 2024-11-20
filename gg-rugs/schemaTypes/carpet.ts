import {defineField, defineType} from 'sanity'

export const carpet = defineType({
  name: 'carpet',
  title: 'Carpet',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'coverimage', title: 'Cover Image', type: 'file'}),
    defineField({name: 'year', title: 'Year', type: 'number'}),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {name: 'price', title: 'Price', type: 'number'},
        {name: 'soldOut', title: 'Sold Out?', type: 'boolean'},
      ],
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      fields: [
        {name: 'width', title: 'Width', type: 'number'},
        {name: 'height', title: 'Height', type: 'number'},
      ],
    }),
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
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name', // Display the name field as the title
      media: 'coverimage', // Display the cover image as a preview thumbnail
    },
  },
})
