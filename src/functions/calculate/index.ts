import { mountChars, somatory, frequency, sumSteps, getPersonalYear } from './_helpers'

export function calculateName(rawName: string) {
  const chars = mountChars(rawName)
  const { vowels, consonants, fullName } = somatory(chars)
  const freq = frequency(chars)

  const calculated = {
    res: {
      vowels,
      consonants,
      fullName,
    },
    chars,
    frequency: freq,
  }
  return calculated
}

export function calculateBorn(rawBorn: string) {
  const bornInitial = rawBorn
    .replaceAll('-', '')
    .split('')
    .map((s) => +s)
    .reduce((acc, cur) => acc + cur, 0)

  return {
    res: sumSteps(bornInitial),
    personalYear: getPersonalYear(rawBorn),
  }
}
