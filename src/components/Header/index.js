import {Link, withRouter} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutUser = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="no-text-decoration">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo-header"
        />
      </Link>
      <div className="nav-items-container">
        <Link to="/" className="nav-items">
          Home
        </Link>
        <Link to="/jobs" className="nav-items">
          Jobs
        </Link>
      </div>
      <button className="logout-btn" type="button" onClick={logoutUser}>
        Logout
      </button>
      <div className="buttons-container-mobile">
        <button className="mobile-nav-buttons" type="button">
          <Link to="/" className="mobile-nav-links">
            <IoMdHome />
          </Link>
        </button>
        <button className="mobile-nav-buttons" type="button">
          <Link to="/jobs" className="mobile-nav-links">
            <BsBriefcaseFill />
          </Link>
        </button>
        <button className="mobile-nav-links mobile-nav-buttons" type="button">
          <FiLogOut />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
