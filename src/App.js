import { useEffect, useState } from 'react';
import './App.css';
import * as Tone from 'tone'
import glassplanet from './glassplanet.wav'

function App() {

	const [data, setData] = useState(null);

	useEffect(() => {
		fetch('https://dummyjson.com/quotes/random')
			.then(response => response.json())
			.then(data => setData(data));
	}, []);

	function newQuote() {
		fetch('https://dummyjson.com/quotes/random')
			.then(response => response.json())
			.then(data => setData(data));
	}

	function play() {
		const r1 = Math.round(Math.random() * 200);
		const r2 = Math.random() * 1;
		const r3 = Math.random() * 0.56;
		console.log(r2)
		const player = new Tone.Player({
			url: glassplanet,
			autostart: true,
		});
		const filter = new Tone.Filter(r1, 'lowpass').toDestination();
		const feedbackDelay = new Tone.FeedbackDelay(r2, r3).toDestination();
		player.connect(filter);
		player.connect(feedbackDelay);
	}

	return (
		data === null ? <></> :
			<div id="quote-box" className='glow'>
				<h2 id="text">"{data.quote}"</h2>
				<p id="author"><em>{data.author}</em></p>
				<div className="d-grid gap-2 d-md-flex justify-content-md-start">
					<button type="button" className="btn btn-warning" id="new-quote" onClick={newQuote}>Get a quote</button>
					<button type="button" className="btn btn-secondary" id="play1" onClick={play}>Said by a whale</button>
					<button type="button" className="btn btn-info"><a id="tweet-quote" href='https://twitter.com/intent/tweet' target="_blank" rel="noopener noreferrer">Tweet</a></button>
				</div>
			</div>
	);
}

export default App;

