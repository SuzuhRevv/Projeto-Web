import './modal.css'
import { useState, FormEvent, useEffect } from 'react'

interface ModalProps {
  setFecharModal: () => void;
}

export default function Modal({ setFecharModal }: ModalProps) {
  const [name, setName] = useState<string>('')
  const [bread, setBread] = useState<number>()

  const createRow = async (e: FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, bread }),
    });
    setFecharModal();
  }  

  return (
    <>
      <div className='modal'>
        <section className='modal-section'>
          <div className='modal-div'>
            <h2>Adicionar pessoa a fila</h2>
            <div className='modal-input'>
              <input
                type="text"
                placeholder="Nome completo do cliente"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Total de pães:"
                required
                value={bread}
                onChange={(e) => setBread(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className='modal-botoes'>
            <button type="submit" onClick={createRow} id="enviar">Enviar</button>
            <button onClick={setFecharModal} id="cancelar">Cancelar</button>
          </div>
        </section>
      </div>
    </>
  )
}
