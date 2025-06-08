import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'

import './index.css'

const SimilarJobsItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    title,
    rating,
    location,
    jobDescription,
  } = similarJobDetails
  return (
    <li key={id} className="similar-jobs-bg-container">
      <Link className="no-text-decoration" to={`/jobs/${id}`}>
        <div className="logo-and-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-and-rating">
            <h1 className="job-title-similar-jobs">{title}</h1>
            <p className="job-rating">
              <FaStar className="star-icon" /> {rating}
            </p>
          </div>
        </div>
        <h1 className="description-heading-similar-jobs">Description</h1>
        <p className="similar-job-description">{jobDescription}</p>
        <div className="location-and-jobtype-container">
          <IoLocationSharp className="necessary-icons" />
          <p className="location-and-jobtype-text">{location}</p>
          <BsBriefcaseFill className="necessary-icons" />
          <p className="location-and-jobtype-text">{employmentType}</p>
        </div>
      </Link>
    </li>
  )
}

export default SimilarJobsItem
