import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {Link} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li key={id}>
      <Link className="no-text-decoration" to={`/jobs/${id}`}>
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
          <h1 className="description-text">Description</h1>
          <p className="job-description-paragraph">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
