export const formatPassage = (p: Passage) =>
  `${p.book} ${p.chapter}:${
    p.startVerse === p.endVerse ? p.startVerse : `${p.startVerse}-${p.endVerse}`
  }`
