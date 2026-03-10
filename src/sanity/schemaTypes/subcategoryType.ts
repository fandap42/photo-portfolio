import {StackCompactIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const subcategoryType = defineType({
  name: 'subcategory',
  title: 'Subcategory',
  type: 'document',
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      description: 'Visible only in Studio for organizing photos.',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'category',
      title: 'Parent category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      initialValue: 100,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Sort order (asc)',
      name: 'sortOrderAsc',
      by: [
        {field: 'sortOrder', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      categoryTitle: 'category.title',
    },
    prepare({title, categoryTitle}) {
      return {
        title,
        subtitle: categoryTitle || 'No parent category',
      }
    },
  },
})
