// Write your code here
import './index.css'

const STARS_ICON =
  'https://assets.ccbp.in/frontend/react-js/stars-count-img.png'
const FORKS_ICON =
  'https://assets.ccbp.in/frontend/react-js/forks-count-img.png'
const OPEN_ISSUES_ICON =
  'https://assets.ccbp.in/frontend/react-js/issues-count-img.png'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,

    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <div>
      <li className="repository-item">
        <img src={avatarUrl} alt={name} className="repository-image" />
        <h1 className="repository-name">{name}</h1>
        <div className="stats-container">
          <img src={STARS_ICON} alt="stars" className="stats-icon" />
          <p className="stats-text">{starsCount} stars</p>
        </div>
        <div className="stats-container">
          <img src={FORKS_ICON} alt="forks" className="stats-icon" />
          <p className="stats-text">{forksCount} forks</p>
        </div>
        <div className="stats-container">
          <img
            src={OPEN_ISSUES_ICON}
            alt="open issues"
            className="stats-icon"
          />
          <p className="stats-text">{issuesCount} open issues</p>
        </div>
      </li>
    </div>
  )
}
export default RepositoryItem
