import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { formatDate, getWordCount, getReadTime } from '@/lib/utils'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

const metaIcons = {
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

async function processMarkdown(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)
  return processedContent.toString()
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) return {}

  return {
    title: `${post.title} - Ayush Sood`,
    description: post.excerpt,
  }
}

export default async function Post({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const contentHtml = await processMarkdown(post.content)
  
  const wordCount = getWordCount(post.content)
  const readTime = getReadTime(wordCount)

  return (
    <article className="max-w-none">
      <header className="mb-8">
        <h1 className="text-xl font-bold mb-3 leading-normal">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {metaIcons.calendar}
            </svg>
            <time>{formatDate(post.date)}</time>
          </span>
          
          {post.tags && post.tags.length > 0 && (
            <>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1 flex-wrap">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {metaIcons.tag}
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
              {metaIcons.document}
            </svg>
            <span>{wordCount} words</span>
          </span>
          
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {metaIcons.clock}
            </svg>
            <span>{readTime} min</span>
          </span>
        </div>
      </header>
      
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  )
}
