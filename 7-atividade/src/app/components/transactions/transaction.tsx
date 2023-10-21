import './transaction.css'
import Image from 'next/image';
interface IProps {
    titulo: string;
    valor: string;
    src: string;
    alt: string;
}

export default function Transaction(props: IProps) {
    const { titulo, valor, src, alt } = props;
    return (
        <>
            <section className='transaction'>
                <div className='transaction-div'>
                    <h2 id="transaction-h2">{titulo}</h2>
                    <Image src={src} alt={alt} />
                </div>
                <p id="transaction-p">{valor}</p>   
            </section>
        </>
    )
}