import React, {Component} from 'react';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import './bootstrap.min.css';
import ListaCitas from './components/ListaCitas';


class App extends Component {
  state = {
      citas:
        []
  }

  //Cuando la aplicacion carga
  componentDidMount(){
      const citasLS = localStorage.getItem('citas');
      if (citasLS){
        this.setState({
          citas: JSON.parse(citasLS)
        })
      }
  }

  //Cuando agregamos o eliminamosn una nueva cita
  componentDidUpdate(){
    // localstorage no permite strings, por lo que lo convertimos
    localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }

  crearNuevaCita = datos => {
    // Copiar el state actual
    //[...this.state.citas, datos] Similar al push de un arreglo. Primero hace una copioa
    // de las citas y desp le agrega los datos
    const citas = [...this.state.citas, datos];
    this.setState({
      citas: citas
    })
  }

  eliminarCita = id => {
    console.log(id);
    const citasActuales = [...this.state.citas];
    const citas = citasActuales.filter(cita => cita.id !== id);
    this.setState({citas})
  }

  render(){
    return(
      <div className="container">
        <Header 
          titulo='Administrador Pacientes Veterinaria'
        />
        <div className="row">
              <div className="col-md-10 mx-auto">
                  <NuevaCita
                    crearNuevaCita = {this.crearNuevaCita}
                  />
              </div>

              <div className="mt-5 col-md-10 mx-auto">
                  <ListaCitas
                    citas = {this.state.citas}
                    eliminarCita = {this.eliminarCita}
                  />
              </div>
        </div>
      </div>
    );
  }
}

export default App;
