import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { client } from '@/sanity/lib/client'
import { PROJECT_DETAILS_BY_SLUG, PROJECT_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import markdownit from 'markdown-it'
const md = markdownit()
import React from 'react'

import '../../../../styles/style.css';


const ProjectDetails = async ({
  params,
}: {
  params: { slug: string }
 
}) => {
  const slug = (await params).slug
  const data = await client.fetch(PROJECT_DETAILS_BY_SLUG(slug))
  if (!data || data.length === 0) return notFound()
  const caseStudy = data[0]

  const moreProjects = await client.fetch(PROJECT_QUERY)
  const projects = moreProjects.map((project) => ({
    href: `/work/${project.currentSlug}` as string,
    date: project._createdAt ?? '',
    description: project.projectShortDescription ?? '',
    title: project.projectSlogun ?? '',
  }))
  const content = md.render(caseStudy.description ?? '')

  return (
    <>
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <header>
          <PageIntro
            eyebrow="Case Study"
            title={caseStudy.projectSlogun}
            centered
          >
            <p>{caseStudy.projectShortDescription}</p>
          </PageIntro>

          <FadeIn>
            <div className="mt-24 border-t border-b border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
              <Container>
                <div className="mx-auto max-w-5xl">
                  <dl className="min-md:grid-cols-3 -mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-6">
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Client</dt>
                      <dd>{caseStudy.projectName}</dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Year</dt>
                      <dd>
                        <time dateTime={caseStudy._createdAt}>
                          {new Date(caseStudy._createdAt).getFullYear()}
                        </time>
                      </dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Service</dt>
                      <dd>{caseStudy.service}</dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Project Type</dt>
                      <dd>{caseStudy.projectType}</dd>
                    </div>
                    {caseStudy.projectType === 'openSource' && (
                      <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                        <dt className="font-semibold">Source Code</dt>
                        <dd>
                          <a
                            href={caseStudy.sourceCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:underline cursor-pointer"
                          >
                            View on GitHub
                          </a>
                        </dd>
                      </div>
                    )}

                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Demo</dt>
                      <dd>
                        <a href={caseStudy.liveLink}> View Demo</a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </Container>
            </div>

            {/* <div className="border-y border-neutral-200 bg-neutral-100">
              <div className="-my-px mx-auto max-w-[76rem] bg-neutral-200">
                <GrayscaleTransitionImage
                  {...caseStudy.image}
                  quality={90}
                  className="w-full"
                  sizes="(min-width: 1216px) 76rem, 100vw"
                  priority
                />
              </div>
            </div> */}
          </FadeIn>
        </header>
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            {/* TODO: Parse markdown to HTML from sanity*/}
            

            {content ? (
              <article
                className="prose lg:prose-xl mx-auto font-display"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <p>Blog post not found</p>
            )}
          </FadeIn>
        </Container>
      </article>

      {/* TODO: Add related projects using PageLinks Component */}
      {moreProjects.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More case studies"
          pages={projects}
        />
      )}

      <ContactSection />
    </>
  )
}

export default ProjectDetails
