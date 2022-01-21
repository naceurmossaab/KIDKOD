


import "./LooseAnimation.css";
import React from "react";
import * as THREE from "three";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import C from "cannon";




const LooseAnimation = () => {

    const { useRef, useEffect, useState } = React;
    const mount = useRef(null);
    const [isAnimating, setAnimating] = useState(true);
    const controls = useRef(null);
  
    useEffect(() => {
      let width = mount.current.clientWidth;
      let height = mount.current.clientHeight;
  
      const scene = new THREE.Scene();
      // const camera = new THREE.PerspectiveCamera(
      // 	75,
      // 	width / height,
      // 	0.1,
      // 	1000
      // );
      // scene.fog = new THREE.Fog(0x202533, -1, 100)
  
      const clock = new THREE.Clock();
      ///camera
      const aspect = width / height;
      const distance = 15;
  
      // const axe = new THREE.AxesHelper(10);
      // scene.add(axe);
      const camera = new THREE.OrthographicCamera(
        -distance * aspect,
        distance * aspect,
        distance,
        -distance,
        -1,
        100
      );
  
      camera.position.set(-10, 10, 10);
      camera.lookAt(new THREE.Vector3());
      /////light
      const ambient = new THREE.AmbientLight(0xcccccc);
      scene.add(ambient);
  
      const foreLight = new THREE.DirectionalLight(0xffffff, 0.5);
      foreLight.position.set(5, 5, 20);
      scene.add(foreLight);
  
      const backLight = new THREE.DirectionalLight(0xffffff, 1);
      backLight.position.set(-5, -5, -10);
      scene.add(backLight);
  
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      // const geometry = new THREE.BoxGeometry(1, 1, 1);
      // const material = new THREE.MeshBasicMaterial({ color: 0x00ff });
      // const cube = new THREE.Mesh(geometry, material);
  
      // camera.position.z = 4;
      // scene.add(cube);
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
  
      ///letter mesh creation
      // DOM elements
      const $navItems = document.querySelectorAll(".mainNav a");
  
      const loader = new FontLoader();
  
      const wordss = [];
      const fontURL =
        "/src/components/static/models/helvetiker_bold.typeface.json";
  
      // It will calculate the Y offset between each element.
      const margin = 6;
      // And constant is to keep the same total mass on each word. We don't want a small word to be lighter than the others.
      const totalMass = 1;
  
      const offset = $navItems.length * margin * 0.5;
      loader.load(fontURL, (f) => {
        setup(f);
      });
  
      var setup = (f) => {
        // These options give us a more candy-ish render on the font
        const fontOption = {
          font: f,
          size: 3,
          height: 0.3,
          curveSegments: 24,
          bevelEnabled: true,
          bevelThickness: 0.9,
          bevelSize: 0.3,
          bevelOffset: 0,
          bevelSegments: 10,
        };
        const getOffsetY = (i) => {
          return ($navItems.length - i - 1) * margin - offset;
        };
  
        // For each element in the menu...
        Array.from($navItems)
          .reverse()
          .forEach(($item, i) => {
            // ... get the text ...
            const { innerText } = $item;
  
            const words = new THREE.Group();
            words.letterOff = 0;
            words.ground = new C.Body({
              mass: 0,
              shape: new C.Box(new C.Vec3(50, 0.1, 50)),
              position: new C.Vec3(0, i * margin - offset, 0),
            });
  
            world.addBody(words.ground);
            // ... and parse each letter to generate a mesh
            Array.from(innerText).forEach((letter, j) => {
              const material = new THREE.MeshPhongMaterial({ color: 0x97df5e });
              const geometry = new TextGeometry(letter, fontOption);
              geometry.computeBoundingBox();
              geometry.computeBoundingSphere();
  
              const mesh = new THREE.Mesh(geometry, material);
              // Get size of our entire mesh
              mesh.size = mesh.geometry.boundingBox.getSize(new THREE.Vector3());
              // We'll use accumulator to get the offset of each letter. Notice that is not perfect because each character of each font has specific kerning.
              words.letterOff += mesh.size.x;
              // Create the shape of our letter
              // Note that we need to scale down our geometry because of Box's Cannon.js class setup
              const box = new C.Box(new C.Vec3().copy(mesh.size).scale(0.5));
              mesh.body = new C.Body({
                // We divide the totalmass by the length of the string to have a common weight for each words.
                mass: totalMass / innerText.length,
                position: new C.Vec3(words.letterOff, getOffsetY(i), 0),
              });
              const { center } = mesh.geometry.boundingSphere;
              mesh.body.addShape(box, new C.Vec3(center.x, center.y, center.z));
              // Add the body to our world
              world.addBody(mesh.body);
              words.add(mesh);
              // console.log(words);
            });
            // Recenter each body based on the whole string.
            words.children.forEach((letter) => {
              letter.body.position.x -= letter.size.x + words.letterOff * 0.5;
            });
  
            wordss.push(words);
            wordss.forEach((word, j) => {
              for (let i = 0; i < word.children.length; i++) {
                const letter = word.children[i];
  
                letter.position.copy(letter.body.position);
                letter.quaternion.copy(letter.body.quaternion);
              }
            });
            scene.add(words);
          });
  
        renderScene();
        // console.log(wordss);
  
        // A new constant for our global force on click
        const force = 25;
        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
  
        // DEtecting the cursor position
        const onMouseMove = (event) => {
          // We set the normalized coordinate of the mouse
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
  
        // handel click eve,t with Raycaster
        const onClick = () => {
          // update the picking ray with the camera and mouse position
          raycaster.setFromCamera(mouse, camera);
  
          // calculate objects intersecting the picking ray
          // It will return an array with intersecting objects
          const intersects = raycaster.intersectObjects(scene.children, true);
  
          if (intersects.length > 0) {
            const obj = intersects[0];
            const { object, face } = obj;
  
            if (!object.isMesh) return;
  
            const impulse = new THREE.Vector3()
              .copy(face.normal)
              .negate()
              .multiplyScalar(force);
            // console.log(impulse);
            wordss.forEach((word, i) => {
              word.children.forEach((letter) => {
                const { body } = letter;
                if (letter !== object) return;
  
                // We apply the vector 'impulse' on the base of our body
                body.applyLocalImpulse(impulse, new C.Vec3());
  
                letter.position.copy(body.position);
                letter.quaternion.copy(body.quaternion);
                // console.log(letter.position);
                // window.requestAnimationFrame(onClick);
              });
            });
            // wordss.forEach((word) => {
            //   for (let i = 0; i < word.children.length; i++) {
            //   const letter = word.children[i];
  
            //   letter.position.copy(letter.body.position);
            //   letter.quaternion.copy(letter.body.quaternion);
            //   }
            // });
          }
        };
  
        // Bind events
        document.addEventListener("click", () => {
          onClick();
        });
        window.addEventListener("mousemove", (e) => {
          onMouseMove(e);
        });
      };
      // Init Physics world
      const world = new C.World();
      world.gravity.set(0, -50, 0);
  
      const update = () => {
        if (!wordss) return;
  
        wordss.forEach((word) => {
          for (let i = 0; i < word.children.length; i++) {
            const letter = word.children[i];
  
            letter.position.copy(letter.body.position);
            letter.quaternion.copy(letter.body.quaternion);
          }
        });
      };
  
      const updatePhysics = () => {
        update();
        world.step(1 / 60);
      };
  
      const draw = () => {
        updatePhysics();
        renderer.render(scene, camera);
      };
  
      renderer.setAnimationLoop(() => {
        draw();
        // setConstraints()
      });
  
      // set constraines to make the letter attached together
      // const setConstraints = () => {
      //   wordss.forEach((word) => {
      //     for (let i = 0; i < word.children.length; i++) {
      //       // We get the current letter and the next letter (if it's not the penultimate)
      //       const letter = word.children[i];
      //       const nextLetter =
      //         i === word.children.length - 1 ? null : word.children[i + 1];
  
      //       if (!nextLetter) continue;
  
      //       // I choosed ConeTwistConstraint because it's more rigid that other constraints and it goes well for my purpose
      //       const c = new C.ConeTwistConstraint(letter.body, nextLetter.body, {
      //         pivotA: new C.Vec3(letter.size.x, 0, 0),
      //         pivotB: new C.Vec3(0, 0, 0),
      //       });
  
      //       // Optionnal but it gives us a more realistic render in my opinion
      //       c.collideConnected = true;
  
      //       world.addConstraint(c);
      //     }
      //   });
      // };
      
  
      mount.current.appendChild(renderer.domElement);
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
        mount.current.removeChild(renderer.domElement);
      };
    }, []);
  
    return (
      <div>
        <div className="home3D" ref={mount}></div>
        <nav className="mainNav">
          <ul className="mainNav__list">
            <li className="mainNav__el">
              <a href="#" className="mainNav__link">
                Hard luck
              </a>
            </li>
            <li className="mainNav__el">
              <a href="#" className="mainNav__link">
                Try again
              </a>
            </li>
         
          </ul>
        </nav>
      </div>
    );


}
export default LooseAnimation;