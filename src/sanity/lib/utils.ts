import { client } from './client'
import { PROJECT_SLUGS_QUERY } from './queries'

export const fetchProjectSlugs = async (): Promise<string[]> => {
  const data = await client.fetch(PROJECT_SLUGS_QUERY)
  return data.map(
    (project: { currentSlug: string | null }) => project.currentSlug ?? '',
  )
}
