import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <div className="skill-item-container">
      <img className="skill-image" src={imageUrl} alt={name} />
      <p className="skill-name">{name}</p>
    </div>
  )
}

export default SkillItem
