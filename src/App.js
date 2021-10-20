import React, {useState, useEffect} from 'react';
import Control from './components/Control.jsx';
import Formulario from './components/Formulario.jsx';
import Listado from './components/Listado.jsx';
import Pregunta from './components/Pregunta.jsx';

function App() {

  const [restante, setRestante] = useState(0);
  const [verPregunta, setVerPregunta] = useState(true);
  const [gasto, setGasto] = useState({});
  const [crearGasto, setCrearGasto] = useState(false);

  let gastosIniciales = JSON.parse(localStorage.getItem('gastos'));
  if (!gastosIniciales){ 
    gastosIniciales = [];
  }

  const [presupuesto, setPresupuesto] = useState(null);

  let presupuestoInicial = JSON.parse(localStorage.getItem('presupuesto'));
  if(!presupuestoInicial){
    presupuestoInicial = presupuesto;
  }

  const [gastos, setGastos] = useState(gastosIniciales);

  useEffect( () => {
    if(gastosIniciales){
      localStorage.setItem('gastos', JSON.stringify(gastos));
    }else{
      localStorage.setItem('gastos', JSON.stringify([]));
    }
    if(presupuestoInicial){
      localStorage.setItem('presupuesto', presupuestoInicial);
      setPresupuesto(presupuestoInicial);
      if(gastos){
        let final = 0;
        gastos.forEach( g => {
          final += g.cantidad
        })
        const presupuestoRestante = presupuestoInicial - final;
        setRestante(presupuestoRestante);
      }else{
        const presupuestoRestante = presupuestoInicial;
        setRestante(presupuestoRestante);
      }
    }else{
      localStorage.setItem('presupuesto', 0)
    }
  }, [gastos, gastosIniciales, presupuesto, presupuestoInicial, gasto, restante] );

  useEffect(() => {
    if (crearGasto){
      setGastos([...gastos, gasto]);
      setCrearGasto(false);
      const presupuestoRestante = restante - gasto.cantidad;
      setRestante(presupuestoRestante);
      setGasto({});
    }
  }, [gasto, crearGasto, gastos, restante]);

  const restartAll = () => {
    setVerPregunta(true);
    setGastos([]);
    setPresupuesto(0);
    setRestante(0);
    gastosIniciales = [];
    presupuestoInicial = null;
    restartLocal();
  }

  const restartLocal = () => {
    localStorage.setItem('gastos', JSON.stringify([]));
    localStorage.setItem('presupuesto', null);
  }

  return (
    <div className="container">
      <header>
        <h1>Weekly expenses</h1>
        <div className="contenido-principal contenido">
          {verPregunta && !presupuestoInicial ? ( 
            <Pregunta setPresupuesto={setPresupuesto} setRestante={setRestante} setVerPregunta={setVerPregunta} presupuestoInicial={presupuestoInicial}/>
          ) : (
            <div className="row">
              <div className="one-half column"> 
                <Formulario setGasto={setGasto} setCrearGasto={setCrearGasto} presupuestoInicial={presupuestoInicial}/>
              </div>
              <div className="one-half column"> 
                <Listado gastos={gastos} setGastos={setGastos} setRestante={setRestante} restante={restante}/>
                <Control presupuesto={presupuesto} restante={restante}/>
                <div className='row restart'> 
                <div className="five columns" style={{textAlign: 'center'}}>
                        <button className="button eliminar u-full-width" onClick={restartAll}>Restart Week</button>
                </div>             
            </div>
              </div>
            </div>
          )}
        </div>
      </header>
      <footer>
        <p className="footer">Made by <a href="https://www.github.com/nchvrgr" target="_blank" rel="noreferrer">Nacho</a></p>
      </footer>
    </div>
  );
}

export default App;
