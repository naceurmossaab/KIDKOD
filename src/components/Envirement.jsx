import React from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

const Envirement = () => {
	const { useRef, useEffect, useState } = React;
	const mount = useRef(null);
	const [isAnimating, setAnimating] = useState(true);
	const controls = useRef(null);

	useEffect(() => {
		let width = mount.current.clientWidth;
		let height = mount.current.clientHeight;
		let frameId;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			width / height,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff });
		const cube = new THREE.Mesh(geometry, material);

		const loader = new OBJLoader();
		const fbxLoader = new FBXLoader();
		// load a resource
		// loader.load(
		// 	// resource URL
		// 	"/src/components/static/models/fattree.obj",
		// 	// called when resource is loaded
		// 	function (object) {
		// 		console.log(object);
		// 		scene.add(object);
		// 	},
		// 	// called when loading is in progresses
		// 	function (xhr) {
		// 		console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
		// 	},
		// 	// called when loading has errors
		// 	function (error) {
		// 		console.log("An error happened");
		// 	}
		// );
		fbxLoader.load(
			// resource URL
			"/src/components/static/models/Volkswagen.fbx",
			// called when resource is loaded
			function (object) {
				console.log(object);
				scene.add(object);
			},
			// called when loading is in progresses
			function (xhr) {
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
			},
			// called when loading has errors
			function (error) {
				console.log("An error happened");
			}
		);

		const light = new THREE.AmbientLight(0xffffff, 1);
		camera.position.z = 10;
		scene.add(cube);
		renderer.setClearColor("0x2929");
		renderer.setSize(width, height);

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

		const animate = () => {
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;

			renderScene();
			frameId = window.requestAnimationFrame(animate);
		};

		const start = () => {
			if (!frameId) {
				frameId = requestAnimationFrame(animate);
			}
		};

		const stop = () => {
			cancelAnimationFrame(frameId);
			frameId = null;
		};

		mount.current.appendChild(renderer.domElement);
		window.addEventListener("resize", handleResize);
		start();

		controls.current = { start, stop };

		return () => {
			stop();
			window.removeEventListener("resize", handleResize);
			mount.current.removeChild(renderer.domElement);

			scene.remove(cube);
			geometry.dispose();
			material.dispose();
		};
	}, []);

	useEffect(() => {
		if (isAnimating) {
			controls.current.start();
		} else {
			controls.current.stop();
		}
	}, [isAnimating]);

	return (
		<div
			className='vis'
			ref={mount}
			onClick={() => setAnimating(!isAnimating)}
		/>
	);
};

export default Envirement;
