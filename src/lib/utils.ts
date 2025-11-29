export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getWordCount(content: string): number {
  return content.trim().split(/\s+/).length
}

export function getReadTime(wordCount: number): number {
  return Math.ceil(wordCount / 200)
}