import React, { Component } from 'react'

class Header extends Component {
    constructor(props) {
        super(props);
    }

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
                            <p className="nav-link active" aria-current="page">Accueil</p>
                        </li>
                        <li className="nav-item" onClick={_ => this.props.changePage('create')}>
                            <p className="nav-link" aria-current="page">Poster</p>
                        </li>
                        <li className="nav-item dropdown">
                            <p className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Mon compte
                            </p>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><p className="dropdown-item">Editer mes infomations</p></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><p className="dropdown-item" onClick={this.props.logout}>Déconnexion</p></li>
                                <li><p className="dropdown-item red">Supprimer mon compte</p></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </header>

    }
}

export default Header;