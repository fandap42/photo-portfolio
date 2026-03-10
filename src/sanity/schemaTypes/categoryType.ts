import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

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
})
