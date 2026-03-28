'use client'

import WorksheetView from './WorksheetView'
import chapter42 from '@/data/science/chapter-4-2'

export default function WorksheetContent() {
  return (
    <div className="animate-fadeUp">
      <WorksheetView
        worksheet={chapter42.worksheet}
        chapterTitle="Chapter 4.2 — Light and Matter"
      />
    </div>
  )
}
