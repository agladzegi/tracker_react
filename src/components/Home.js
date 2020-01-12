import React, { Component } from 'react'
import Search from './Search'
import Logo from '../logo.png'

class Home extends Component {
    render() {
        return (
            <div className="App">
                <div className="logo">
                    <img src={Logo} alt="Apex Logo"/>
                </div>
                <div className="container">
                    <Search />
                </div>
            </div>
        )
    }
}

export default Home
