import { defineField, defineType } from 'sanity'
import { BellIcon } from '@sanity/icons'

export const subscriber = defineType({
  name: 'subscriber',
  title: 'Subscriber',
  type: 'document',
  icon: BellIcon,
  readOnly: true,
  fields: [
    defineField({
      name: 'email',
      type: 'string',
      validation: (Rule) => Rule.email().required(),
    }),
  ],
})
