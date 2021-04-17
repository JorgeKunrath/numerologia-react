interface Char {
  char: string
  isVowel: boolean
  value?: number
}

// prettier-ignore
const ConversionTable = new Map([
  ['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5], ['f', 6], ['g', 7], ['h', 8], ['i', 9], 
  ['j', 1], ['k', 2], ['l', 3], ['m', 4], ['n', 5], ['o', 6], ['p', 7], ['q', 8], ['r', 9], 
  ['s', 1], ['t', 2], ['u', 3], ['v', 4], ['w', 5], ['x', 6], ['y', 7], ['z', 8], 
])

export function normalize(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z]/g, '')
}

export function defineChars(name: string) {
  function handleException(c: string, i: number, name: string[]) {
    let isException = false
    /*
    TODO
    Exceção de W e Y

    por padrão eles não são vogais, e tá tudo bem

    1. Y é vogal quando for a única vogal da palavra
    2. Y e W são vogais quando precedidas por uma vogal formando ditongo
    3. W é consoante caso seja a primeira letra da palavra.

    1 e 3 são fáceis, só preciso identificar palavras
    2 eu finjo que não sei o que é sílaba, se a letra anterior for vogal eu considero como ditongo e deu
    - buscar referências de nomes com Y e W para testar se na maior parte dos casos é ditongo ou não

    aqui eu preciso saber o que é uma palavra, no resto do código não

    */
    return isException
  }

  const fullName: Char[] = name.split('').map((c: string, i, name) => ({
    char: c,
    isVowel: 'aeiou'.includes(c) || handleException(c, i, name),
  }))

  return fullName
}

export function applyValues(nameObj: Char[]): Char[] {
  const nameObjNumbered = nameObj.map((item: Char) => {
    return {
      ...item,
      value: ConversionTable.get(item.char),
    }
  })
  return nameObjNumbered
}

export function somatory(nameObjNum: Char[]) {
  function _somatory(initial: number) {
    let step = initial
    let arr = [step]
    while (step > 9) {
      let stepArray = step.toString().split('').map(Number)
      step = stepArray.reduce((acc: number, num: number) => acc + num)
      arr.push(step)
    }
    return arr
  }

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
    vowelsRes: _somatory(initialValues.v),
    consonantsRes: _somatory(initialValues.c),
    fullNameRes: _somatory(initialValues.f),
  }
}

export function frequency(nameObjNum: Char[]) {
  const freq: number[] = new Array(9).fill(0)
  nameObjNum.forEach((char: Char) => {
    char?.value && freq[char.value - 1]++
  })
  return freq
}