export function isValidPassage(
  p: Nullable<PassageVersion>
): p is PassageVersion {
  return !!(
    p.version === 2 &&
    p.book &&
    p.chapter &&
    p.startVerse &&
    p.endVerse &&
    p.lastAttempted &&
    p.lastScore !== null &&
    p.secondsSincePreviousAttempt !== null
  )
}

export function isValidPassageVersion(
  p: Nullable<PassageVersion>
): p is PassageVersion {
  return !!(p.book && p.chapter && p.startVerse && p.endVerse)
}
