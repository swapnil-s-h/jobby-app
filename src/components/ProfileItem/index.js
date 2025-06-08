import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class ProfileItem extends Component {
  state = {
    loadingStatus: apiStatus.loading,
    profileData: {},
  }

  componentDidMount = () => {
    this.getProfileData()
  }

  getProfileData = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const jsonData = await response.json()
      const updatedData = {
        name: jsonData.profile_details.name,
        profileImageUrl: jsonData.profile_details.profile_image_url,
        shortBio: jsonData.profile_details.short_bio,
      }
      this.setState({
        loadingStatus: apiStatus.success,
        profileData: updatedData,
      })
    } else {
      this.setState({
        loadingStatus: apiStatus.failed,
      })
    }
  }

  renderLoader = () => (
    <div className="black-bg">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="profile-item-container black-bg">
      <button className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-item-container">
        <img src={profileImageUrl} alt="profile" className="profile-logo" />
        <h1 className="profile-user-name">{name}</h1>
        <p className="profile-user-description">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {loadingStatus} = this.state
    switch (loadingStatus) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderProfileDetails()
      case apiStatus.failed:
        return this.renderFailureView()
      default:
        return <p>Default Executed</p>
    }
  }
}

export default ProfileItem
