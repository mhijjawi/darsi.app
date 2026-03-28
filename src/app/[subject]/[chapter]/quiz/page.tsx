import { generateChapterStaticParams } from '@/lib/staticParams'
import QuizContent from '@/components/quiz/QuizContent'

export function generateStaticParams() {
  return generateChapterStaticParams()
}

export default function QuizPage() {
  return <QuizContent />
}
