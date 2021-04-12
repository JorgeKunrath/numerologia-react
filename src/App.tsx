import styled from 'styled-components'
import { DataProvider } from './components/DataContext'
import Header from './components/Header'
import NameForm from './components/NameForm'

const Wrapper = styled.div`
  padding: 1rem;
`

export default function App() {
  return (
    <DataProvider>
      <Wrapper>
        <Header />
        <NameForm />
      </Wrapper>
    </DataProvider>
  )
}
