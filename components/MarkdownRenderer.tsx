import type { ReactNode } from 'react'
import { slugify } from '@/lib/utils'

interface MarkdownRendererProps {
  markdown: string
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const lines = markdown.trim().split(/\r?\n/)
  const output: ReactNode[] = []
  let paragraph: string[] = []
  let listItems: string[] = []

  const flushParagraph = (key: number) => {
    if (paragraph.length === 0) return
    output.push(
      <p key={`p-${key}`} className="mt-5 text-base leading-8 text-brand-ink/76 first:mt-0 sm:text-lg">
        {paragraph.join(' ')}
      </p>
    )
    paragraph = []
  }

  const flushList = (key: number) => {
    if (listItems.length === 0) return
    output.push(
      <ul key={`ul-${key}`} className="mt-5 space-y-3 text-base leading-8 text-brand-ink/76">
        {listItems.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
    listItems = []
  }

  lines.forEach((line, index) => {
    if (!line.trim()) {
      flushParagraph(index)
      flushList(index)
      return
    }

    if (line.startsWith('# ')) {
      flushParagraph(index)
      flushList(index)
      output.push(
        <h1 key={`h1-${index}`} className="mt-2 font-display text-4xl font-bold text-brand-navy sm:text-5xl">
          {line.replace(/^#\s+/, '')}
        </h1>
      )
      return
    }

    if (line.startsWith('## ')) {
      flushParagraph(index)
      flushList(index)
      const title = line.replace(/^##\s+/, '')
      output.push(
        <h2 key={`h2-${index}`} id={slugify(title)} className="mt-12 font-display text-2xl font-bold text-brand-navy sm:text-3xl">
          {title}
        </h2>
      )
      return
    }

    if (line.startsWith('### ')) {
      flushParagraph(index)
      flushList(index)
      output.push(
        <h3 key={`h3-${index}`} className="mt-8 text-xl font-bold text-brand-navy">
          {line.replace(/^###\s+/, '')}
        </h3>
      )
      return
    }

    if (line.startsWith('- ')) {
      flushParagraph(index)
      listItems.push(line.replace(/^-\s+/, ''))
      return
    }

    flushList(index)
    paragraph.push(line)
  })

  flushParagraph(lines.length)
  flushList(lines.length)

  return <div>{output}</div>
}