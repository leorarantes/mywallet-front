import styled from 'styled-components';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Wallet() {
    const navigate = useNavigate();

    const url = `${process.env.REACT_APP_BACK_END_URL}/wallets`;
    const config = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }

    const userName = localStorage.getItem("name");
    const [entriesArray, setEntriesArray] = useState([]);

    useEffect(() => {
		const entriesRequisition = axios.get(url, config);

		entriesRequisition.then(response => {
			setEntriesArray([...response.data]);
		});
        entriesRequisition.catch(e => alert("Erro!", e));
    }, [url]);
    
    let balance = 0;
    if(entriesArray.length > 0) {
        entriesArray.forEach(element => {
            let {value, type} = element;
            value = parseFloat(value);
            
            if(type === "credit") {
                balance += value;
            }
            else {
                balance -= value;
            }
        });
    }

    function exit() {
        const exitRequisition = axios.post(`${process.env.REACT_APP_BACK_END_URL}/sign-out`, null, config);
        exitRequisition.then(() => {
            navigate('/', { replace: true })
        });
        exitRequisition.catch(() => {
            alert("Erro ao sair da sessão!");
        });
    }

    return (
        <WalletBody>
            <Header>
                <h1>Olá, {userName}</h1>
                <ion-icon name="exit-outline" onClick={() => exit()}></ion-icon>
            </Header>
            {entriesArray.length > 0 ? 
                    <WalletBox>
                        <Entries>
                            {entriesArray.map(element => {
                                const {_id, date, title, value, type} = element;
                                
                                if(type === "credit") {
                                    return (
                                        <Entry key={_id} color="#03AC00">
                                            <h1>{date}</h1>
                                            <h1>{title}</h1>
                                            <h1>{value}</h1>
                                        </Entry>
                                    );
                                }
                                else {
                                    return (
                                        <Entry key={_id} color="#C70000">
                                            <h1>{date}</h1>
                                            <h1>{title}</h1>
                                            <h1>{value}</h1>
                                        </Entry>
                                    );
                                }
                            })}
                        </Entries>
                        <Balance color={balance < 0 ? "#C70000" : "#03AC00"}>
                            <h1>SALDO</h1>
                            <h1>{balance}</h1>
                        </Balance>
                    </WalletBox>
            :
                    <WalletBox>
                        <Text>Não há registros de entrada ou saída</Text>
                    </WalletBox>
            }
            <NewEntries>
                <NewEntryBox onClick={() => navigate('/nova-entrada', { replace: true })}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <h1>Nova entrada</h1>
                </NewEntryBox>
                <NewEntryBox onClick={() => navigate('/nova-saida', { replace: true })}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <h1>Nova saída</h1>
                </NewEntryBox>
            </NewEntries>
        </WalletBody>
    );
}

const WalletBody = styled.div`
    width: 100%;
    height: 100%;
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
    justify-content: space-between;
    margin-top: 3.748126vh;
    margin-bottom: 3.298351vh;

    h1 {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }

    ion-icon {
        font-size: 26px;
        color: #FFFFFF;
    }
`;

const WalletBox = styled.div`
    width: 86.933333vw;
    height: 66.866566vh;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-bottom: 1.9490254vh;
`;

const Entries = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 91.0313901%;
    overflow-y: scroll;
    padding-top: 10px;
`;

const Entry = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 42px;
    position: relative;

    h1 {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        position: absolute;
        top: 11px;
    }

    h1:first-child {
        color: #C6C6C6;
        left: 12px;
    }

    h1:nth-child(2) {
        color: #000000;
        left: 60px;
    }

    h1:last-child {
        color: ${props => props.color};
        right: 12px;
    }
`;

const Balance = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 12px;
    padding-right: 12px;

    h1 {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
    }

    h1:first-child {
        color: #000000;
    }

    h1:last-child {
        color: ${props => props.color};
    }
`;

const Text = styled.h1`
    width: 180px;
    height: 46px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
`;

const NewEntries = styled.div`
    width: 86.933333vw;
    height: 17.0914542vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2.3988005vh;
`;

const NewEntryBox = styled.div`
    box-sizing: border-box;
    width: 47.5460122%;
    height: 100%;
    background: #A328D6;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    border-radius: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;

    :active {
        background: #d87fff;
    }

    ion-icon {
        font-size: 22px;
        color: #FFFFFF;
    }

    h1 {
        width: 64px;
        height: 40px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
    }
`;