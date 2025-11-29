import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
}

function createPostFromFile(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || slug.replace(/-/g, ' '),
    date: data.date || '2020-01-01',
    excerpt: data.description || content.substring(0, 200) + '...',
    content,
    tags: data.tags || []
  }
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(createPostFromFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  try {
    return createPostFromFile(`${slug}.md`)
  } catch {
    return null
  }
}