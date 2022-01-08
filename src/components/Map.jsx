import React from "react";
import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import CANNON from 'cannon'


const Vis = () => {
	const { useRef, useEffect, useState } = React;
	const mount = useRef(null);
	// const controls = useRef(null);

	useEffect(() => {


		// Sound
		const talk = new Audio("/src/components/static/Enregistrement.m4a");
		
		
			
		
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		// Scene
		const scene = new THREE.Scene();
		//Models
		const gltfLoader1 = new GLTFLoader();

		let mixer = null;
		let mixer1 = null;
		// Models
		const loader = new FBXLoader();
		loader.load(
			"/src/components/static/models/Look Around.fbx",
			function (object) {
				mixer1 = new THREE.AnimationMixer(object);

				const action = mixer1.clipAction(object.animations[0]);
				action.play();

				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.position.set(0, 0, 3);
				object.scale.set(0.007, 0.007, 0.007);
				scene.add(object);
			}
		);
		//house 2

		var mixer2 = null;
		const loaderG = new FBXLoader();
		loaderG.load(
			"/src/components/static/models/cottage.fbx",
			function (object) {
				object.position.set(-10, 0, 0);
				object.rotateY(-Math.PI / 2);
				object.scale.set(0.7, 0.7, 0.7);
				scene.add(object);
			}
		);

		//offroad car
		// loaderG.load(
		// 	"/src/components/static/models/offroadcar.fbx",
		// 	function (object) {
		// 		mixer2 = object;
		// 		object.position.copy(player.position);
		// 		// object.rotateY(-Math.PI/2)
		// 		object.scale.set(0.003, 0.003, 0.003);
		// 		scene.add(object);
		// 	}
		// );

		//texture
		const textureLoader = new THREE.TextureLoader();

		const doorColorTexture = textureLoader.load(
			"/src/components/static/textures/door/color.jpg"
		);
		const doorAlphaTexture = textureLoader.load(
			"/src/components/static/textures/door/alpha.jpg"
		);
		const doorAmbientOcclusionTexture = textureLoader.load(
			"/src/components/static/textures/door/ambientOcclusion.jpg"
		);
		const doorHeightTexture = textureLoader.load(
			"/src/components/static/textures/door/height.jpg"
		);
		const doorNormalTexture = textureLoader.load(
			"/src/components/static/textures/door/normal.jpg"
		);
		const doorMetalnessTexture = textureLoader.load(
			"/src/components/static/textures/door/metalness.jpg"
		);
		const doorRoughnessTexture = textureLoader.load(
			"/src/components/static/textures/door/roughness.jpg"
		);

		const bricksColorTexture = textureLoader.load(
			"/src/components/static/textures/bricks/color.jpg"
		);
		const bricksNormalTexture = textureLoader.load(
			"/src/components/static/textures/bricks/normal.jpg"
		);
		const bricksAmbientOcclusionexture = textureLoader.load(
			"/src/components/static/textures/bricks/ambientOcclusion.jpg"
		);
		const bricksRoughnessTexture = textureLoader.load(
			"/src/components/static/textures/bricks/roughness.jpg"
		);

		const grassColorTexture = textureLoader.load(
			"/src/components/static/textures/grass/color.jpg"
		);
		const grassNormalTexture = textureLoader.load(
			"/src/components/static/textures/grass/normal.jpg"
		);
		const grassAmbientOcclusionexture = textureLoader.load(
			"/src/components/static/textures/grass/ambientOcclusion.jpg"
		);
		const grassRoughnessTexture = textureLoader.load(
			"/src/components/static/textures/grass/roughness.jpg"
		);

		grassColorTexture.repeat.set(1000, 1000);
		grassNormalTexture.repeat.set(1000, 1000);
		grassAmbientOcclusionexture.repeat.set(1000, 1000);
		grassRoughnessTexture.repeat.set(1000, 1000);

		grassColorTexture.wrapT = THREE.RepeatWrapping;
		grassNormalTexture.wrapT = THREE.RepeatWrapping;
		grassAmbientOcclusionexture.wrapT = THREE.RepeatWrapping;
		grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

		grassColorTexture.wrapS = THREE.RepeatWrapping;
		grassNormalTexture.wrapS = THREE.RepeatWrapping;
		grassAmbientOcclusionexture.wrapS = THREE.RepeatWrapping;
		grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

		// Sky background
		var texture1 = new THREE.TextureLoader().load(
			"/src/components/static/sky.jpg"
		);
		scene.background = texture1;

		/**
		 * Object
		 */
		//house
		const house = new THREE.Group();
		scene.add(house);
		//walls
		const walls = new THREE.Mesh(
			new THREE.BoxBufferGeometry(4, 2.5, 4),
			new THREE.MeshStandardMaterial({
				map: bricksColorTexture,
				aoMap: bricksAmbientOcclusionexture,
				normalMap: bricksNormalTexture,
				roughnessMap: bricksRoughnessTexture,
			})
		);

		walls.geometry.setAttribute(
			"uv2",
			new THREE.Float32BufferAttribute(
				walls.geometry.attributes.uv.array,
				2
			)
		); //for aoMap to work
		walls.position.y = 1.25;
		house.add(walls);
		//roof
		const roof = new THREE.Mesh(
			new THREE.ConeBufferGeometry(3.5, 1, 4),
			new THREE.MeshStandardMaterial({ color: "#b35f45" })
		);
		roof.position.y = 3;
		roof.rotation.y = Math.PI / 4;
		house.add(roof);

		//floor
		const floor = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(1000, 1000),
			new THREE.MeshStandardMaterial({
				map: grassColorTexture,
				aoMap: grassAmbientOcclusionexture,
				normalMap: grassNormalTexture,
				roughnessMap: grassRoughnessTexture,
			})
		);
		floor.geometry.setAttribute(
			"uv2",
			new THREE.Float32BufferAttribute(
				floor.geometry.attributes.uv.array,
				2
			)
		); //for aoMap to work

		floor.rotation.x = -Math.PI / 2;
		floor.position.y = 0;
		scene.add(floor);

		//door
		const door = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(2.2, 2.2, 1000, 1000),
			new THREE.MeshStandardMaterial({
				map: doorColorTexture,
				transparent: true,
				alphaMap: doorAlphaTexture,
				aoMap: doorAmbientOcclusionTexture,
				displacementMap: doorHeightTexture,
				displacementScale: 0.1,
				normalMap: doorNormalTexture,
				metalnessMap: doorMetalnessTexture,
				roughnessMap: doorRoughnessTexture,
			})
		);
		door.geometry.setAttribute(
			"uv2",
			new THREE.Float32BufferAttribute(
				door.geometry.attributes.uv.array,
				2
			)
		);
		door.position.z = 2.001;
		door.position.y = 1;
		house.add(door);

		//bushes
		const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
		const bushMatrial = new THREE.MeshStandardMaterial({
			color: "#89c854",
		});
		const bush1 = new THREE.Mesh(bushGeometry, bushMatrial);
		bush1.scale.set(0.5, 0.5, 0.5);
		bush1.position.set(0.8, 0.2, 2.2);
		const bush2 = new THREE.Mesh(bushGeometry, bushMatrial);
		bush2.scale.set(0.25, 0.25, 0.25);
		bush2.position.set(1.4, 0.1, 2.1);
		const bush3 = new THREE.Mesh(bushGeometry, bushMatrial);
		bush3.scale.set(0.4, 0.4, 0.4);
		bush3.position.set(-0.8, 0.1, 2.2);
		const bush4 = new THREE.Mesh(bushGeometry, bushMatrial);
		bush4.scale.set(0.15, 0.15, 0.15);
		bush4.position.set(-1, 0.05, 2.6);

		house.add(bush1, bush2, bush3, bush4);

		const house1 = new THREE.Group();
		house1.copy(house);
		house1.position.set(10, 0, 0);
		scene.add(house1);

		const house2 = new THREE.Group();
		house2.copy(house);
		house2.position.set(20, 0, 0);
		scene.add(house2);

		const house3 = new THREE.Group();
		house3.copy(house);
		house3.position.set(30, 0, 0);
		scene.add(house3);

		/**
		 * Sizes
		 */
		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		window.addEventListener("resize", () => {
			// Update sizes
			sizes.width = window.innerWidth;
			sizes.height = window.innerHeight;

			// Update camera
			camera.aspect = sizes.width / sizes.height;
			camera.updateProjectionMatrix();

			// Update renderer
			renderer.setSize(sizes.width, sizes.height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		});

		//light

		////////ambiant
		const light = new THREE.AmbientLight("#b9d5ff", 1);

		/////////directionnal
		const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
		moonLight.position.set(4, 5, -2);
		scene.add(light, moonLight);

		//////doorlight
		const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
		doorLight.position.set(0, 2.2, 2.7);
		house.add(doorLight);

		//Ghosts

		const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
		const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
		const ghost3 = new THREE.PointLight("#ffff00", 2, 3);
		scene.add(ghost1, ghost2, ghost3);

		//player
		// const playerGeometry = new THREE.BoxBufferGeometry(0.2, 0.2, 0.4);
		// const playerMatrial = new THREE.MeshStandardMaterial({
		// 	color: "#89c854",
		// });
		// const player = new THREE.Mesh(playerGeometry, playerMatrial);
		// player.position.set(0, 3, 10);
		// scene.add(player);

		// document.onkeydown = function (e) {
		// 	if (e.keyCode === 37) {
		// 		player.position.x -= 0.1;
		// 	} else if (e.keyCode === 39) {
		// 		player.position.x += 0.1;
		// 	} else if (e.keyCode === 38) {
		// 		player.position.z -= 0.1;
		// 	} else if (e.keyCode === 40) {
		// 		player.position.z += 0.1;
		// 	} else if (e.keyCode === 13) {
		// 		playsound();
		// 	}
		// };

	
		// Controls
		

		const horses = [];
		const storks = [];
		const flamingos = [];
		const parrots = [];
		mixer = new THREE.AnimationMixer(scene);
		function addMorph(
			mesh,
			clip,
			speed,
			duration,
			x,
			y,
			z,
			fudgeColor,
			type
		) {
			mesh = mesh.clone();
			mesh.material = mesh.material.clone();

			if (fudgeColor) {
				mesh.material.color.offsetHSL(
					0,
					Math.random() * 0.5 - 0.25,
					Math.random() * 0.5 - 0.25
				);
			}

			mesh.speed = speed;

			mixer
				.clipAction(clip, mesh)
				.setDuration(duration)
				// to shift the playback out of phase:
				.startAt(-duration * Math.random())
				.play();
			mesh.scale.set(0.01, 0.01, 0.01);
			mesh.position.set(x, y, z);
			mesh.rotation.y = Math.PI / 2;

			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add(mesh);
			if (type === "horses") horses.push(mesh);
			if (type === "flamingos") flamingos.push(mesh);
			if (type === "storks") storks.push(mesh);
			if (type === "parrots") parrots.push(mesh);
		}

		const gltfloader = new GLTFLoader();

		gltfloader.load(
			"/src/components/static/models/Horse.glb",
			function (gltf) {
				const mesh = gltf.scene.children[0];
				const clip = gltf.animations[0];

				addMorph(mesh, clip, 7, 1, 1, 0, -30, true, "horses");
				addMorph(mesh, clip, 7, 1, 8, 0, -30, true, "horses");
				addMorph(mesh, clip, 7, 1, 7, 0, -30, true, "horses");
				addMorph(mesh, clip, 7, 1, 3, 0, -30, true, "horses");
			}
		);

		gltfloader.load(
			"/src/components/static/models/Flamingo.glb",
			function (gltf) {
				const mesh = gltf.scene.children[0];
				const clip = gltf.animations[0];
				addMorph(mesh, clip, 7, 1, 4, 5, 3, true, "flamingos");
				addMorph(mesh, clip, 7, 1, 4, 5, 4, true, "flamingos");
				addMorph(mesh, clip, 7, 1, 4, 5.5, 5, true, "flamingos");
				addMorph(mesh, clip, 7, 1, 4, 6.4, 6, true, "flamingos");
				// addMorph( mesh, clip, 7, 1, 0, 6, 2,true );
				// addMorph( mesh, clip, 7, 1, 2, 7, 0.5,true );
			}
		);

		gltfloader.load(
			"/src/components/static/models/Stork.glb",
			function (gltf) {
				const mesh = gltf.scene.children[0];
				const clip = gltf.animations[0];
				addMorph(mesh, clip, 7, 1, 3, 5, 3, true, "storks");
				addMorph(mesh, clip, 7, 1, 4, 5, 3, true, "storks");
				addMorph(mesh, clip, 7, 1, 4, 5.5, 4, true, "storks");
				addMorph(mesh, clip, 7, 1, 4, 6, 5, true, "storks");
			}
		);

		gltfloader.load(
			"/src/components/static/models/Parrot.glb",
			function (gltf) {
				const mesh = gltf.scene.children[0];
				const clip = gltf.animations[0];
				addMorph(mesh, clip, 7, 1, 4, 5, 3, true, "parrots");
				addMorph(mesh, clip, 7, 1, 4, 5.5, 4, true, "parrots");
				addMorph(mesh, clip, 7, 1, 4, 6, 5, true, "parrots");
			}
		);

			//physics
			var world = new CANNON.World();
			world.broadphase = new CANNON.SAPBroadphase(world);
			world.gravity.set(0, -10, 0);
			world.defaultContactMaterial.friction = 10;
			var groundMaterial = new CANNON.Material('groundMaterial');
			var wheelMaterial = new CANNON.Material('wheelMaterial');
			var wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
				friction: 333,
				restitution: 0,
				contactEquationStiffness: 1000,
			});
			
			world.addContactMaterial(wheelGroundContactMaterial);
			
			// car physics body
			var chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.3, 2));
			var chassisBody = new CANNON.Body({mass: 150});
			chassisBody.addShape(chassisShape);
			chassisBody.position.set(0, 0.2, 0);
			chassisBody.angularVelocity.set(0, 0, 0); // initial velocity
			
			// car visual body
			var geometry = new THREE.BoxGeometry(1, 0.3, 2); // double chasis shape
			var material = new THREE.MeshBasicMaterial({color: 0xffff00});
			var box = new THREE.Mesh(geometry, material);
			scene.add(box);
			 
			// parent vehicle object
			var vehicle = new CANNON.RaycastVehicle({
			  chassisBody: chassisBody,
			  indexRightAxis: 0, // x
			  indexUpAxis: 1, // y
			  indexForwardAxis: 1, // z
			});
			
			// wheel options
			var options = {
			  radius: 0.4,
			  directionLocal: new CANNON.Vec3(0, -1, 0),
			  suspensionStiffness: 45,
			  suspensionRestLength: 0.4,
			  frictionSlip: 5,
			  dampingRelaxation: 2.3,
			  dampingCompression: 4.5,
			  maxSuspensionForce: 200000,
			  rollInfluence:  0.01,
			  axleLocal: new CANNON.Vec3(-1, 0, 0),
			  chassisConnectionPointLocal: new CANNON.Vec3(1, 2, 0),
			  maxSuspensionTravel: 0.25,
			  customSlidingRotationalSpeed: -30,
			  useCustomSlidingRotationalSpeed: true,
			};
			
			var axlewidth = 0.7;
			
			//positioning the wheels
			options.chassisConnectionPointLocal.set(axlewidth, 0, -1);
			vehicle.addWheel(options);
			
			options.chassisConnectionPointLocal.set(-axlewidth, 0, -1);
			vehicle.addWheel(options);
			
			options.chassisConnectionPointLocal.set(axlewidth, 0, 1);
			vehicle.addWheel(options);
			
			options.chassisConnectionPointLocal.set(-axlewidth, 0, 1);
			vehicle.addWheel(options);
			
			vehicle.addToWorld(world);
			
			// car wheels
			var wheelBodies = [],
				wheelVisuals = [];
			vehicle.wheelInfos.forEach(function(wheel) {
			  var shape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20);
			  var body = new CANNON.Body({mass: 1, material: wheelMaterial});
			  var q = new CANNON.Quaternion();
			  q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
			  body.addShape(shape, new CANNON.Vec3(), q);
			  wheelBodies.push(body);
			  // wheel visual body
			  var geometry = new THREE.CylinderGeometry( wheel.radius, wheel.radius, 0.4, 32 );
			  var material = new THREE.MeshPhongMaterial({
				color: 0xd0901d,
				emissive: 0xaa0000,
				side: THREE.DoubleSide,
				flatShading: true,
			  });
			  var cylinder = new THREE.Mesh(geometry, material);
			  cylinder.geometry.rotateZ(Math.PI/2);
			  wheelVisuals.push(cylinder);
			  scene.add(cylinder);
			});
			
			// update the wheels to match the physics
			world.addEventListener('postStep', function() {
			  for (var i=0; i<vehicle.wheelInfos.length; i++) {
				vehicle.updateWheelTransform(i);
				var t = vehicle.wheelInfos[i].worldTransform;
				// update wheel physics
				wheelBodies[i].position.copy(t.position);
				wheelBodies[i].quaternion.copy(t.quaternion);
				// update wheel visuals
				wheelVisuals[i].position.copy(t.position);
				wheelVisuals[i].quaternion.copy(t.quaternion);
			  }
			});

			const floorShape= new CANNON.Plane()
			const floorBody=new CANNON.Body()
			// floorBody.material=defaultMaterial
			floorBody.mass=0
			floorBody.addShape(floorShape)
			floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1,0,0),Math.PI/2)
			world.addBody(floorBody)
/**
* Main
**/

function updatePhysics() {
	world.step(1/60);
	// update the chassis position
	box.position.copy(chassisBody.position);
	box.quaternion.copy(chassisBody.quaternion);
  }

var musicStatus=false
function navigate(e) {
	if (e.type != 'keydown' && e.type != 'keyup') ;
	var keyup = e.type == 'keyup';
  
	//optionnal
	vehicle.setBrake(0, 2);
	vehicle.setBrake(0, 1);
	vehicle.setBrake(0, 2);
	vehicle.setBrake(0, 3);
  
	var engineForce = 100,
		maxSteerVal = 0.7;
	switch(e.keyCode) {
  
	  case 38: // forward
		vehicle.applyEngineForce(keyup ? 0 : -engineForce, 0);
		vehicle.applyEngineForce(keyup ? 0 : -engineForce, 0);
		if(musicStatus===false){
			var music=new Audio("/src/components/static/soundTruck.mp3")

			music.play()
			music.Loop=true
			musicStatus=true
			if(musicStatus===true){
				setTimeout(()=>{musicStatus=false},2222222)
			}
		}

	
		break;
  
	  case 40: // backward
		vehicle.applyEngineForce(keyup ? 0 : engineForce, 2);
		vehicle.applyEngineForce(keyup ? 0 : engineForce, 3);
		break;
  
	  case 39: // right
		vehicle.setSteeringValue(keyup ? 0 : -maxSteerVal, 2);
		vehicle.setSteeringValue(keyup ? 0 : -maxSteerVal, 3);
		break;
  
	  case 37: // left
		vehicle.setSteeringValue(keyup ? 0 : maxSteerVal, 2);
		vehicle.setSteeringValue(keyup ? 0 : maxSteerVal, 3);
		break;


	  // case 32:
	  //   // vehicle.applyEngineForce(keyup ? 0 : -50, 2);



	}
  
  }	
  window.addEventListener('keydown', navigate)
window.addEventListener('keyup', navigate)		
	/**
		 * Camera
		 */
		//third person camera
		var camera, goal;
		var test = 5; //camera disctance from the car
		var temp = new THREE.Vector3();
		camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			100
		);
		camera.position.set(0, test, -test);
		camera.lookAt(scene.position);
		goal = new THREE.Object3D();
		box.add( goal );
		goal.position.set(0, test, -test);
		
//truck



		/**
		 * Renderer
		 */

		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor("#cyan");

		//shadows
		renderer.shadowMap.enabled = true;
		moonLight.castShadow = true;
		doorLight.castShadow = true;
		ghost1.castShadow = true;
		ghost2.castShadow = true;
		ghost3.castShadow = true;

		walls.castShadow = true;
		bush1.castShadow = true;
		bush2.castShadow = true;
		bush3.castShadow = true;
		bush4.castShadow = true;
		floor.receiveShadow = true;

		/**
		 * Animate
		 */
		const clock = new THREE.Clock();
		var oldElaspsedTime = 0;
		const tick = () => {
			const elapsedTime = clock.getElapsedTime();
			var deltaTime = elapsedTime - oldElaspsedTime;
			oldElaspsedTime = elapsedTime;
			//update ghosts
			const ghost1Angle = elapsedTime * 0.5;
			ghost1.position.x = Math.cos(ghost1Angle) * 4;
			ghost1.position.z = Math.sin(ghost1Angle) * 4;
			ghost1.position.y = Math.sin(elapsedTime * 3);

			const ghost2Angle = -elapsedTime * 0.32;
			ghost2.position.x = Math.cos(ghost2Angle) * 5;
			ghost2.position.z = Math.sin(ghost2Angle) * 5;
			ghost2.position.y =
				Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

			const ghost3Angle = -elapsedTime * 0.18;
			ghost3.position.x =
				Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
			ghost3.position.z =
				Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
			ghost3.position.y =
				Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2);

			// if (mixer2) {
			// 	mixer2.position.copy(player.position);
			// }
	

			if (mixer) {
				mixer.update(deltaTime);
			}
			mixer.update(deltaTime);

			for (let i = 0; i < horses.length; i++) {
				const horse = horses[i];

				horse.position.x += horse.speed * deltaTime;

				if (horse.position.x > 200) {
					horse.position.x = -200;
				}
			}
			for (let i = 0; i < flamingos.length; i++) {
				const flamingo = flamingos[i];

				flamingo.position.x += flamingo.speed * deltaTime;

				if (flamingo.position.x > 80) {
					flamingo.position.x = -80;
				}
			}
			for (let i = 0; i < storks.length; i++) {
				const stork = storks[i];

				stork.position.x += stork.speed * deltaTime;
				stork.position.z = 5;

				if (stork.position.x > 150) {
					stork.position.x = -150;
				}
			}
			for (let i = 0; i < parrots.length; i++) {
				const parrot = parrots[i];

				parrot.position.x += parrot.speed * deltaTime;
				parrot.position.z = -5;

				if (parrot.position.x > 100) {
					parrot.position.x = -100;
				}
			}
			if (mixer1) {
				mixer1.update(deltaTime);
			}
			// Update controls
			renderer.clear();

			// Render
			renderer.render(scene, camera);
			temp.setFromMatrixPosition(goal.matrixWorld);
			camera.position.lerp(temp, 0.2);
			camera.lookAt(box.position);
			updatePhysics();
			// Call tick again on the next frame
			window.requestAnimationFrame(tick);
		};

		tick();

		mount.current.appendChild(renderer.domElement);
	}, []);

	return <div className='vis' ref={mount} />;
};

export default Vis;
