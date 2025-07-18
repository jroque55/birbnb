import './BarraInferior.css';

const BarraInferior = () => {
    return (
        <footer className="barra-bg">
            <div className="barra-content">
                <div className="logo-container"> 
                    <button className="logo-foot">Birbnb</button>
                </div>
                <div className="links-container"> 
                    <div className="links-group left">
                        <button>Ayuda</button>
                        <button>¿Cómo funciona Birbnb?</button>
                    </div>
                    <div className="links-group right">
                        <button>Términos y condiciones</button>
                        <button>Información legal</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default BarraInferior