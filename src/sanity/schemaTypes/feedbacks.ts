import { defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons'

export const feedbacks = defineType({
  name: 'feedbacks',
  title: 'Feedbacks',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      readOnly: true,
    }),

    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      type: 'string',
      title: 'Message',
      readOnly: true,
    }),

    defineField({
      name: 'project',
      title: 'Project',
      description: 'The project this feedback is associated with',
      type: 'reference',
      to: [{ type: 'projects' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
