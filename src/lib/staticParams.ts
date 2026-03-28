import { SUBJECTS } from './chapters'

export function generateChapterStaticParams() {
  const params: { subject: string; chapter: string }[] = []
  for (const subj of SUBJECTS) {
    for (const ch of subj.chapters) {
      params.push({ subject: subj.id, chapter: ch.slug })
    }
  }
  return params
}
