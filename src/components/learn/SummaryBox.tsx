'use client'

interface SummaryItem {
  emoji: string
  text: string
}

interface SummaryBoxProps {
  items: SummaryItem[]
}

export default function SummaryBox({ items }: SummaryBoxProps) {
  return (
    <div className="bg-[#DCFCE7] border border-green-500/25 rounded-2xl p-5">
      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[#16A34A] mb-3 flex items-center gap-2">
        <span>✅</span>
        Chapter Summary — Remember These!
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[--text] leading-relaxed">
            <span className="shrink-0">{item.emoji}</span>
            <span dangerouslySetInnerHTML={{ __html: item.text }} />
          </li>
        ))}
      </ul>
    </div>
  )
}
