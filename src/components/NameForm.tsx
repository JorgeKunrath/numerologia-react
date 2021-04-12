import React, { useRef } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  p {
    margin: 0;
  }
`

type Props = {
  handleFormData: (name: string, born: string) => void
}

export default function NameForm({ handleFormData }: Props) {
  const name = useRef<HTMLInputElement>(null)
  const born = useRef<HTMLInputElement>(null)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    handleFormData(name.current!.value, born.current!.value)
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
