'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { SUBJECTS } from '@/lib/chapters'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    'chapter-4-2': true,
  })

  const toggleChapter = (id: string) => {
    setExpandedChapters((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const isActive = (path: string) => pathname?.includes(path)

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-[4px] z-[90] md:hidden transition-opacity ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`w-[260px] bg-sidebar-bg border-r border-border flex flex-col flex-shrink-0 overflow-hidden z-[100] transition-transform duration-300
          fixed top-0 left-0 bottom-0 md:relative md:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="px-[18px] pt-5 pb-4 border-b border-border">
          <div className="font-display text-[1.15rem] font-extrabold text-blue flex items-center gap-2">
            🚀 Darsi
          </div>
          <div className="text-[0.72rem] text-text-dim font-semibold mt-0.5 pl-7">
            Laith&apos;s Study World
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 sidebar-scrollbar">
          {SUBJECTS.map((subject) => (
            <div key={subject.id}>
              <div className="px-[18px] pt-2 pb-1 text-[0.68rem] font-extrabold uppercase tracking-[1px] text-text-dimmer">
                {subject.emoji} {subject.title}
              </div>

              {subject.chapters.length === 0 && (
                <div className="px-[18px] py-2 pl-11 text-[0.78rem] font-semibold text-text-dimmer italic">
                  Coming soon...
                </div>
              )}

              {subject.chapters.map((chapter) => {
                const isExpanded = expandedChapters[chapter.id] ?? false
                const chapterActive = pathname?.includes(`/${subject.id}/${chapter.slug}`)

                return (
                  <div key={chapter.id} className="mb-1">
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className={`flex items-center gap-[10px] px-[18px] py-[10px] w-full text-left transition-colors select-none
                        ${chapterActive ? 'bg-blue/[0.06]' : 'hover:bg-black/[0.03]'}
                        ${isExpanded ? '' : ''}`}
                    >
                      <div
                        className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-base flex-shrink-0"
                        style={{ background: chapter.color }}
                      >
                        {chapter.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[0.85rem] font-bold text-text leading-tight">
                          {chapter.title}
                        </div>
                      </div>
                      <span
                        className={`text-[0.65rem] text-text-dimmer transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      >
                        ▶
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-[max-height] duration-300 ${
                        isExpanded ? 'max-h-[200px]' : 'max-h-0'
                      }`}
                    >
                      {[
                        { label: 'Learn & Study Guide', section: 'learn' },
                        { label: 'Quiz Time', section: 'quiz' },
                        { label: 'Printable Worksheet', section: 'worksheet' },
                      ].map((item) => {
                        const href = `/darsi.app/${subject.id}/${chapter.slug}/${item.section}/`
                        const active = isActive(`/${chapter.slug}/${item.section}`)

                        return (
                          <Link
                            key={item.section}
                            href={href}
                            onClick={onClose}
                            className={`flex items-center gap-[10px] px-[18px] py-2 pl-11 text-[0.82rem] font-semibold transition-all border-l-[3px]
                              ${
                                active
                                  ? 'text-blue border-l-blue bg-blue-dim'
                                  : 'text-text-dim border-l-transparent hover:text-text hover:bg-black/[0.03]'
                              }`}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: 'currentColor' }}
                            />
                            {item.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-[18px] py-3 border-t border-border text-[0.75rem] text-text-dimmer font-semibold">
          Grade 3 · <span className="text-coral">Laith&apos;s World</span>
        </div>
      </aside>
    </>
  )
}
