import './index.css'

const SalaryRangeItem = props => {
  const {itemDetails, changeSalary} = props
  const {label, salaryRangeId} = itemDetails
  const changeSalaryHandler = event => {
    changeSalary(event.target.value)
  }
  return (
    <li className="salary-range-item">
      <input
        className="salary-range-input-element"
        id={salaryRangeId}
        type="radio"
        value={salaryRangeId}
        name="salary"
        onChange={changeSalaryHandler}
      />
      <label className="salary-range-label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeItem
