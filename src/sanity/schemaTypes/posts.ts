import { defineField, defineType } from 'sanity'
import { ComposeIcon } from '@sanity/icons'

export const posts = defineType({
  name: 'posts',
  title: 'Posts',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Post title',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),

    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),

    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(160)
          .error(
            'The short description must be between 20 and 160 characters.',
          ),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'markdown',
    }),
  ],
})
