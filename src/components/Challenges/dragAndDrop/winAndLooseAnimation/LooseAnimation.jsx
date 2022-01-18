import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import "./LooseAnimation.css";





const LooseAnimation = () => {
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
        const renderer = new THREE.WebGLRenderer({ antialias: true });
			//import model
			const fbxLoader = new FBXLoader();
			
			let mixer = null;

			fbxLoader.load("/src/components/static/models/Clapp.fbx", (boy) => {
				mixer = new THREE.AnimationMixer(boy);
				const action = mixer.clipAction(boy.animations[1]);
				action.play();
				boy.scale.set(0.01, 0.01, 0.01);
				scene.add(boy);
				
			});

			// let mixer1 = null;
			// fbxLoader.load("/src/components/static/models/Clapping.fbx", (boy) => {
			// 	mixer = new THREE.AnimationMixer(boy);
			// 	const action = mixer.clipAction(boy.animations[1]);
			// 	action.play();
			// 	boy.scale.set(0.01, 0.01, 0.01);
			// 	scene.add(boy);
				
			// });



        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff });
        // const cube = new THREE.Mesh(geometry, material);
        camera.position.z = 4;
        // scene.add(cube);
        renderer.setClearColor("white");
        renderer.setSize(width, height);
		
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

		
			renderer.render(scene, camera);
			window.requestAnimationFrame(tick);
			controls.update();
		};
		tick();
      
    }, []);
 
    return (
        <div
            className='loose-animation'
            ref={mount}
            onClick={() => setAnimating(!isAnimating)}
        />
    );
};
export default LooseAnimation;