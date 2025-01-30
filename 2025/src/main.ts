import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { main } from "./midi";
import * as Tone from "tone";
import GUI from "lil-gui";

interface DemoOptions {
  velocity: number;
}

const withSound = true;
const synth = new Tone.Synth().toDestination();
let lastTime = Tone.now(); // Initialize lastTime to the current time

const _demoOptions: DemoOptions = {
  velocity: 0.5,
};

const config = {
  velocity: 0,
};

const gui = new GUI();
gui.add(document, "title");
gui.add(config, "velocity", 0.5, 10).name("Velocity");

gui.onChange((event) => {
  event.object; // object that was modified
  event.property; // string, name of property
  event.value; // new value of controller
  event.controller; // controller that was modified
  console.log(event);
  _demoOptions.velocity = event.value;
});

// read midi file


function addLine(
  position: THREE.Vector3,
  dimensions: THREE.Vector3,
  notes:any[],
  noteIdx: number,
  ppq:number
 
): THREE.Object3D {
  const color = new THREE.Color(Math.random(), Math.random(), Math.random());
  const geometry = new THREE.BoxGeometry(dimensions.x, 0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({ color: color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = position.x;
  mesh.position.y = position.y;
  mesh.position.z = position.z;

  // refactor
  // plat note
  if (withSound) {
    const note = notes[noteIdx];

    // Ensure that the start time is strictly greater than the last time
    //lastTime = Tone.now();
    const tempo = 8;
    const startTime = lastTime; // Add a small offset to avoid collision
    const noteDuration = note.durationTicks / (ppq * tempo);
    const endTime = startTime + noteDuration;

    // seconds of note
    synth.triggerAttack(note.name, startTime);  // Use startTime here
    synth.triggerRelease(startTime + endTime);
    synth.toSeconds();
    lastTime = endTime;
    lastTime = Tone.now();


    // Trigger attack and release events with correct timing
    //synth.triggerAttack(note.name, startTime);  // Use startTime here
    //const noteDuration = note.durationTicks ; // / (ppq / 1); // Convert ticks to seconds
    //synth.triggerRelease(startTime + noteDuration);  // Release the note based on startTime + duration
    //
    //console.log ( noteDuration )
    //
    //// Update lastTime to the current note's release time
    //lastTime = startTime + (noteDuration / 4); //+ note.durationTicks + 1;
    //lastTime = Tone.now() +1; // Initialize lastTime to the current time
  }

  return mesh;
}

async function visualization() {
  const { notes, ppq } = await main();

  console.log ( notes );
  let noteIdx = 0;
  const lineWidth = 4;
  const velocity = () => _demoOptions.velocity;
  const scene = new THREE.Scene();
  let meshes: THREE.Object3D[] = [];
  const temp = {
    width: 1024,
    height: 576,
  };
  let time = 0;

  const camera = new THREE.PerspectiveCamera(75, temp.width / temp.height);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(temp.width, temp.height);
  camera.position.x = 94;
  camera.position.y = 12;
  camera.position.z = -58;
  const objectsPositin = new THREE.Vector3();



  const _mesh = addLine(
    new THREE.Vector3(0, Math.random(), 0),
    new THREE.Vector3(lineWidth, 0, 0),
    notes,
    0,
    ppq
  );

  let lastMesh: { mesh?: THREE.Object3D; width: number; go?: boolean } = {
    go: false,
    width: lineWidth,
  };

  meshes.push(_mesh);
  scene.add(_mesh);
  lastMesh.mesh = _mesh;
  lastMesh.go = false;

  let angle = 0.0;

  function animate() {
    time += 1;
    objectsPositin.x = objectsPositin.x - velocity();

    for (let i = 0; i < meshes.length; i++) {
      meshes[i].position.x += -velocity();

      //meshes[i].position.y = position.y + objectsPositin.y;
      //meshes[i].position.z = position.z + objectsPositin.z;
    }

    if (meshes.length > 0 /*&& lastMesh?.go === false*/) {
      const offset = 220;

      if (
        lastMesh.mesh &&
        lastMesh.mesh.position.x < -lastMesh.width + offset &&
        notes[noteIdx]
      ) {
        // debug info
        //console.log(camera.position);

        //let _lineWidth = lineWidth  + Math.random() * 20;
        const note = notes[noteIdx++];

        let _lineWidth = note.ticks / 2;   

        const tempo = 8;
        //noteDuration 
         _lineWidth = (note.durationTicks / (ppq * tempo)) * 35;

        let heightLine = -20 + note.midi / 1;

        // offset of next line
        let _xx = _lineWidth - lastMesh.width;

        console.log("addline ")
        const _mesh = addLine(
          new THREE.Vector3(offset + _xx / 1, heightLine, 0),
          new THREE.Vector3(_lineWidth, 0, 0),
          notes,
          noteIdx - 1,
          ppq
        );

        //angle += 0.01;
        //lastMesh.go = true;
        //lastMesh.mesh.rotateX(angle)
        //lastMesh.mesh.rotateY(angle)

        meshes.push(_mesh);
        scene.add(_mesh);
        lastMesh.mesh = _mesh;
        //lastMesh.go = false;
        lastMesh.width = _lineWidth;
      }
    }

    renderer.render(scene, camera);
  }

  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  renderer.setAnimationLoop(animate);

  //renderer.render(scene, camera);
}

async function game() {
  const splashScreen = document.getElementById("splash-screen");
  const startGameBtn = document.getElementById("start-game-btn");

  startGameBtn?.addEventListener("click", () => {
    if (splashScreen) {
      splashScreen.style.display = "none"; // Hide splash screen
    }

    Tone.start();
    visualization()
  });

}

game();


