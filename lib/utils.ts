export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-IN').format(value)
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date))
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}

export function uniqueValues(values: string[]) {
  return Array.from(new Set(values))
}

export function truncate(value: string, length: number) {
  return value.length > length ? `${value.slice(0, length).trim()}…` : value
}

export function getInitials(value: string) {
  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function extractToc(markdown: string) {
  return markdown
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => ({
      id: slugify(line.replace(/^##\s+/, '')),
      title: line.replace(/^##\s+/, '')
    }))
}
