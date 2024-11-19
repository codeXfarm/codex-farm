import { type Metadata } from 'next'
import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { client } from '@/sanity/lib/client'
import {
  AUTHOR_QUERY,
  FEEDBACK_QUERY,
  POSTS_QUERY,
  PROJECT_QUERY,
} from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa'

export const revalidate = 1

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Our culture"
        title="Balance your passion with your passion for life."
        invert
      >
        <p>
          We are a group of like-minded people who share the same core values.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Loyalty" invert>
            Our team has been with us since the beginning because none of them
            are allowed to have LinkedIn profiles.
          </GridListItem>
          <GridListItem title="Trust" invert>
            We don’t care when our team works just as long as they are working
            every waking second.
          </GridListItem>
          <GridListItem title="Compassion" invert>
            You never know what someone is going through at home and we make
            sure to never find out.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

async function Team() {
  const members = await client.fetch(AUTHOR_QUERY)

  if (!members) {
    return null
  }

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        <FadeInStagger>
          <Border as={FadeIn} />
          <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
            <FadeIn>
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                Meet our team
              </h2>
            </FadeIn>
            <div className="lg:col-span-3">
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
              >
                {members.map((person) => (
                  <li key={person.name}>
                    <FadeIn>
                      <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                        {person?.userImage && (
                          <Image
                            alt="team member"
                            width={200}
                            height={384}
                            src={urlFor(person.userImage).url()}
                            className="h-96 w-full object-cover transition duration-500 motion-safe:group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                          <div className="flex gap-x-1">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name},
                            </p>
                            <p className="!text-[10px] font-medium text-white">
                              {person.position}
                            </p>
                          </div>
                          <p className="mt-2 text-sm text-white">
                            {person.role}
                          </p>
                          <div className="flex gap-x-1.5">
                            <a
                              href={`https://linkedin.com/in/${person.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaLinkedin className="text-white" />
                            </a>
                            <a
                              href={`https://github.com/${person.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaGithub className="text-white" />
                            </a>
                            <a
                              href={`https:/discordapp.com/users/${person.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaDiscord className="text-gray-200" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeInStagger>
      </div>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

export default async function About() {
  const posts = (await client.fetch(POSTS_QUERY)).slice(0, 2)
  const members = await client.fetch(AUTHOR_QUERY)
  const project = await client.fetch(PROJECT_QUERY)

  const review = await client.fetch(FEEDBACK_QUERY)

  const pagePosts = posts.map((post) => ({
    href: `/blog/${post.currentSlug}` as string,
    date: post._createdAt ?? '',
    description: post.shortDescription ?? '',
    title: post.title ?? '',
  }))

  return (
    <>
      <PageIntro eyebrow="About us" title="Our strength is collaboration">
        <p>
          We believe that our strength lies in our collaborative approach, which
          puts our clients at the center of everything we do.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
          <span className='font-bold'>CodexFarm</span> was born out of a simple idea. We providing high-quality web development and design services without the high price tag. We believe in doing things differently. Our goal is to offer exceptional results at a price point that makes sense for both startups and established companies.
          </p>
          <p>
          Our team is driven by creativity, innovation, and a dedication to crafting tailored solutions that meet the unique needs of each client. From beautiful websites to powerful applications, we make sure that every project is built with precision, care, and a touch of originality.
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem
            value={members.length + '+'}
            label="Underpaid employees"
          />
          <StatListItem value={project.length} label="Placated clients" />
          <StatListItem value={review.length + '+'} label="Reviews" />
        </StatList>
      </Container>

      <Culture />

      <Team />

      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
        pages={pagePosts}
      />

      <ContactSection />
    </>
  )
}
