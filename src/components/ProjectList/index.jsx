import React, { Component } from "react";
import styles from "./styles.css";

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          projects: []
        };
      }

    componentDidMount() {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = "http://api.salic.cultura.gov.br/v1/projetos?format=json&sort=valor_aprovado:desc";
        fetch(proxyUrl + targetUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        projects: result._embedded.projetos
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, projects } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <table className={styles.projectsGrid}>
                    <tbody>
                        {projects.map(item => (
                            <tr key={item.PRONAC}>
                                <td>{item.nome}</td>
                                <td>{item.cgccpf}</td>
                                <td>{item.valor_aprovado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    }
}

export default ProjectList;