import Camera from "./Camera";

export default interface ITerm {
    draw(ctx: CanvasRenderingContext2D, camera: Camera): void
}