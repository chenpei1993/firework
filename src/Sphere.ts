import Vector3 from "./Vector3";
import ITerm from "./Iterm";
import Camera from "./Camera";
import System from "./System";

export default class Sphere implements ITerm{
    private position: Vector3
    private points: Vector3[]

    constructor(position: Vector3) {
        this.position = position
        this.points = []

        let circlePointCount = 20
        let radius = 10
        let step = 2

        let angelStep = Math.PI * 2 / circlePointCount
        for (let i = -radius; i <= radius; i++) {
            let y = i;
            for (let j = 0; j < circlePointCount; j++) {
                let xzRadius = Math.sqrt(radius * radius - y * y)
                let xzAngel = j * angelStep
                let x = xzRadius * Math.cos(xzAngel)
                let z = xzRadius * Math.sin(xzAngel)
                console.log(x, y, z)
                this.points.push(
                    new Vector3(
                        this.position.x + x * step,
                        this.position.y + y * step,
                        this.position.z + z * step
                    )
                );
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
        console.log(this.points)
        for(let i = 0; i < this.points.length; i++){
            ctx.beginPath()
            let point = this.points[i];
            let p = camera.transform(point)
            if(!p){
                continue
            }
            ctx.arc(p.x, p.y, 1, 0, 2 * Math.PI);
            ctx.fill()
            ctx.closePath()
        }
    }

    run(system: System): void {
    }


}