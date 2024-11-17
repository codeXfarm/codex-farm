import { defineQuery } from 'next-sanity'

export const POSTS_QUERY =
  defineQuery(`*[_type == "posts" && defined(slug.current)] | order(_cratedAt desc){
    _id,
    _createdAt,
    title,
    "currentSlug": slug.current,
    "image": image.asset->url ,
    shortDescription,
    content,
    author -> {
      name, role, "authorImage": image.asset->url, position
    }
}`)

export const POST_DETAILS_BY_SLUG = (slug: string) =>
  defineQuery(`*[_type == "posts" && slug.current == "${slug}"] | order(_cratedAt desc){
    _id,
    _createdAt,
    title,
    "currentSlug": slug.current,
    "image": image.asset->url ,
    shortDescription,
    content,
    author -> {
      name, role, "authorImage": image.asset->url, position
    }
}`)

export const PROJECT_QUERY =
  defineQuery(`*[_type == "projects" && defined(slug.current) ] | order(_cratedAt desc) {
projectName,
_createdAt,
   "currentSlug": slug.current,
  projectSlogun,
  projectShortDescription,
   "logo": projectLogo.asset->url,
  service,
    projectType,
    repositoryUrl,
    liveLink,
    "feedbacks": *[_type == "feedbacks" && references(^._id)]{
        name,
        email,
        message
      }
}`)

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "projects" && defined(slug.current)]{
      "currentSlug": slug.current
  }
`)

export const PROJECT_DETAILS_BY_SLUG = (slug: string) =>
  defineQuery(`*[_type == "projects" && slug.current == "${slug}" ] | order(_cratedAt desc) 
    {
    projectName,
    _createdAt,
    "currentSlug": slug.current,
    projectSlogun,
    projectShortDescription,
    "logo": projectLogo.asset->url,
    service,
    projectType,
    repositoryUrl,
    liveLink,
    description,
    "image": image.asset->url,
    "feedbacks": *[_type == "feedbacks" && references(^._id)]{
        name,
        email,
        message
      }
     }`)

export const AUTHOR_QUERY = defineQuery(`*[_type == "author"]{
  name,
    position,
    role,
    "userImage" : image.asset ->url,
    email,
    discord,
    github,
    linkedin
}`)

export const FEEDBACK_QUERY = defineQuery(`*[_type == "feedbacks"]{
  name,
  message
}`)
