import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { LevelContext } from "../LevelContext"


export default function TransactionsPage() {

  const [enabled, setEnabled] = useState(false)
  const { config } = useContext(LevelContext)
  const [value, setValue] = useState()
  const [description, setDescription] = useState("")
  const { tipo } = useParams()
  const navigate = useNavigate()

  function sendTransactions(e) {
    e.preventDefault()
    setEnabled(true)

    const body = { value, description }

    axios.post(`${process.env.REACT_APP_API_URL}/nova-transacao/${tipo}`, body, config)
      .then(() => navigate("/home"))
      .catch((err) => {
        setEnabled(false)
        alert(err.response.data)
      })
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={sendTransactions}>
        <input
          placeholder="Valor"
          type="text"
          name="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <input
          placeholder="Descrição"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={enabled}>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
