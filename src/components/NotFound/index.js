import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-paragraph">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
