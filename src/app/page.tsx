import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { formatDate, getWordCount, getReadTime } from '@/lib/utils'

const icons = {
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  tag: (
    <>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7" y2="7" />
    </>
  ),
  document: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </>
  )
}

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="space-y-8">
      {posts.map((post) => {
        const wordCount = getWordCount(post.content)
        const readTime = getReadTime(wordCount)

        return (
          <article key={post.slug} className="space-y-2">
            <header>
              <Link href={`/posts/${post.slug}`} className="block">
                <h2 className="text-black text-xl font-bold mb-0 leading-normal hover:text-red-500 transition-colors">
                  {post.title}
                </h2>
              </Link>
            </header>
            
            <section className="text-gray-600 leading-relaxed font-light">
              <p className="line-clamp-2">{post.excerpt}</p>
            </section>
            
            <footer className="flex items-center gap-1.5 text-sm text-gray-400 flex-wrap">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {icons.calendar}
                </svg>
                <time>{formatDate(post.date)}</time>
              </span>
              
              {post.tags && post.tags.length > 0 && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1 flex-wrap">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {icons.tag}
                    </svg>
                    <span className="flex gap-1 flex-wrap">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/tag/${tag}`}
                          className="text-inherit no-underline hover:text-red-500 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </span>
                  </span>
                </>
              )}
              
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {icons.document}
                </svg>
                <span>{wordCount} words</span>
              </span>
              
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {icons.clock}
                </svg>
                <span>{readTime} min</span>
              </span>
            </footer>
          </article>
        )
      })}
    </div>
  )
}
