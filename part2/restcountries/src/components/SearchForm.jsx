/* eslint-disable react/prop-types */

const SearchForm = ({search, handleSearch}) => {
    return (
        <form>
            <label htmlFor='search'>Search for countries </label>
            <input value={search} onChange={handleSearch} type='search' id='search' />
        </form>
    )
}

export default SearchForm