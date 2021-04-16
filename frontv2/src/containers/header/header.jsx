import React, { Component } from 'react'

class Header extends Component {

    render() {
        return <header className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="container-fluid flex-space">
                <p className="navbar-brand"><img src="img/icon-left-font-monochrome-black.svg" alt="logo" height="30px"/></p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ms-1" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" onClick={_ => this.props.changePage('homepage')}>
                            <p className={this.props.active === 'homepage' ? "nav-link active" : "nav-link"} aria-current="page">Accueil</p>
                        </li>
                        <li className="nav-item" onClick={_ => this.props.changePage('createPublication')}>
                            <p className={this.props.active === 'createPublication' ? "nav-link active" : "nav-link" } aria-current="page">Nouvelle publication</p>
                        </li>
                        <li className="nav-item" onClick={_ => this.props.changePage('listPublications')}>
                            <p className={this.props.active === 'listPublications' ? "nav-link active" : "nav-link" } aria-current="page">Mes publications</p>
                        </li>
                        <li className="nav-item" onClick={_ => this.props.changePage('find')}>
                            <p className={this.props.active === 'find' ? "nav-link active" : "nav-link" } aria-current="page">Rechercher</p>
                        </li>
                        <li className="nav-item">
                            <p className={this.props.active === 'userEdition' ? "nav-link dropdown-toggle active" : "nav-link dropdown-toggle" } id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Mon compte
                            </p>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><p className="dropdown-item" onClick={_ => this.props.changePage('userEdition')}>Editer mes infomations</p></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><p className="dropdown-item" onClick={_ => this.props.changePage('logout')}>Déconnexion</p></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </header>

    }
}

export default Header;