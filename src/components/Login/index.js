import styled from 'styled-components';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const url = `${process.env.REACT_APP_BACK_END_URL}/sign-in`;

    const [loading, setLoading] = useState("Entrar");
    const [user, setUser] = useState({email: "", password: ""});

    function load() {
        setLoading(<ThreeDots color="#FFFFFF" height={50} width={50} />);

        const loginRequisition = axios.post(url, user);
        loginRequisition.then(response => {
            const {_id, name, email, password, token} = response.data;
            localStorage.setItem("Id", _id);
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("token", token);
            
            navigate('/carteira', { replace: true })
        });
        loginRequisition.catch(() => {
            alert("Erro! Usuário ou senha inválidos!");
            setLoading("Entrar");
        });
    }

    return (
        <LoginBody>
            <Logo>MyWallet</Logo>
            <Input type="text" placeholder="E-mail" value={user.email} onChange={e => {
            const obj = {...user};
            obj.email = e.target.value;
            setUser({...obj});
            }} />
            <Input type="password" placeholder="Senha" value={user.password} onChange={e => {
            const obj = {...user};
            obj.password = e.target.value;
            setUser({...obj});
            }} />
            <Button onClick={() => load()}>{loading}</Button>
            <Link to="/cadastro"><AlternativeLink>Primeira vez? Cadastre-se!</AlternativeLink></Link>
        </LoginBody>
    );
}

const LoginBody = styled.div`
    width: 100vw;
    height: 100vh;
    background: #8C11BE;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.h1`
    font-family: 'Saira Stencil One';
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 24px;
`;

const Input = styled.input`
    box-sizing: border-box;
    width: 86.933333vw;
    height: 58px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5px;
    padding-left: 15px;
    margin-bottom: 13px;
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #000000;

    ::placeholder {
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    }
`;

const Button = styled.button`
    box-sizing: border-box;
    width: 86.933333vw;
    height: 46px;
    background: #A328D6;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5px;
    margin-bottom: 36px;
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
`;

const AlternativeLink = styled.h1`
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    text-align: center;
`;