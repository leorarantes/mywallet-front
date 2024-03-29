import styled from 'styled-components';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import dayjs from "dayjs";

export default function NewDebit() {
    const navigate = useNavigate();

    const url = `${process.env.REACT_APP_BACK_END_URL}/wallets`;
    const config = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }

    let day = dayjs().date();
    day < 10 ? day = "0" + day : day = day.toString();
    let month = dayjs().month()+1;
    month < 10 ? month = "0" + month : month = month.toString();
    const date = day + "/" + month;

    const [newDebit, setNewDebit] = useState({date: date, value: "", title: "", type: "debit"});
    const [loading, setLoading] = useState("Salvar saída");

    function load() {
        setLoading(<ThreeDots color="#FFFFFF" height={50} width={50} />);

        const newDebitRequisition = axios.post(url, newDebit, config);
        newDebitRequisition.then(() => {
            navigate('/carteira', { replace: true })
        });
        newDebitRequisition.catch(() => {
            alert("Erro! Não foi possível salvar a saída, tente novamente mais tarde!");
            setLoading("Salvar saída");
        })
    }

    return (
        <NewDebitBody>
            <Header>
                <h1>Nova saída</h1>
            </Header>
            <Input type="text" placeholder="Valor" value={newDebit.value} onChange={e => {
                const obj = {...newDebit};
                obj.value = e.target.value;
                setNewDebit({...obj});
            }} />
            <Input type="text" placeholder="Descrição" value={newDebit.title} onChange={e => {
                const obj = {...newDebit};
                obj.title = e.target.value;
                setNewDebit({...obj});
            }} />
            <Button onClick={() => load()}>{loading}</Button>
        </NewDebitBody>
    );
}

const NewDebitBody = styled.div`
    width: 100vw;
    height: 100vh;
    background: #8C11BE;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const Header = styled.header`
    width: 86.933333vw;
    height: 4.6476761vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 25px;
    margin-bottom: 40px;

    h1 {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }
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