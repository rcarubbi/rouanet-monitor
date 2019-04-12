import React, { Component } from "react";
import axios  from "axios";
import styles from "./styles.module.css";

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          projects: [],
          targetUrl: `http://api.salic.cultura.gov.br/v1/projetos?format=json&limit=10&sort=valor_aprovado:desc`,
          prev: "",
          next: "",
        };
      }

    
    componentDidMount() {
        axios.get(`https://cors-escape.herokuapp.com/${this.state.targetUrl}`)
        .then(
            (result) => {
                console.log(this.state);
                this.setState({
                    isLoaded: true,
                    projects: result.data._embedded.projetos,
                    next: result.data._links.next,
                    prev: result.data._links.prev
                })
            }
        ).catch(
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

  
    anterior = (event) => {
       this.setState({
           isLoaded: false
       })
        
        axios.get(`https://cors-escape.herokuapp.com/${this.state.prev}`)
        .then(
            (result) => {
                console.log(this.state);
                this.setState({
                    isLoaded: true,
                    projects: result.data._embedded.projetos,
                    next: result.data._links.next,
                    prev: result.data._links.prev
                })
            }
        ).catch(
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }
    proxima = (event) => {
        this.setState({
            isLoaded: false
        })
         
        axios.get(`https://cors-escape.herokuapp.com/${this.state.next}`)
        .then(
            (result) => {
                console.log(this.state);
                this.setState({
                    isLoaded: true,
                    projects: result.data._embedded.projetos,
                    next: result.data._links.next,
                    prev: result.data._links.prev
                })
            }
        ).catch(
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
        
    }
    render() {
        const { error, isLoaded, projects } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div className={styles.container}>
                        <table className={styles.projectsGrid}>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CNPJ</th>
                                    <th>Valor Aprovado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map(item => (
                                    <tr key={item.PRONAC}>
                                        <td>{item.nome}</td>
                                        <td>{item.cgccpf}</td>
                                        <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor_aprovado)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={this.anterior}>Anterior</button>
                    <button onClick={this.proxima}>Próxima</button>
                </div>
            );
        }
    }
}

export default ProjectList;