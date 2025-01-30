import {useMousePosition} from '../../helpers/useMousePosition'
import './style.scss';
import { memo } from 'preact/compat';



export function Home() {

	//const mousePosition = useMousePosition();


	return (
		<div class="home">
			<div class="branding">
				<div class="__background">
                        <h3>Change color palette <a href="/resume">click here!</a></h3>
				</div>
				<div class="__content">
					<h2>Full Stack Developer</h2>
					<h1>Mutiitu</h1>
				</div>
			</div>

			<section>
			<Resource
					title="Monty Hall Problem Simulation"
					description="Charts and visualization"
					href="/resume"
				/>


				<Resource
					title="Búsqueda Semántica"
					description="Sentence Transformers"
					href="https://preactjs.com/tutorial"
				/>
				<Resource
					title="Differences to React"
					description="If you're coming from React, you may want to check out our docs to see where Preact differs"
					href="https://preactjs.com/guide/v10/differences-to-react"
				/>
				<Resource
					title="Simplificando el Desarrollo Web con HTMX"
					description="Un Enfoque KISS"
					href="https://vitejs.dev"
				/>

<Resource
					title="Simplificando el Desarrollo Web con HTMX"
					description="Un Enfoque KISS"
					href="https://vitejs.dev"
				/>
				<Resource
					title="Simplificando el Desarrollo Web con HTMX"
					description="Un Enfoque KISS"
					href="https://vitejs.dev"
				/>
				<Resource
					title="Simplificando el Desarrollo Web con HTMX"
					description="Un Enfoque KISS"
					href="https://vitejs.dev"
				/>
				<Resource
					title="Simplificando el Desarrollo Web con HTMX"
					description="Un Enfoque KISS"
					href="https://vitejs.dev"
				/>
				<Resource
					title="Simplificando el Desarrollo Web con HTMX"
					description="Un Enfoque KISS"
					href="https://vitejs.dev"
				/>
				<Resource
					title="Simplificando el Desarrollo Web con HTMX"
					description="Un Enfoque KISS"
					href="https://vitejs.dev"
				/>
			</section>

		</div>
	);
}

function Resource(props) {

	//const mousePosition = useMousePosition();


	return (
		<div class="resource">
			<a href={props.href} target="_blank">
				<h4>{props.title}</h4>
				<p>{props.description}</p>
			</a>
		</div>
	);
}


const aaa = memo(Resource)