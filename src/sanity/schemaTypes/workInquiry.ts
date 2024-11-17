import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const workInquiry = defineType({
  name: 'workInquiry',
  title: 'Work Inquiry',
  readOnly: true,
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),

    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company',
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Phone',
    }),
    defineField({
      name: 'message',
      type: 'string',
      title: 'Message',
    }),
    defineField({
      name: 'budget',
      type: 'string',
      title: 'Budget',
      description:
        "Muliples of $100 and you will get minimum value of client's budget",
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
