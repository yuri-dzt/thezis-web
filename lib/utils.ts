import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

/* =========================================================
 * Tailwind / CSS
 * ======================================================= */

/**
 * Combina classes CSS e resolve conflitos do Tailwind
 * @example cn('p-2', condition && 'bg-red-500')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* =========================================================
 * Strings
 * ======================================================= */

/**
 * Retorna as iniciais de um nome (máx. 2 letras)
 * @example getInitials('João Silva') // JS
 */
export function getInitials(name: string): string {
  if (!name) return ''

  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0].toUpperCase())
    .slice(0, 2)
    .join('')
}

/**
 * Coloca a primeira letra da string em maiúsculo
 * @example capitalize('teste') // Teste
 */
export function capitalize(text: string): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Encurta um texto e adiciona "..."
 * @example truncate('Texto muito grande', 10)
 */
export function truncate(text: string, length = 50): string {
  if (!text || text.length <= length) return text
  return `${text.slice(0, length)}...`
}

/**
 * Mascara um e-mail
 * @example maskEmail('joao@gmail.com') // jo***@gmail.com
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email

  const [user, domain] = email.split('@')

  if (user.length <= 2) {
    return `${user[0]}***@${domain}`
  }

  return `${user.slice(0, 2)}***@${domain}`
}

/**
 * Remove tudo que não for número
 * @example onlyNumbers('CPF: 123.456') // 123456
 */
export function onlyNumbers(value: string): string {
  return value.replace(/\D/g, '')
}

/**
 * Mascara CPF ou CNPJ automaticamente
 * @example maskDocument('12345678901') // 123.456.789-01
 */
export function maskDocument(value: string): string {
  const numbers = onlyNumbers(value)

  if (numbers.length <= 11) {
    return numbers
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
  }

  return numbers
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5')
}

/* =========================================================
 * Numbers
 * ======================================================= */

/**
 * Formata um número como moeda
 * @example formatCurrency(1000) // R$ 1.000,00
 */
export function formatCurrency(
  value: number,
  locale = 'pt-BR',
  currency = 'BRL'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

/**
 * Limita um número entre mínimo e máximo
 * @example clamp(10, 0, 5) // 5
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Formata número com separador de milhar
 * @example formatNumber(1000000) // 1.000.000
 */
export function formatNumber(
  value: number,
  locale = 'pt-BR'
): string {
  return new Intl.NumberFormat(locale).format(value)
}

/**
 * Calcula porcentagem
 * @example percent(25, 200) // 12.5
 */
export function percent(value: number, total: number): number {
  if (total === 0) return 0
  return (value / total) * 100
}

/* =========================================================
 * Dates
 * ======================================================= */

/**
 * Formata data para o padrão local
 * @example formatDate('2026-01-10') // 10/01/2026
 */
export function formatDate(
  date: Date | string,
  locale = 'pt-BR'
): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date

  return parsedDate.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/* =========================================================
 * Arrays
 * ======================================================= */

/**
 * Remove itens duplicados de um array
 * @example uniqueArray([1, 1, 2]) // [1, 2]
 */
export function uniqueArray<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

/* =========================================================
 * Guards / Utils
 * ======================================================= */

/**
 * Verifica se um valor está vazio
 * @example isEmpty([]) // true
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/* =========================================================
 * Browser / UX
 * ======================================================= */

/**
 * Copia um texto para a área de transferência
 * @example await copyToClipboard('Texto')
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Rola a página suavemente para o topo
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
