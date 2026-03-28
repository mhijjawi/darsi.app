'use client'

interface TopbarProps {
  breadcrumb: string
  stars: number
  onMenuToggle: () => void
}

export default function Topbar({ breadcrumb, stars, onMenuToggle }: TopbarProps) {
  return (
    <div className="flex items-center gap-3.5 px-6 py-3.5 border-b border-border bg-sidebar-bg flex-shrink-0">
      <button
        className="md:hidden bg-transparent border-none text-text-dim text-[1.3rem] cursor-pointer p-1"
        onClick={onMenuToggle}
      >
        ☰
      </button>
      <div
        className="text-[0.82rem] text-text-dim font-semibold [&_strong]:text-text"
        dangerouslySetInnerHTML={{ __html: breadcrumb }}
      />
      <div className="ml-auto flex items-center gap-2.5">
        <div className="bg-yellow-dim text-yellow border border-[rgba(240,208,96,0.3)] rounded-[20px] px-3.5 py-[5px] text-[0.82rem] font-extrabold">
          ⭐ {stars} Stars
        </div>
      </div>
    </div>
  )
}
