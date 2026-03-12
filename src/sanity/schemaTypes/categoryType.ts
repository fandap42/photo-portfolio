import {TagIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'titleCs',
      title: 'Title (Czech)',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'title',
      title: 'Legacy title (optional)',
      type: 'string',
      description: 'Backward compatibility field. Use Title (Czech) and Title (English) for new content.',
      hidden: true,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titleEn',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower number is shown first in navigation drawer.',
      initialValue: 100,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'groups',
      title: 'Photo groups',
      type: 'array',
      description: 'Each group renders as one block on category page with spacing between blocks.',
      of: [
        defineArrayMember({
          name: 'group',
          title: 'Group',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Internal name',
              type: 'string',
              description: 'Only visible in Studio. Not shown on website.',
            }),
            defineField({
              name: 'sortOrder',
              title: 'Sort order',
              type: 'number',
              initialValue: 100,
              validation: (Rule) => Rule.required().integer().min(0),
            }),
            defineField({
              name: 'photos',
              title: 'Photos',
              type: 'array',
              description: 'You can upload multiple images at once into this group.',
              of: [
                defineArrayMember({
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alt text',
                      type: 'string',
                    }),
                  ],
                }),
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              photos: 'photos',
            },
            prepare({title, photos}) {
              const count = Array.isArray(photos) ? photos.length : 0
              return {
                title: title || 'Unnamed group',
                subtitle: `${count} photo${count === 1 ? '' : 's'}`,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      titleCs: 'titleCs',
      titleEn: 'titleEn',
      subtitle: 'slug.current',
    },
    prepare({titleCs, titleEn, subtitle}) {
      return {
        title: titleCs || titleEn,
        subtitle: `${subtitle ? `/${subtitle}` : 'Missing slug'}${titleEn ? ` • ${titleEn}` : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Sort order (asc)',
      name: 'sortOrderAsc',
      by: [
        {field: 'sortOrder', direction: 'asc'},
        {field: 'titleEn', direction: 'asc'},
      ],
    },
  ],
})
