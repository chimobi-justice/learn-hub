export const stripTags = (content: any) => {
  return {
    __html: content || ''
  }
}