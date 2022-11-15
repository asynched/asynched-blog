export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(typeof date === 'string' ? new Date(date) : date)
}
