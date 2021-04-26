interface Char {
  char: string
  isVowel: boolean
  value?: number
}

// prettier-ignore
const ConversionTable = new Map([
  ['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5], ['f', 6], ['g', 7], ['h', 8], ['i', 9], 
  ['j', 1], ['k', 2], ['l', 3], ['m', 4], ['n', 5], ['o', 6], ['p', 7], ['q', 8], ['r', 9], 
  ['s', 1], ['t', 2], ['u', 3], ['v', 4], ['w', 5], ['x', 6], ['y', 7], ['z', 8], [' ', 0],
])

function normalize(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z ]/g, '')
}

export function mountChars(rawName: string) {
  const name = normalize(rawName)
  // console.log({ name })

  // TODO
  // function handleException(c: string, i: number, nameArr: string[]) {
  //   // ask the fucking user
  //   // 😒 🔫
  //   return false
  // }

  const fullName: Char[] = name.split('').map((c: string, i, name) => ({
    char: c,
    isVowel: 'aeiou'.includes(c), // || handleException(c, i, name),
    value: ConversionTable.get(c),
  }))

  return fullName
}

export function somatory(nameObjNum: Char[]) {
  function _sum(acc: number, num: number) {
    return acc + num
  }
  function _somatory(initial: number) {
    let step = initial
    let arr = [step]
    while (step > 9) {
      let stepArray = step.toString().split('').map(Number)
      step = stepArray.reduce(_sum)
      arr.push(step)
    }
    return arr
  }

  const initialValues = nameObjNum.reduce(
    (acc, char: Char) => {
      // console.log(char)
      if (!char?.value) return acc
      const full = acc.f + char.value
      if (char.isVowel) {
        return {
          v: acc.v + char.value,
          c: acc.c,
          f: full,
        }
      } else {
        return {
          v: acc.v,
          c: acc.c + char.value,
          f: full,
        }
      }
    },
    { v: 0, c: 0, f: 0 }
  )

  return {
    vowels: _somatory(initialValues.v),
    consonants: _somatory(initialValues.c),
    fullName: _somatory(initialValues.f),
  }
}

export function frequency(nameObjNum: Char[]) {
  const freq: number[] = new Array(9).fill(0)
  nameObjNum.forEach((char: Char) => {
    char?.value && freq[char.value - 1]++
  })
  return freq
}
