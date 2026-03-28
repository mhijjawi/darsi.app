import { generateChapterStaticParams } from '@/lib/staticParams'
import WorksheetContent from '@/components/worksheet/WorksheetContent'

export function generateStaticParams() {
  return generateChapterStaticParams()
}

export default function WorksheetPage({ params }: { params: { chapter: string } }) {
  return <WorksheetContent chapterSlug={params.chapter} />
}
