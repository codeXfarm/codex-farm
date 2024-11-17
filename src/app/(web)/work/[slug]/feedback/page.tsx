import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { FeedbackForm } from '@/components/FeedbackForm'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { fetchProjectSlugs } from '@/sanity/lib/utils'
import { notFound } from 'next/navigation'

function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Thanks for Shaping Our Journey Together!
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        Your feedback is invaluable to us. Thank you for helping shape our
        journey toward delivering even better experiences! We are always open to
        new ideas and look forward to hearing from you.
      </p>

      {/* <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Email us
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['Human Resources', 'hr@codex-farm.com'],
            ['Project Coordination', 'pc@codex-farm.com'],
          ].map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border> */}

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Follow us
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}

type FeedbackPageProps = {
  params: { slug?: string }
}

const FeedbackPage = async ({ params }: FeedbackPageProps) => {
  const slug = params.slug

  if (!slug) {
    console.error('Slug is undefined, rendering 404.')
    notFound()
  }

  const validSlugs = await fetchProjectSlugs()

  if (!validSlugs.includes(slug)) {
    console.error(`Project ${slug} not found. Returning 404.`)
    notFound()
  }

  return (
    <section>
      <PageIntro
        eyebrow="Feedback"
        title="Let’s share your feedback or any suggestions "
      >
        <p>
          Share your feedback or any suggestions you have for the project{' '}
          <span className="relative font-bold uppercase">{slug}</span>. This
          will help us to improve the project and make it better for everyone.
        </p>
      </PageIntro>
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactDetails />
          <FeedbackForm />
        </div>
      </Container>
    </section>
  )
}

export default FeedbackPage
