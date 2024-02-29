import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeFilterId: languageFiltersData[0].id,
    reposList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchRepoData()
  }

  fetchRepoData = async () => {
    const {activeFilterId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({
        reposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <divm data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={50} width={50} />
    </divm>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositoryItem = () => {
    const {reposList} = this.state

    return (
      <ul className="repositories-list">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoryDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderRepository = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItem()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setActiveLanguageID = newFilterId => {
    this.setState({activeFilterId: newFilterId}, this.fetchRepoData)
  }

  renderLanguageItem = () => {
    const {activeFilterId} = this.state
    return (
      <div>
        <ul className="filters-list">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              isActive={eachLanguage.id === activeFilterId}
              filterData={eachLanguage}
              setActiveLanguageID={this.setActiveLanguageID}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageItem()}
          {this.renderRepository()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
