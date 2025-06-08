import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  authenticateUser = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const jsonData = await response.json()
    if (response.ok) {
      const jwtToken = jsonData.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 3})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({
        errorMsg: `*${jsonData.error_msg}`,
      })
    }
    console.log(jsonData)
    console.log(jsonData.jwt_token)
  }

  changeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  changePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form className="login-form" onSubmit={this.authenticateUser}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label htmlFor="usernameInput" className="input-element-labels">
            USERNAME
          </label>
          <input
            className="input-elements"
            type="text"
            id="usernameInput"
            value={username}
            placeholder="Username"
            onChange={this.changeUsername}
          />
          <label htmlFor="passwordInput" className="input-element-labels">
            PASSWORD
          </label>
          <input
            className="input-elements"
            type="password"
            value={password}
            id="passwordInput"
            placeholder="Password"
            onChange={this.changePassword}
          />
          <button className="login-button" type="submit">
            Login
          </button>
          <p className="error-msg">{errorMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
