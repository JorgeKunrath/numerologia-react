import React from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import NameForm from './components/NameForm'

const Wrapper = styled.div`
  padding: 1rem;
`

export default function App() {
  function handleFormData(name: string, born: string) {
    console.log(name, born)
  }
  return (
    <Wrapper>
      <Header />
      <NameForm handleFormData={handleFormData} />
    </Wrapper>
  )
}
