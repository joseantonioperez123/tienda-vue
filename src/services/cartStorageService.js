const STORAGE_KEY = 'merino-cart'

export function saveCart(items) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items)
  )
}

export function loadCart() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function clearCartStorage() {
  localStorage.removeItem(STORAGE_KEY)
}