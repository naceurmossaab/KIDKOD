import React from "react";
import * as THREE from "three";
import "./WinAnimation.css";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const WinAnimation = () => {
	const { useRef, useEffect, useState } = React;
	const mount = useRef(null);
	const controls = useRef(null);

	useEffect(() => {
		let width = 800;
		let height = 600;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			width / height,
			0.1,
			1000
		);

		
		// const gltfLoder = new GLTFLoader();
		const fbxLoader = new FBXLoader();

		const renderer = new THREE.WebGLRenderer({ antialias: true });

		renderer.setClearColor("white");
		renderer.setSize(width, height);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.update();


		const renderScene = () => {
			renderer.render(scene, camera);
		};

		const handleResize = () => {
			width = mount.current.clientWidth;
			height = mount.current.clientHeight;
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderScene();
		};

		let mixer = null;

		fbxLoader.load("/src/components/static/models/Clapping.fbx", (fox) => {
			mixer = new THREE.AnimationMixer(fox);
			const action = mixer.clipAction(fox.animations[0]);
			action.play();
			fox.scale.set(0.01, 0.01, 0.01);
			scene.add(fox);
			console.log(fox);
		});

		const clock = new THREE.Clock();
		var oldElapsedTime = 0;

		

		const tick = () => {
			const elapsedTime = clock.getElapsedTime();
			var deltaTime = elapsedTime - oldElapsedTime;
			oldElapsedTime = elapsedTime;
			if (mixer) {
				mixer.update(deltaTime);
			}
			controls.update();
			renderer.render(scene, camera);
			window.requestAnimationFrame(tick);
		};
		tick();

		mount.current.appendChild(renderer.domElement);
		window.addEventListener("resize", handleResize);
	}, []);

	return <div className='win-animation' ref={mount} />;
};

export default WinAnimation;
