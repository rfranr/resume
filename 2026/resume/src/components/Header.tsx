import { useLocation } from 'preact-iso';
import { useMousePosition } from '../helpers/useMousePosition';

export function Header() {
	const { url } = useLocation();
	const {x,y} = useMousePosition();

	return (
		<header>
			<nav>
				{x} - {y}
				<a href="/" class={url == '/' && 'active'}>
					Home
				</a>
				<a href="/404" class={url == '/404' && 'active'}>
					404
				</a>
			</nav>
		</header>
	);
}
