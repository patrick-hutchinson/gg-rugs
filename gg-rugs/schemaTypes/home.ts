import {defineField, defineType} from 'sanity'

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({
      name: 'gridstructure',
      title: 'Grid Structure',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Row of Carpets',
          fields: [
            {
              name: 'carpets',
              title: 'Carpets in Row',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'carpet'}],
                  options: {
                    filter: ({document}) => {
                      const selectedCarpets =
                        ((document?.gridstructure as any[]) || []).flatMap((row) =>
                          ((row?.carpets as any[]) || []).map((carpetRef) => carpetRef._ref),
                        ) || []
                      return {
                        filter: `!(_id in $selectedCarpets)`,
                        params: {selectedCarpets},
                      }
                    },
                  },
                },
              ],
              // Apply the validation to the `carpets` array field instead of the `object`
              validation: (Rule) =>
                Rule.min(1).max(5).error('You can select between 1 and 5 carpets per row.'),
              description: 'Select carpets to display in this row (1 to 5 carpets).',
            },
          ],
        },
      ],
      description:
        'Define the carpets to show in each row. Each row can have between 1 and 5 carpets.',
    }),
  ],
})
