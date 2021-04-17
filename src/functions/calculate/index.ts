import { normalize, defineChars, applyValues, somatory, frequency } from './_helpers'

export default function calculateName(rawName: string) {
  const name = normalize(rawName)
  const nameObj = defineChars(name)
  const nameWithValues = applyValues(nameObj)

  const { vowelsRes, consonantsRes, fullNameRes } = somatory(nameWithValues)
  const freq = frequency(nameWithValues)

  const calculated = {
    res: {
      vowels: vowelsRes,
      consonants: consonantsRes,
      full: fullNameRes,
    },
    chars: nameObj,
    frequency: freq,
  }
  return calculated
}
