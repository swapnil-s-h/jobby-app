import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {GoLinkExternal} from 'react-icons/go'
import Cookies from 'js-cookie'
import SkillItem from '../SkillItem'
import SimilarJobsItem from '../SimilarJobsItem'
import Header from '../Header'

import './index.css'

const apiStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class JobDetailsItem extends Component {
  state = {
    loadingStatus: apiStatus.loading,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
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
      const updatedLifeAtCompany = {
        description: jsonData.job_details.life_at_company.description,
        imageUrl: jsonData.job_details.life_at_company.image_url,
      }
      const updatedSkills = jsonData.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))
      const updatedJobDetails = {
        companyLogoUrl: jsonData.job_details.company_logo_url,
        companyWebsiteUrl: jsonData.job_details.company_website_url,
        employmentType: jsonData.job_details.employment_type,
        id: jsonData.job_details.id,
        jobDescription: jsonData.job_details.job_description,
        lifeAtCompany: updatedLifeAtCompany,
        location: jsonData.job_details.location,
        packagePerAnnum: jsonData.job_details.package_per_annum,
        rating: jsonData.job_details.rating,
        skills: updatedSkills,
        title: jsonData.job_details.title,
      }
      const updatedSimilarJobs = jsonData.similar_jobs.map(eachSimilarJob => ({
        companyLogoUrl: eachSimilarJob.company_logo_url,
        employmentType: eachSimilarJob.employment_type,
        id: eachSimilarJob.id,
        jobDescription: eachSimilarJob.job_description,
        location: eachSimilarJob.location,
        rating: eachSimilarJob.rating,
        title: eachSimilarJob.title,
      }))
      this.setState({
        loadingStatus: apiStatus.success,
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({
        loadingStatus: apiStatus.failed,
      })
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        We cannot seem to find a page you are looking for.
      </p>
      <button className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsItem = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    const {imageUrl, description} = lifeAtCompany
    return (
      <>
        <Header />
        <div className="job-item-bg-container">
          <div className="job-item-container">
            <div className="logo-and-title-container">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
              <div className="title-and-rating">
                <h1 className="job-title">{title}</h1>
                <p className="job-rating">
                  <FaStar className="star-icon" /> {rating}
                </p>
              </div>
            </div>
            <div className="location-type-and-package">
              <div className="location-and-jobtype-container">
                <IoLocationSharp className="necessary-icons" />
                <p className="location-and-jobtype-text">{location}</p>
                <BsBriefcaseFill className="necessary-icons" />
                <p className="location-and-jobtype-text">{employmentType}</p>
              </div>
              <p className="package-per-annum">{packagePerAnnum}</p>
            </div>
            <hr className="horizontal-line-job-item" />
            <div className="description-text-container">
              <h1 className="description-text">Description</h1>
              <a href={companyWebsiteUrl} className="website-link-item">
                <p className="visit">Visit</p>
                <GoLinkExternal className="external-link-icon" />
              </a>
            </div>
            <p className="job-description-paragraph">{jobDescription}</p>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-list">
              {skills.map(eachSkill => (
                <SkillItem key={eachSkill.name} skillDetails={eachSkill} />
              ))}
            </ul>
            <h1 className="skills-heading">Life at Company</h1>
            <div className="life-at-company-container">
              <p className="life-at-company-description">{description}</p>
              <img
                className="life-at-company-image"
                src={imageUrl}
                alt="life at company"
              />
            </div>
          </div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(eachSimilarJob => (
              <SimilarJobsItem
                key={eachSimilarJob.id}
                similarJobDetails={eachSimilarJob}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {loadingStatus} = this.state
    switch (loadingStatus) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderJobDetailsItem()
      case apiStatus.failed:
        return this.renderFailureView()
      default:
        return <p>Default Executed</p>
    }
  }
}

export default JobDetailsItem
