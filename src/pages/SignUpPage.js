import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import BASE_URL from "../constants/baseUrl";
import { LevelContext } from "../LevelContext";

export default function SignUpPage() {

  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const {config} = useContext(LevelContext)

  function signUp(e) {
    e.preventDefault();

    const body = { name, email, password }

    if (password === confirmPassword) {
      axios.post(`${BASE_URL}/cadastro`, body)
      .then(() => navigate("/"))
      .catch((err) => alert(err.response.data))
    } else {
      alert("A senha deve ser igual")
    }
  }
  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="E-mail"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <input
          placeholder="Senha"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        <input
          placeholder="Confirme a senha"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
