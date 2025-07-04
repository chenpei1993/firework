import Platform from "./Platform";
import Scene from "./Scene";
import Camera from "./Camera";
import Vector3 from "./Vector3";
import System from "./System";
import FireworkGroup from "./FireworkGroup";


let fireEle = document.getElementById("fire") as HTMLAudioElement
fireEle.addEventListener("click", () => {
    fireEle.play()
})

let explodeEle = document.getElementById("explode") as HTMLAudioElement
explodeEle.addEventListener("click", () => {
    explodeEle.play()
})

let wrapper = document.getElementById("wrapper") as HTMLElement
let canvas = document.createElement("canvas")
let box = wrapper.getBoundingClientRect();
canvas.width = box.width
canvas.height = box.height

wrapper.appendChild(canvas)
let ctx = canvas.getContext("2d")
if(!ctx){
    throw new Error("ctx not found");
}

let camera = new Camera(new Vector3(0, 0, 300), new Vector3(0, 200, 0), 45, canvas.width, canvas.height, 1, 1000);
let scene = new Scene(camera, canvas.width, canvas.height)


let platform = new Platform(new Vector3(0, -50, 0), 20, 10)
scene.add(platform)

// let sphere = new Sphere(new Vector3(0, 150, 0))
// scene.add(sphere)

let system = new System(10, new Date().getTime())

let colors = ["#EA0000",
    "#0000C6",
    "#009393",
    "#96FED1",
    "#007500",
    "#B7FF4A",
    "#737300",
    "#FFE4CA",
    "#844200",
    "#7E3D76",
    "#A5A552",
    "#4B0091",
    "#FFE153",
    "#E1E100",
    "#7E3D76"]
let fireworkGroup = new FireworkGroup(4, colors, 3, 60, 65, -50, -50, 100, 100, -50, fireEle, explodeEle)
scene.add(fireworkGroup)

let cameraStep = 0.3 / 180 * Math.PI
let step = 0.2 / 180 * Math.PI
const animate = () => {
    try{
        camera.rotateY(cameraStep)
        platform.rotateY(step)
        scene.run(system)
        scene.draw(ctx)
    }catch (e){
        console.error(e)
    }finally {
        window.requestAnimationFrame(animate)
    }
}


animate()


let startBtn = document.getElementById("confirmButton")
let modal = document.getElementById("myModal");
if(startBtn && modal){
    startBtn.addEventListener('click', (event) => {
        modal.style.display = "none"
    })
}

wrapper.addEventListener("click", (event) => {
    fireworkGroup.fill()
})

wrapper.addEventListener('wheel', (event) => {
    event.preventDefault(); // 防止默认的滚动行为

    if (event.deltaY > 0) {
        // 向下滚动，缩小
        camera.zoomOut()
    } else {
        // 向上滚动，放大
        camera.zoomIn()
    }
})




