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
      validation: (Rule) =>
        Rule.email()
          .required()
          .custom((email) => {
            const spamDomains = [
              'mailinator.com',
              'trashmail.com',
              'tempmail.com',
              '10minutemail.com',
              'yopmail.com',
              'fakeinbox.com',
              'dispostable.com',
              'getnada.com',
              'guerrillamail.com',
              'spamgourmet.com',
              'throwawaymail.com',
              'sharklasers.com',
              'mintemail.com',
              'emailtemporario.com.br',
              'anonymbox.com',
              'spambox.info',
              'jetable.org',
              'bouncemail.com',
              'maildrop.cc',
              'ezmail.com',
              'temp-mail.org',
            ]

            const emailDomain = email?.split('@')[1]

            if (!emailDomain) {
              return 'Invalid email format'
            }

            if (spamDomains.includes(emailDomain)) {
              return 'Emails from temporary or spam domains are not allowed'
            }

            return true
          }),
    }),
  ],
})
