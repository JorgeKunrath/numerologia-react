import { RawType } from '../components/DataContext'

export default function calculate(raw: RawType, setData: Function) {
  console.log('calculate', raw)
  setData(raw)
}
