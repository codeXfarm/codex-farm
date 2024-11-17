import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageLinks } from '@/components/PageLinks'
import { formatDate } from '@/lib/formatDate'

import { client } from '@/sanity/lib/client'
import { POST_DETAILS_BY_SLUG, POSTS_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import React from 'react'

const BlogDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const posts = (await client.fetch(POSTS_QUERY)).slice(0, 2)

  const slug = (await params).slug
  const postArray = await client.fetch(POST_DETAILS_BY_SLUG(slug))
  if (!postArray || postArray.length === 0) return notFound()
  const post = postArray[0]

  const pagePosts = posts.map((post) => ({
    href: `/blog/${post.currentSlug}` as string,
    date: post._createdAt ?? '',
    description: post.shortDescription ?? '',
    title: post.title ?? '',
  }))

  return (
    <>
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <header className="mx-auto flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
              {post.title}
            </h1>
            <time
              dateTime={post._createdAt}
              className="order-first text-sm text-neutral-950"
            >
              {formatDate(post._createdAt)}
            </time>
            <p className="mt-6 text-sm font-semibold text-neutral-950">
              by {post.author.name}, {post.author.role}
            </p>
          </header>
        </FadeIn>

        <FadeIn>
          {/* TODO: Parse MDX from sanity */}

          {post.content}
        </FadeIn>
      </Container>
      {posts.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="From the blog"
          intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
          pages={pagePosts}
        />
      )}

      <ContactSection />
    </>
  )
}

export default BlogDetails
