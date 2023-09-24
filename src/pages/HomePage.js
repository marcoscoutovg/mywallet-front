import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { LevelContext } from "../LevelContext"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function HomePage() {

  const { config, username } = useContext(LevelContext)
  const [transactionsList, setTransactionsList] = useState([])
  const navigate = useNavigate();
  let total = 0;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/home`, config)
      .then((res) => {
        console.log(res.data)
        setTransactionsList(res.data.reverse())
      })
      .catch((err) => console.log("nao foi"))

  }, [])

  transactionsList.map(t => (t.tipo === "saida" ? total -= Number(t.value) : total += Number(t.value)))

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {username}</h1>
        <Link to="/">
          <BiExit />
        </Link>
      </Header>

      <TransactionsContainer>
        <ul>
          {transactionsList.map((t) =>
            <ListItemContainer>
              <div>
                <span>{t.date}</span>
                <strong>{t.description}</strong>
              </div>
              <Value color={(t.tipo === "saida") ? "negativo" : "positivo"}>{t.value}</Value>
            </ListItemContainer>)}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={(total >= 0) ? "positivo" : "negativo"}>{total.toFixed(2)}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  overflow-y: scroll;

  article {
    width: 96vw;
    background-color: white;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 157px;
    z-index: 1;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`