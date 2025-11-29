import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts } from '@/lib/posts'
import { formatDate, getWordCount, getReadTime } from '@/lib/utils'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export function generateStaticParams() {
  const tags = new Set<string>()

  getAllPosts().forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params
  return {
    title: `#${tag} - Ayush Sood`,
    description: `Posts tagged with ${tag}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const posts = getAllPosts().filter((post) => post.tags?.includes(tag))

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold text-black">Posts tagged #{tag}</h1>
      </header>

      {posts.map((post) => {
        const wordCount = getWordCount(post.content)
        const readTime = getReadTime(wordCount)

        return (
          <article key={post.slug} className="space-y-2">
            <Link href={`/posts/${post.slug}`} className="block">
              <h2 className="text-xl font-semibold text-black mb-1 hover:text-red-500 transition-colors">
                {post.title}
              </h2>
            </Link>

            <p className="text-gray-600 leading-relaxed mb-1 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span>{formatDate(post.date)}</span>
              <span className="text-gray-300">•</span>
              <span>{wordCount} words</span>
              <span className="text-gray-300">•</span>
              <span>{readTime} min</span>
              {post.tags?.length ? (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1 flex-wrap">
                    {post.tags.map((t) => (
                      <Link
                        key={t}
                        href={`/tag/${t}`}
                        className="text-inherit no-underline hover:text-red-500 transition-colors"
                      >
                        #{t}
                      </Link>
                    ))}
                  </span>
                </>
              ) : null}
            </div>
          </article>
        )
      })}
    </div>
  )
}
