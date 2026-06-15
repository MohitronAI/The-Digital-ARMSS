"use client"

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Clock3, Search, User } from 'lucide-react'
import { useMemo, useState } from 'react'
import { blogCategories, blogPosts } from '@/data/blogPosts'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { formatDate, paginate, truncate } from '@/lib/utils'

export function BlogExplorer() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(6)

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category
      const searchTerms = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase()
      const matchesSearch = searchTerms.includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [category, search])

  const visiblePosts = paginate(filteredPosts, 1, visibleCount)

  return (
    <Section eyebrow="Blog" title="Insights that help premium brands grow" subtitle="Search actionable ideas on strategy, SEO, design, and lifecycle marketing.">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-card sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-full bg-brand-sand px-4 py-3">
              <Search className="h-4 w-4 text-brand-gold" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search posts"
                className="w-full bg-transparent text-sm outline-none placeholder:text-brand-ink/45"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${category === item ? 'bg-brand-navy text-white' : 'bg-brand-sand text-brand-ink hover:bg-brand-gold/15'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visiblePosts.map((post) => (
              <Card key={post.slug} className="overflow-hidden">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover transition duration-700 hover:scale-105" sizes="(max-width: 1280px) 100vw, 33vw" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-brand-gold">
                      <span>{post.category}</span>
                      {post.featured ? <span>Featured</span> : null}
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-brand-navy">{truncate(post.title, 72)}</h3>
                    <p className="mt-3 text-sm leading-7 text-brand-ink/72">{post.excerpt}</p>
                    <div className="mt-5 flex flex-wrap gap-4 text-sm text-brand-ink/55">
                      <span className="inline-flex items-center gap-2"><User className="h-4 w-4 text-brand-gold" />{post.author}</span>
                      <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-brand-gold" />{formatDate(post.date)}</span>
                      <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-brand-gold" />{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {visiblePosts.length < filteredPosts.length ? (
            <div className="mt-10 flex justify-center">
              <Button variant="outline" onClick={() => setVisibleCount((count) => count + 3)}>
                Load More Posts
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}