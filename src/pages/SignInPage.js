import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react"
import axios from "axios"
import { LevelContext } from "../LevelContext"

export default function SignInPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setToken, setUsername } = useContext(LevelContext)

  function login(e) {
    e.preventDefault();

    const body = { email, password };

    axios.post(`${process.env.REACT_APP_API_URL}/`, body)
      .then((res) => {
        navigate("/home")
        console.log(res.data)
        setToken(res.data.token)
        setUsername(res.data.name)
      })
      .catch((err) => alert(err.response.data))

  }
  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required />
        <input
          placeholder="Senha"
          type="password"
          autocomplete="new-password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required />
        <button
          type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
