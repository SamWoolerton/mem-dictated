export function isPassage(p: Nullable<Passage>): p is Passage {
  return !!(p.book && p.chapter && p.startVerse && p.endVerse)
}
