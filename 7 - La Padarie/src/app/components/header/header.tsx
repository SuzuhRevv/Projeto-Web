'use client'
import './header.css'
import Transaction from '../transactions/transaction';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import Logo from './../../figures/Logo.svg';
import Pessoas from './../../figures/Icon.svg';
import Paes from './../../figures/Group 1.svg';
import Entrada from './../../figures/Group 2.svg';
import { fetchData } from '../clientes/cliente';

export default function Header() {
    const [totalBread, setTotalBread] = useState<number>(0);
    const [totalPeople, setTotalPeople] = useState<number>(0);
    const [totalValue, setTotalValue] = useState<number>(0);
  
    useEffect(() => {
        const fetchAndSetData = async () => {
            try {
              const { totalBread, totalPeople, totalValue } = await fetchData();
              setTotalBread(totalBread);
              setTotalPeople(totalPeople);
              setTotalValue(totalValue);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          const fetchDataAndUpdate = () => {
            fetchAndSetData();
          };
      
          const intervalId = setInterval(fetchDataAndUpdate, 1000);
      
          fetchAndSetData();
      
          return () => {
            clearInterval(intervalId);
          };
        }, []);

    return (
        <>
            <section id="header">
                <Image src={Logo} alt="logo la padarie" />
                <div className='header-div'>
                    <Transaction titulo="Pessoas na fila" valor={` ${totalPeople} `} src={Pessoas} alt="duas pessoas" />
                    <Transaction titulo="Pães vendidos" valor={` ${totalBread} `} src={Paes} alt="carrinho de compras" />
                    <div id="transaction-entrada">
                        <Transaction titulo="Entrada" valor={`R$ ${totalValue.toFixed(2)}`} src={Entrada} alt="cifrão" />
                    </div>                    
                </div>
            </section>
        </>
    )
}