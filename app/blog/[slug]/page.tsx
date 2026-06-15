import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CalendarDays, Clock3, User } from 'lucide-react'
import { blogPosts } from '@/data/blogPosts'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Hero } from '@/components/Hero'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { extractToc, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface BlogPageProps {
  params: { slug: string }
}

export const dynamic = 'force-dynamic'

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug)
  if (!post) return { title: 'Post not found' }
  return {
    title: post.title,
    description: post.excerpt
  }
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug)
  if (!post) notFound()

  const toc = extractToc(post.markdown)
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3)

  return (
    <>
      <Hero
        mode="page"
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
        primaryCta={{ label: 'Book a Consultation', href: '/contact' }}
        secondaryCta={{ label: 'More Articles', href: '/blog', variant: 'outline' }}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Card className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">Article Info</p>
                <div className="mt-4 space-y-3 text-sm text-brand-ink/70">
                  <div className="flex items-center gap-2"><User className="h-4 w-4 text-brand-gold" />{post.author}</div>
                  <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-brand-gold" />{formatDate(post.date)}</div>
                  <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-brand-gold" />{post.readTime}</div>
                </div>
              </Card>

              <Card className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-gold">Table of Contents</p>
                <ul className="mt-4 space-y-3 text-sm text-brand-ink/70">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="hover:text-brand-gold">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            </aside>

            <article className="mx-auto w-full max-w-4xl">
              <Card className="overflow-hidden p-0 shadow-soft">
                <div className="relative aspect-[16/8]">
                  <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
                </div>
                <div className="p-7 sm:p-10">
                  <MarkdownRenderer markdown={post.markdown} />
                </div>
              </Card>

              <Card className="mt-8 p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/15 text-2xl font-bold text-brand-gold">{post.author[0]}</div>
                  <div>
                    <p className="text-lg font-bold text-brand-navy">{post.author}</p>
                    <p className="text-sm text-brand-ink/70">Digital marketing strategist and contributor at The Digital ARMSS.</p>
                  </div>
                </div>
              </Card>

              {relatedPosts.length > 0 ? (
                <div className="mt-10">
                  <h2 className="font-display text-3xl font-bold text-brand-navy">Related Posts</h2>
                  <div className="mt-6 grid gap-6 md:grid-cols-3">
                    {relatedPosts.map((related) => (
                      <Card key={related.slug} className="overflow-hidden">
                        <a href={`/blog/${related.slug}`}>
                          <div className="relative aspect-[4/3]">
                            <Image src={related.image} alt={related.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                          </div>
                          <div className="p-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-gold">{related.category}</p>
                            <h3 className="mt-3 text-lg font-bold text-brand-navy">{related.title}</h3>
                          </div>
                        </a>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : null}

              <Card className="mt-10 bg-brand-navy p-8 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Newsletter</p>
                <h3 className="mt-4 font-display text-3xl font-bold">Want more insights like this?</h3>
                <p className="mt-3 max-w-2xl text-white/74">Subscribe for practical marketing ideas and occasional strategic notes from our team.</p>
                <div className="mt-6">
                  <Button href="/contact">Discuss Your Project</Button>
                </div>
              </Card>
            </article>
          </div>
        </Container>
      </section>
    </>
  )
}