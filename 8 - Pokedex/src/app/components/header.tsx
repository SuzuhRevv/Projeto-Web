import Image from 'next/image';
import Pokeball from '../public/images/pokeball.svg'

export default function Header() {
  return (
    <div>
      <Image src={Pokeball} alt ="" width='36' height='36'></Image>
    </div>
  );
}