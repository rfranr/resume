import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.scss';
import { Resume } from './pages/Resume/index.js';
import "preact/debug";
import { options } from 'preact';

function applyColors() {
	// Modify Css var
	const root = document.documentElement;
    //root.style.setProperty('--secondary-theme-color-dark', 'black');
}


options.debounceRendering = (cb) => {
	requestAnimationFrame ( () => {
			requestIdleCallback(cb)
		})
}


export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/resume" component={Resume} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

if (typeof window !== 'undefined') {
	applyColors();

	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
