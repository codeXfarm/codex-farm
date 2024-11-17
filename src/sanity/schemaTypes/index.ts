import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { posts } from './posts'
import { projects } from './projects'
import { workInquiry } from './workInquiry'
import { feedbacks } from './feedbacks'
import { subscriber } from './subscriber'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, posts, projects, workInquiry, feedbacks, subscriber],
}
