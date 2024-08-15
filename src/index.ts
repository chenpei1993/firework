import Platform from "./Platform";
import Scene from "./Scene";
import Camera from "./Camera";
import Vector3 from "./Vector3";


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

let aspect = canvas.width / canvas.height;
let camera = new Camera(new Vector3(0, 10, 30), new Vector3(0, 0, 0), 45, aspect, 1, 1000);
let scene = new Scene(camera)


let platform = new Platform(new Vector3(0, 0, 0), 20, 5)
scene.add(platform)
scene.draw(ctx)

// let p = camera.transform(new Vector3(-45,0,100))
// if(p){
//     ctx.fillStyle = "red"
//     ctx.arc(p.x, p.y, 1, 0, 2 * Math.PI);
//     ctx.fill()
// }


// ctx.beginPath()
// ctx.moveTo(canvas.width / 2, 0)
// ctx.lineTo(canvas.width / 2, canvas.height)
// ctx.moveTo(0, canvas.height / 2)
// ctx.lineTo(canvas.width, canvas.height / 2)
// ctx.stroke()
// ctx.closePath()

