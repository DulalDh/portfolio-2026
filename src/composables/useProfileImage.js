export const fallbackProfileSrc = `${import.meta.env.BASE_URL}profile.png`

export function handleProfileImageError(event) {
  const image = event.currentTarget
  if (image.src === new URL(fallbackProfileSrc, document.baseURI).href) return
  image.src = fallbackProfileSrc
}
