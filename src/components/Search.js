import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

class Search extends Component {

    state = {
        platform: null,
        gamertag: ''
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        
        if(!this.state.gamertag || !this.state.platform) {
            toast.error('Please choose your platfrom and enter your gamertag', { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER })
        } else {
            this.props.history.push(`/result/${this.state.platform}/${this.state.gamertag}`)
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="search">
                    <form onSubmit={this.handleSubmit} className="search-form">
                        <div className="search-icons">
                            <label>
                                <input type="radio" name="platform" value="origin" onClick={this.handleChange} />
                                <i className="fab fa-windows platform-icon"></i>
                            </label>
                            <label>
                                <input type="radio" name="platform" value="xbl" onChange={this.handleChange} />
                                <i className="fab fa-xbox platform-icon"></i>
                            </label>
                            <label>
                                <input type="radio" name="platform" value="psn" onChange={this.handleChange} />
                                <i className="fab fa-playstation platform-icon"></i>
                            </label>
                        </div>
                        <input type="text" name="gamertag" value={this.state.gamertag} onChange={this.handleChange} placeholder="Origin ID, Xbox Gamertag, PSN ID..." className="search-input" />
                        <button type="submit" className="search-button"><i className="fas fa-search"></i> search</button>
                    </form>
                    <ToastContainer />
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Search)
