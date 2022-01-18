import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import "./WinAnimation.css";





const WinAnimation = () => {
    const { useRef, useEffect, useState } = React;
    const mount = useRef(null);
    const [isAnimating, setAnimating] = useState(true);
    
    useEffect(() => {
        let width =800;
        let height = 600;  
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
		camera.position.set(0,2,0)
        const renderer = new THREE.WebGLRenderer({ antialias: true });
			//import model
			const fbxLoader = new FBXLoader();
			
			let mixer = null;

			fbxLoader.load("/src/components/static/models/Clapp.fbx", (boy) => {
				mixer = new THREE.AnimationMixer(boy);
				const action = mixer.clipAction(boy.animations[1]);
				action.play();
				boy.scale.set(0.01, 0.01, 0.01)
				boy.position.set(2,0,0);
				boy.rotateY(-Math.PI/6)
				scene.add(boy);
				
			});

			let mixer1 = null;
			fbxLoader.load("/src/components/static/models/Standing Clap.fbx", (girl) => {
				mixer1 = new THREE.AnimationMixer(girl);
				const action = mixer1.clipAction(girl.animations[0]);
				action.play();
				girl.scale.set(0.015, 0.015, 0.015);
				girl.position.set(-2,0,0)
				girl.rotateY(Math.PI/6)
				scene.add(girl);
				
			});



        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff });
        const cube = new THREE.Mesh(geometry, material);
        camera.position.z = 4;
		cube.position.set(-2,0.2,-0.1)
        scene.add(cube);
		cube.rotateY(Math.PI/6)
        renderer.setClearColor("white");
        renderer.setSize(width, height);

		const loader = new FontLoader();
		loader.load('/src/components/static/models/helvetiker_bold.typeface.json', function ( font ) {
			console.log(font);
			const textGeo = new TextGeometry( "Congratulation", {

				font: font,

				size: 0.60,
				height: 0.2,
				curveSegments: 2,
				bevelThickness: 0.002,
				bevelSize: 0.05,

			} );

			
			

			const textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 ,specular: 0xffffff} );

			const mesh = new THREE.Mesh( textGeo, textMaterial );
			mesh.castShadow = true;
					mesh.receiveShadow = true;
					mesh.position.set(-3,-2,0)
					mesh.rotation.set(-0.5,0,0)

					scene.add( mesh );
		})


		
		const light = new THREE.AmbientLight( 0x404040,4 ); // soft white light
scene.add( light );
      
        const handleResize = () => {
            width = mount.current.clientWidth;
            height = mount.current.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderScene();
        };
     
      
        mount.current.appendChild(renderer.domElement);
        window.addEventListener("resize", handleResize);
        
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.update();
		const clock = new THREE.Clock();
		var oldElapsedTime = 0;
		const tick = () => {
			const elapsedTime = clock.getElapsedTime();
			var deltaTime = elapsedTime - oldElapsedTime;
			oldElapsedTime = elapsedTime;
			if (mixer) {
				mixer.update(deltaTime);
			}
			if (mixer1) {
				mixer1.update(deltaTime);
			}

		
			renderer.render(scene, camera);
			window.requestAnimationFrame(tick);
			controls.update();
		};
		tick();
      
    }, []);
 
    return (
        <div
            className='win-animation'
            ref={mount}
            onClick={() => setAnimating(!isAnimating)}
        />
    );
};
export default WinAnimation;