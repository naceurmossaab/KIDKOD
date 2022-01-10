import * as THREE from "three"
export default class Scene {
    // ...
    setup() {
        // Set Three components
        this.scene = new THREE.Scene()
        this.scene.fog = new THREE.Fog(0x202533, -1, 100)

        this.clock = new THREE.Clock()

        // Set options of our scene
        this.setCamera()
        this.setLights()
        this.setRender()

        this.addObjects()

        this.renderer.setAnimationLoop(() => { this.draw() })

    }

    setCamera() {
        const aspect = window.innerWidth / window.innerHeight
        const distance = 15

        this.camera = new THREE.OrthographicCamera(-distance * aspect, distance * aspect, distance, -distance, -1, 100)

        this.camera.position.set(-10, 10, 10)
        this.camera.lookAt(new THREE.Vector3())
    }

    draw() {
        this.renderer.render(this.scene, this.camera)
    }

    addObjects() {
        this.menu = new Menu(this.scene)
    }

    // ...
}