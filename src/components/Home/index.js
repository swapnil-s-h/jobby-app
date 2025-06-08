import Header from '../Header'
import './index.css'

const Home = props => {
  const redirectToJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-bg-container">
        <h1 className="home-main-heading">Find The Job That Fits Your Life</h1>
        <p className="home-page-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button
          onClick={redirectToJobs}
          className="home-find-jobs-btn"
          type="button"
        >
          Find Jobs
        </button>
      </div>
    </>
  )
}

export default Home
