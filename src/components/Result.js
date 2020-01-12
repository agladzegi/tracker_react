import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Logo from '../logo.png'

class Result extends Component {

    state = {
        loading: false,
        error: '',
        profileData: null
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        this.setState({ loading: true })
        try {
            
            const { REACT_APP_API_KEY } = process.env
            const { platform, gamertag } = this.props.match.params
            const response = await axios.get(`/api/profile/${platform}/${gamertag}`, {
                headers: {
                    'TRN-Api-Key': REACT_APP_API_KEY
                }
            })

            this.setState({ profileData: response.data.data })
            this.setState({ loading: false })
        } catch(err) {
            this.setState({ loading: false })
            this.setState({ error: 'Profile not found' })
        }
    }


    render() {
        const { loading, error, profileData } = this.state
        return (
            <React.Fragment>
                <div className="result">
                    <img className="result-logo" src={Logo} alt="Apex Logo"/>
                    { loading ? <div className="spinner"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div> : null }
                    { error ? <div className="result-error"><h2>{ error }</h2><Link className="result-button" to="/">Go Back</Link></div> : null }
                    { profileData ? <div className="result-profile-data">
                        <h1 className="profile-data-gamertag">
                    <img src={profileData.platformInfo.avatarUrl} className="profile-data-avatar" alt={profileData.platformInfo.platformUserId} />
                    {profileData.platformInfo.platformUserId}
                    </h1>
                    <div className="profile-data-grid">
                    <div>
                        <img src={profileData.segments[1].metadata.imageUrl} className="profile-data-legend" alt="" />
                    </div>
                    <div>
                        <ul className="profile-data-ul">
                        <li className="profile-data-li">
                            <h4>Selected Legend</h4>
                            <p>{profileData.metadata.activeLegendName}</p>
                        </li >
                        { profileData.segments[0].stats.season2Wins ? <li className="profile-data-li">
                            <h4>Season 2 Wins</h4>
                            <p>
                            { profileData.segments[0].stats.season2Wins.displayValue } {' '}
                            <span>({ profileData.segments[0].stats.season2Wins.percentile }%)</span>
                            </p>
                        </li> : null }
                        { profileData.segments[0].stats.level ? <li className="profile-data-li">
                            <h4>Apex Level</h4>
                            <p>
                            { profileData.segments[0].stats.level.displayValue } {' '}
                            <span>({ profileData.segments[0].stats.level.percentile }%)</span>
                            </p>
                        </li> : null }
                        { profileData.segments[0].stats.kills ? <li className="profile-data-li">
                            <h4>Lifetime Kills</h4>
                            <p>
                            { profileData.segments[0].stats.kills.displayValue } {' '}
                            <span>({ profileData.segments[0].stats.kills.percentile }%)</span>
                            </p>
                        </li> : null }
                        { profileData.segments[0].stats.damage ? <li className="profile-data-li">
                            <h4>Damage Done</h4>
                            <p>
                            { profileData.segments[0].stats.damage.displayValue } {' '}
                            <span>({ profileData.segments[0].stats.damage.percentile }%)</span>
                            </p>
                        </li> : null }
                        </ul>
                    </div>
                    </div>
                    <Link className="result-button" to="/">Go Back</Link>
                </div> : null }
                </div>
            </React.Fragment>
        )
    }
}

export default Result
