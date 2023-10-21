'use client'
import './queue.css'
import Cliente from '../clientes/cliente'
import Modal from '../modal/modal'
import React, { useState } from 'react'

export default function Queue() { 
    const [modalAberto, setModalAberto] = useState<boolean>(false);

    function abrirModal() {
        setModalAberto(true);
    }

    return (
        <>
            <div className='queue'> 
                <a onClick={abrirModal}>+ Adicionar pessoa a fila</a>
                {modalAberto && <Modal setFecharModal={() => setModalAberto(!modalAberto)} />}
                <Cliente />
            </div>                  
        </>
    );
}