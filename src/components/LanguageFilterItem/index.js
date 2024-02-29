import './index.css'

const LanguageFilterItem = props => {
  const {filterData, isActive, setActiveLanguageID} = props
  const {id, language} = filterData

  const buttonClassName = isActive
    ? 'filter-button active-filter'
    : 'filter-button'

  const onClickFilter = () => {
    setActiveLanguageID(id)
  }
  return (
    <button type="button" onClick={onClickFilter} className={buttonClassName}>
      {language}
    </button>
  )
}
export default LanguageFilterItem
