/* eslint-disable react/prop-types */

const Filter = ({filter, setFilter}) => {
    return (
        <div>
            <label htmlFor="filter">filter shown with</label>
            <input id='filter' value={filter} onChange={({target}) => setFilter(target.value)} />
        </div>
    )
}

export default Filter