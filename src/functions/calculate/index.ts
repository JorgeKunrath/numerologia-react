import { mountChars, somatory, frequency } from './_helpers'

export default function calculateName(rawName: string) {
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
