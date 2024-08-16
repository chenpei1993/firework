import Camera from "./Camera";
import ITerm from "./Iterm";
import System from "./System";

export default class Scene {
    private camera: Camera

    private iterms: ITerm[]

    private width: number
    private height: number

    constructor(camera: Camera,width : number, height: number) {
        this.camera = camera
        this.iterms = []
        this.width = width
        this.height = height
    }

    add(iterm: ITerm): void {
        this.iterms.push(iterm)
    }

    run(system: System): void {
        for(let iterm of this.iterms){
            iterm.run(system)
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        // ctx.clearRect(0, 0, this.width, this.height)
        ctx.rect(0, 0, this.width, this.height)
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fill()
        for(let iterm of this.iterms){
            iterm.draw(ctx, this.camera)
        }
    }

}