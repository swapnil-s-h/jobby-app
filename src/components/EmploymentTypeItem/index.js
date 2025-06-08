import './index.css'

const EmploymentTypeItem = props => {
  const {itemDetails, changeEmployeeTypes} = props
  const {label, employmentTypeId} = itemDetails
  const changeEmployeeType = event => {
    changeEmployeeTypes(event)
  }
  return (
    <li className="employment-type-item">
      <input
        className="employment-type-input-element"
        id={employmentTypeId}
        type="checkbox"
        value={employmentTypeId}
        onChange={changeEmployeeType}
      />
      <label className="employment-type-label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeItem
