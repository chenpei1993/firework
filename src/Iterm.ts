import Camera from "./Camera";
import System from "./System";

export default interface ITerm {
    run(system: System):void
    draw(ctx: CanvasRenderingContext2D, camera: Camera): void
}