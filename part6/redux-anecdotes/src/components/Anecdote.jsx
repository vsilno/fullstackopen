/* eslint-disable react/prop-types */

const Anecdote = ({ content, votes, handleClick}) => {
	return (
	<div>
		<div>
			{content}
		</div>
		<div>
			has {votes}
			<button onClick={handleClick}>vote</button>
		</div>
	</div>
	)
}

export default Anecdote