import { defineField, defineType } from 'sanity'
import { ProjectsIcon } from '@sanity/icons'

export const projects = defineType({
  name: 'projects',
  title: 'Projects',
  description: 'Our projects we have done so far',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'projectName',
      title: 'Project name',
      description: 'The title of the project',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'projectName',
      },
    }),

    defineField({
      name: 'projectTitle',
      title: 'Project title',
      description:
        'Title of the project. (e.g. "Overcome your fears, find your match - Phobia")',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(255),
    }),

    defineField({
      name: 'projectShortDescription',
      title: 'Project short description',
      description:
        'Short description of the project. (e.g. "Find love in the face of fear — Phobia is a dating app that matches users based on their mutual phobias so they can be scared together.")',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(256)
          .error(
            'The short description must be between 20 and 256 characters.',
          ),
    }),

    defineField({
      name: 'projectLogo',
      title: 'Project logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'service',
      title: 'Service type',
      description:
        'Type of service (e.g Ecommerce, CMS, LMS, Social, Mobile Application or other)',
      type: 'string',
      options: {
        list: [
          { title: 'CMS', value: 'CMS' },
          { title: 'Ecommerce', value: 'Ecommerce' },
          { title: 'LMS', value: 'LMS' },
          { title: 'Mobile Application', value: 'Mobile Application' },
          { title: 'UI/UX Design', value: 'UI/UX Design' },
          { title: 'Social', value: 'Social' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'projectType',
      title: 'Project type',
      description:
        "The type of project (e.g 'Open Source' or 'Client Project')",
      type: 'string',
      options: {
        list: [
          { title: 'Open Source', value: 'Open Source' },
          { title: 'Client Project', value: 'Client Project' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'repositoryUrl',
      title: 'Repository URL',
      description: 'The URL to the source repository for open source projects',
      type: 'url',
      hidden: ({ parent }) => parent.projectType !== 'Open Source',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),

    defineField({
      name: 'liveLink',
      title: 'Project live link',
      type: 'url',
      validation: (Rule) => Rule.required(),
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
      name: 'description',
      title: 'Description',
      type: 'markdown',
    }),
  ],
})
