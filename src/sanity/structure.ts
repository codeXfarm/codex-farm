import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('posts').title('Posts'),
      S.documentTypeListItem('projects').title('Projects'),
      S.documentTypeListItem('workInquiry').title('Work Inquiries'),
      S.documentTypeListItem('feedbacks').title('Feedbacks'),
      S.documentTypeListItem('subscriber').title('Subscriber'),
    ])
