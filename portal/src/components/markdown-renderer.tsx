"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="prose prose-slate max-w-none prose-headings:font-[family-name:var(--font-space-grotesk)] prose-headings:font-bold prose-h1:text-3xl prose-h2:text-xl prose-h3:text-lg prose-p:font-light prose-td:font-light prose-th:font-bold">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
