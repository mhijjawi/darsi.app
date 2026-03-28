import { SubjectMeta } from '@/types'

export const SUBJECTS: SubjectMeta[] = [
  {
    id: 'science',
    title: 'Science',
    emoji: '🔬',
    chapters: [
      {
        id: 'chapter-4-2',
        subject: 'science',
        slug: 'chapter-4-2',
        title: '4.2 Light & Matter',
        emoji: '💡',
        color: 'rgba(88,166,255,0.12)',
      },
      {
        id: 'chapter-4-3',
        subject: 'science',
        slug: 'chapter-4-3',
        title: '4.3 Sound',
        emoji: '🔊',
        color: 'rgba(8,145,178,0.12)',
      },
    ],
  },
  {
    id: 'math',
    title: 'Math',
    emoji: '🔢',
    chapters: [],
  },
  {
    id: 'arabic',
    title: 'Arabic',
    emoji: '📝',
    chapters: [],
  },
]

export function getChapter(subject: string, chapterSlug: string) {
  const subj = SUBJECTS.find((s) => s.id === subject)
  return subj?.chapters.find((c) => c.slug === chapterSlug)
}

export function getFirstChapterPath(): string {
  for (const subj of SUBJECTS) {
    if (subj.chapters.length > 0) {
      const ch = subj.chapters[0]
      return `/${subj.id}/${ch.slug}/learn`
    }
  }
  return '/'
}
