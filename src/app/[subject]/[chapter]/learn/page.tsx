import { generateChapterStaticParams } from '@/lib/staticParams'
import LearnContent from '@/components/learn/LearnContent'
import LearnContent43 from '@/components/learn/LearnContent43'

export function generateStaticParams() {
  return generateChapterStaticParams()
}

export default function LearnPage({ params }: { params: { chapter: string } }) {
  if (params.chapter === 'chapter-4-3') {
    return <LearnContent43 />
  }
  return <LearnContent />
}
