/* eslint-disable react/prop-types */

const CountryName = ({name, handleSearch}) => {
    return (
        <div>
            <span>{name}</span>
            <button value={name} onClick={handleSearch}>show</button>
        </div>
    )
}

export default CountryName