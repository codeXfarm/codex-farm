import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),

    defineField({
      name: 'role',
      type: 'string',
    }),
    defineField({
      name: 'position',
      type: 'string',
    }),

    defineField({
      name: 'email',
      type: 'string',
    }),

    defineField({
      name: 'discord',
      description: 'Only discord username is required not profile link',
      type: 'string',
    }),
    defineField({
      name: 'github',
      description: 'Only github username is required not profile link',
      type: 'string',
    }),
    defineField({
      name: 'linkedin',
      description: 'Linkedin username is required not profile link',
      type: 'string',
    }),

    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
