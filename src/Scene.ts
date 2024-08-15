import Camera from "./Camera";
import ITerm from "./Iterm";

export default class Scene {
    private camera: Camera;

    private iterms: ITerm[]

    constructor(camera: Camera) {
        this.camera = camera;
        this.iterms = []
    }

    add(iterm: ITerm): void {
        this.iterms.push(iterm)
    }

    draw(ctx: CanvasRenderingContext2D) {
        for(let iterm of this.iterms){
            iterm.draw(ctx, this.camera)
        }
    }

}