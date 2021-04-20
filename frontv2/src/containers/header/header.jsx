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
                            <a className={this.props.active === 'homepage' ? "nav-link active" : "nav-link"} aria-current="page">Accueil</a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className={"nav-link dropdown-toggle"} id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Publication
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" onClick={_ => this.props.changePage('createPublication')}>Nouvelle publication</a></li>
                                <li><a className="dropdown-item" onClick={_ => this.props.changePage('listPublications')}>Mes plublication</a></li>
                            </ul>
                        </li>

                        <li className="nav-item" onClick={_ => this.props.changePage('find')}>
                            <a className={this.props.active === 'find' ? "nav-link active" : "nav-link" } aria-current="page">Rechercher</a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className={"nav-link dropdown-toggle active"} id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Mon compte
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" onClick={_ => this.props.changePage('userEdition')}>Editer mes infomations</a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item" onClick={_ => this.props.changePage('logout')}>Déconnexion</a></li>
                            </ul>
                        </li>

                        {this.props.rank === 1 ?
                            <li className="nav-item" onClick={_ => this.props.changePage('adminPage')}>
                                <p className={this.props.active === 'adminPage' ? "nav-link active" : "nav-link" } aria-current="page">Administration</p>
                            </li>
                            : null}
                    </ul>
                </div>
            </div>
        </header>

    }
}

export default Header;