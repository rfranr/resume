import { Component, createRef } from "preact";

export class FortuneWheel extends Component<{title?:string}> {
    divElement = createRef<HTMLDivElement> ()


    
    constructor() {
        super();
    }

    componentDidMount() {
        console.log("component did mount");
        this.divElement.current.classList.add('animate__animated', 'animate__tada', 'resource__hover');
    }


    render() {
        return (
            <div ref={this.divElement}>

<div style="width: 0; height: 0; border-left: 50px solid transparent; 
            border-right: 50px solid transparent; 
            border-top: 50px solid green; margin: 2rem;">
</div>
                
                <p>{"HELLO"}</p>
            
                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="M100,100 L100,0 A100,100 0 0,1 180.71,19.29 Z" fill="red" stroke="black" stroke-width="2"/>
</svg>

            
            </div>

            
        );
    }
}