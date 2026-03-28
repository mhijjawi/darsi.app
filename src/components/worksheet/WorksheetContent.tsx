'use client'

import WorksheetView from './WorksheetView'
import chapter42 from '@/data/science/chapter-4-2'
import chapter43 from '@/data/science/chapter-4-3'

const CHAPTERS: Record<string, typeof chapter42> = {
  'chapter-4-2': chapter42,
  'chapter-4-3': chapter43,
}

export default function WorksheetContent({ chapterSlug }: { chapterSlug: string }) {
  const data = CHAPTERS[chapterSlug] ?? chapter42

  return (
    <div className="animate-fadeUp">
      <WorksheetView
        worksheet={data.worksheet}
        chapterTitle={`${data.title.replace(/^\d+\.\d+\s/, 'Chapter ' + data.title.match(/^\d+\.\d+/)?.[0] + ' — ')}`}
      />
    </div>
  )
}
