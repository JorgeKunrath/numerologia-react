import React, { createContext, useContext, useEffect, useState } from 'react'
import { calculateName, calculateBorn } from '../functions/calculate'

export type RawType = {
  name: string
  born: string
} | null

type ContextType = {
  raw: object | null
  setRaw: Function
  data: object | null
  setData: Function
}

export const DataContext = createContext<ContextType>({
  raw: {},
  setRaw: () => {},
  data: {},
  setData: () => {},
})

export const useDataContext = () => useContext(DataContext)

export const DataProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [raw, setRaw] = useState<RawType>(null)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    raw && setData({ name: calculateName(raw.name), born: calculateBorn(raw.born) })
  }, [raw])

  useEffect(() => {
    data && console.log(data)
  }, [data])

  const values = {
    raw,
    setRaw,
    data,
    setData,
  }

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>
}
