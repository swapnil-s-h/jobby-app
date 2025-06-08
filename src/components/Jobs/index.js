import {Component} from 'react'
import {IoSearchOutline} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProfileItem from '../ProfileItem'
import Header from '../Header'
import EmploymentTypeItem from '../EmploymentTypeItem'
import SalaryRangeItem from '../SalaryRangeItem'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    jobsLoading: apiStatus.loading,
    selectedEmployeeTypes: [],
    activeSalaryRange: '',
    searchInput: '',
  }

  componentDidMount = () => {
    this.getJobsData()
  }

  getJobsData = async () => {
    const {selectedEmployeeTypes, activeSalaryRange, searchInput} = this.state
    const activeEmploymentType = selectedEmployeeTypes.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentType}&minimum_package=${activeSalaryRange}&search=${searchInput}`
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
      const {jobs} = jsonData
      const updatedData = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobsLoading: apiStatus.success,
      })
    } else {
      this.setState({
        jobsLoading: apiStatus.failed,
      })
    }
  }

  changeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  changeEmployeeTypes = event => {
    const {value, checked} = event.target
    this.setState(prevState => {
      const updatedList = checked
        ? [...prevState.selectedEmployeeTypes, value]
        : prevState.selectedEmployeeTypes.filter(item => item !== value)
      return {
        selectedEmployeeTypes: updatedList,
      }
    }, this.getJobsData)
  }

  changeSalary = val => {
    this.setState(
      {
        activeSalaryRange: val,
      },
      this.getJobsData,
    )
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="failure-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="failure-view-image"
          />
          <h1 className="failure-heading">No Jobs Found</h1>
          <p className="failure-paragraph">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-list">
        {jobsList.map(eachJob => (
          <JobItem key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
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

  renderAppropriateElement = () => {
    const {jobsLoading} = this.state
    switch (jobsLoading) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderJobsList()
      case apiStatus.failed:
        return this.renderFailureView()
      default:
        return <p>Default Executed</p>
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="left-sidebar">
            <ProfileItem />
            <hr className="horizontal-lines-jobs" />
            <p className="filter-headings-jobs">Type of Employment</p>
            <ul className="filter-lists">
              {employmentTypesList.map(eachEmploymentType => (
                <EmploymentTypeItem
                  key={eachEmploymentType.employmentTypeId}
                  itemDetails={eachEmploymentType}
                  changeEmployeeTypes={this.changeEmployeeTypes}
                />
              ))}
            </ul>
            <hr className="horizontal-lines-jobs" />
            <p className="filter-headings-jobs">Salary Range</p>
            <ul className="filter-lists">
              {salaryRangesList.map(eachSalaryRange => (
                <SalaryRangeItem
                  key={eachSalaryRange.salaryRangeId}
                  itemDetails={eachSalaryRange}
                  changeSalary={this.changeSalary}
                />
              ))}
            </ul>
          </div>
          <div className="right-content-container">
            <div className="search-input-container">
              <input
                className="search-input-element"
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.changeSearchInput}
              />
              <button
                type="button"
                className="search-btn"
                data-testid="searchButton"
                onClick={this.getJobsData}
              >
                <IoSearchOutline />
              </button>
            </div>
            {this.renderAppropriateElement()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
