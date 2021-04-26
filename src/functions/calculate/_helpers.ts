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

export function sumSteps(initial: number) {
  let step = initial
  let arr = [step]
  while (step > 9) {
    let stepArray = step.toString().split('').map(Number)
    step = stepArray.reduce((acc, num) => acc + num)
    arr.push(step)
  }
  return arr
}

export function somatory(nameObjNum: Char[]) {
  const initialValues = nameObjNum.reduce(
    (acc, char: Char) => {
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
    vowels: sumSteps(initialValues.v),
    consonants: sumSteps(initialValues.c),
    fullName: sumSteps(initialValues.f),
  }
}

export function frequency(nameObjNum: Char[]) {
  const freq: number[] = new Array(9).fill(0)
  nameObjNum.forEach((char: Char) => {
    char?.value && freq[char.value - 1]++
  })
  return freq
}

/**
 * somatório de dd/mm/ano-do-ultimo-niver
 */
export function getPersonalYear(rawBorn: string) {
  let yearToUse

  const bornDate = new Date(rawBorn)
  const born = {
    d: bornDate.getUTCDate(),
    m: bornDate.getUTCMonth() + 1,
    y: bornDate.getUTCFullYear(),
  }

  const curDate = new Date()
  const cur = {
    d: curDate.getUTCDate(),
    m: curDate.getUTCMonth() + 1,
    y: curDate.getUTCFullYear(),
  }

  if (born.m < cur.m) {
    yearToUse = cur.y
  } else if (born.m === cur.m) {
    if (born.d <= cur.d) {
      yearToUse = cur.y
    } else {
      yearToUse = cur.y - 1
    }
  } else {
    yearToUse = cur.y - 1
  }

  const initialDate = `${born.d}${born.m}${yearToUse}`
    .split('')
    .map((s) => +s)
    .reduce((acc, cur) => acc + cur, 0)

  const arr = sumSteps(initialDate)

  return arr
}
