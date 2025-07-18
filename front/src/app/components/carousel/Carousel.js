import './Carousel.css';
import { alojamientos_hot } from '../../mockData/alojamientos-hot';
import AlojamientosHot from '../alojamientos-hot/alojamientos-hot';
import Image from "next/image";


const Carousel = () => {
    return (
        <div className="carousel">
        <div className="alojamientos-carousel">
            {alojamientos_hot.map((product) =>
                <AlojamientosHot aProduct={product} key={product.id} />
            )}
            </div>
            <div className='ventajas'>
                <div className='ventajas-item'>
                    <Image
                        src="https://imgcy.trivago.com//hardcodedimages/homepage-landing/usp/Search.svg"
                        width={160}
                        height={170}
                        objectFit="cover"
                        alt="Buscá rápido" />
                    <h3>Buscá rápido</h3>
                    <p>Buscá fácilmente entre millones de hoteles en segundos.</p>
                </div>

                <div className='ventajas-item'>
                    <Image
                        src="https://imgcy.trivago.com//hardcodedimages/homepage-landing/usp/Save.svg"
                        width={160}
                        height={170}
                        objectFit="cover"
                        alt="Ahorrá a lo grande" />
                    <h3>Ahorrá a lo grande</h3>
                    <p>Encontrá grandes ofertas en nuestras páginas asociadas.</p>
                </div>
            </div>
        </div>
    )

};

export default Carousel;