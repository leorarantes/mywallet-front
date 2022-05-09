import styled from 'styled-components';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate();
    const url = "http://localhost:5000/sign-up";

    const [loading, setLoading] = useState("Cadastrar");
    const [user, setUser] = useState({ email: "", name: "", password: "" });
    const [confirmPassword, setConfirmPassword] = useState("");

    function load() {
        setLoading(<ThreeDots color="#FFFFFF" height={50} width={50} />);

        if(user.name === "" || user.email === "" || user.password === "" || confirmPassword === "") {
            alert("Erro! Não podem haver campos vazios!");
            setLoading("Cadastrar");
            return;
        } 

        if(user.password !== confirmPassword) {
            alert("Erro! A senha digitada no campo 'Confirme a senha' deve a mesma do campo 'Senha'!");
            setLoading("Cadastrar");
            return;
        } 

        const registerRequisition = axios.post(url, user);
        registerRequisition.then(() => {
            navigate('/', { replace: true })
        });
        registerRequisition.catch(() => {
            alert("Erro! Não foi possível realizar seu cadastro, tente novamente mais tarde!");
            setLoading("Cadastrar");
        })
    }

    return (
        <RegisterBody>
            <Logo>MyWallet</Logo>
            <Input type="text" placeholder="Nome" value={user.name} onChange={e => {
            const obj = {...user};
            obj.name = e.target.value;
            setUser({...obj});
            }} />
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
            <Input type="password" placeholder="Confirme a senha" value={confirmPassword} onChange={e => {
            const str = e.target.value;
            setConfirmPassword(str);
            }} />
            <Button onClick={() => load()}>{loading}</Button>
            <Link to="/"><AlternativeLink>Já tem uma conta? Entre agora!</AlternativeLink></Link>
        </RegisterBody>
    );
}

const RegisterBody = styled.div`
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
    width: 326px;
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
    width: 326px;
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