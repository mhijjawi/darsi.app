import { generateChapterStaticParams } from '@/lib/staticParams'
import LearnContent from '@/components/learn/LearnContent'

export function generateStaticParams() {
  return generateChapterStaticParams()
}

export default function LearnPage() {
  return <LearnContent />
}
