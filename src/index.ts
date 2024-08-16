import Platform from "./Platform";
import Scene from "./Scene";
import Camera from "./Camera";
import Vector3 from "./Vector3";
import Point from "./Point";
import Sphere from "./Sphere";
import System from "./System";
import Firework from "./Firework";
import * as domain from "node:domain";
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

let camera = new Camera(new Vector3(0, 0, 300), new Vector3(0, 50, 0), 45, canvas.width, canvas.height, 1, 1000);
let scene = new Scene(camera, canvas.width, canvas.height)


let platform = new Platform(new Vector3(0, -50, 0), 50, 5)
scene.add(platform)

// let sphere = new Sphere(new Vector3(0, 150, 0))
// scene.add(sphere)



// let firework = new Firework(new Vector3(0, -50, 0), 50, "red")
// scene.add(firework)
//
// let firework1 = new Firework(new Vector3(30, -50, 10), 60, "green")
// scene.add(firework1)

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
let fireworkGroup = new FireworkGroup(3, colors, 3, 50, 60, -100, -100, 200, 200, - 50, fireEle, explodeEle)
scene.add(fireworkGroup)

const animate = () => {
    scene.run(system)
    scene.draw(ctx)
    window.requestAnimationFrame(animate)
}

// alert("由于浏览器限制，请点击以播放音频")
animate()

window.addEventListener("click", e => {
    explodeEle.click()
})








// ctx.beginPath()
// ctx.moveTo(canvas.width / 2, 0)
// ctx.lineTo(canvas.width / 2, canvas.height)
// ctx.moveTo(0, canvas.height / 2)
// ctx.lineTo(canvas.width, canvas.height / 2)
// ctx.stroke()
// ctx.closePath()

