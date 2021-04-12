import { useRef } from 'react'
import styled from 'styled-components'

import { useDataContext } from './DataContext'

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  p {
    margin: 0;
  }
`

export default function NameForm() {
  const name = useRef<HTMLInputElement>(null)
  const born = useRef<HTMLInputElement>(null)

  const { setRaw } = useDataContext()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setRaw({
      name: name.current!.value,
      born: born.current!.value,
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <p>Insira seu nome e data de nascimento</p>
      <input ref={name} type="text" placeholder="Nome completo" />
      <input ref={born} type="date" />
      <button type="submit">Calcular</button>
    </Form>
  )
}
