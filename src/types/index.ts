export interface ChapterData {
  id: string
  subject: string
  title: string
  emoji: string
  description: string
  objectives: string[]
  concepts: Concept[]
  flashcards: Flashcard[]
  comparison?: ComparisonData
  quiz: Question[]
  worksheet: WorksheetData
}

export interface Concept {
  id: string
  title: string
  subtitle: string
  emoji: string
  color: 'blue' | 'grey' | 'teal' | 'purple' | 'yellow' | 'coral'
  explanation: string
  demoType: 'seeDemo' | 'opaque' | 'transparent' | 'translucent' | 'shadow' | 'color' | 'sunSafety' | 'vibration' | 'soundWave' | 'volume' | 'pitch' | 'soundTravel' | 'none'
  examples: ExampleItem[]
  facts?: FactItem[]
  sunSafetyCards?: SunSafetyCard[]
  fruitCards?: FruitCard[]
  lightInteractions?: LightInteraction[]
}

export interface ExampleItem {
  emoji: string
  label: string
}

export interface FactItem {
  emoji: string
  label: string
  color: string
  description: string
}

export interface SunSafetyCard {
  emoji: string
  title: string
  description: string
}

export interface FruitCard {
  emoji: string
  name: string
  description: string
  tagLabel: string
  tagColor: string
  tagBg: string
}

export interface LightInteraction {
  emoji: string
  label: string
  color: string
  description: string
}

export interface Flashcard {
  emoji: string
  word: string
  color: string
  bgFront: string
  borderFront: string
  bgBack: string
  borderBack: string
  definition: string
  example: string
}

export interface ComparisonData {
  columns: {
    emoji: string
    title: string
    color: string
    bgColor: string
    descriptions: string[]
  }[]
}

export interface Question {
  q: string
  emoji: string
  opts: string[]
  ans: number
  fb: string
}

export interface WorksheetData {
  fillBlanks: FillBlank[]
  classify: ClassifyData
  trueOrFalse: TFQuestion[]
  shortAnswer: ShortAnswerQ[]
  wordBank: string[]
  answerKey: AnswerKey
}

export interface FillBlank {
  num: number
  before: string
  after: string
}

export interface ClassifyData {
  objects: string[]
  categories: {
    title: string
    borderColor: string
    titleColor: string
    count: number
  }[]
}

export interface TFQuestion {
  num: number
  statement: string
}

export interface ShortAnswerQ {
  num: number
  question: string
  points: number
  lines: number
}

export interface AnswerKey {
  fillBlanks: string[]
  classify: Record<string, string[]>
  trueOrFalse: boolean[]
  shortAnswer: string[]
}

export interface ChapterMeta {
  id: string
  subject: string
  slug: string
  title: string
  emoji: string
  color: string
}

export interface SubjectMeta {
  id: string
  title: string
  emoji: string
  chapters: ChapterMeta[]
}
