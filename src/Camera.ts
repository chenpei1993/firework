import Point from "./Point";
import ITerm from "./Iterm";
import Vector3 from "./Vector3";
import Vector4 from "./Vector4";
import MatrixHelper from "./MatrixHelper";

export default class Camera {

    private position: Vector3
    private lookAt: Vector3
    private up: Vector3
    private fov: number
    private aspect: number
    private width: number
    private height: number
    private far: number
    private near: number



    constructor(position: Vector3, lookAt: Vector3, fov: number, width: number, height: number, near: number, far: number) {
        this.position = position
        this.lookAt = lookAt
        this.up = new Vector3(0, 1, 0)
        this.fov = fov
        this.aspect = width / height
        this.width = width
        this.height = height
        this.near = near
        this.far = far
    }

    public transform(point: Vector3) : Vector3 | null{
        let p = point.toVector4()
        p = this.viewTransform(p)
        p = this.projectionTransform(p)
        if(p.x > 1 || p.x < -1 || p.y > 1 || p.y < -1 || p.z >= 0 ){
            return null
        }
        p = this.canvasTransform(p)
        return new Vector3(p.x.toFixed(2), p.y.toFixed(2), p.z.toFixed(2))
    }


    viewTransform(p: Vector4): Vector4{
        let z0 = this.position.subtract(this.lookAt).normalize()
        let y0 = this.up.clone().normalize()
        let x0 = z0.cross(y0)

        let viewMatrix = [[x0.x, x0.y, x0.z, -x0.dot(this.position)],
            [y0.x , y0.y, y0.z, -y0.dot(this.position)],
            [z0.x , z0.y, z0.z, -z0.dot(this.position)],
            [0 , 0, 0, 1 ]]
        // console.log(viewMatrix)
        return MatrixHelper.multiplyMatrices(viewMatrix, p.toArray())
    }

    projectionTransform(p: Vector4) {
        let f = 1.0 / Math.tan(this.fov / 2);
        const rangeInv = 1.0 / (this.near - this.far);

        let projectionMatrix = [
            [f / this.aspect, 0, 0, 0],
            [0, f, 0, 0],
            [0, 0, -(this.far + this.near) * rangeInv, -2 * this.far * this.near * rangeInv],
            [0, 0, -1, 0]
        ]

        let v = MatrixHelper.multiplyMatrices(projectionMatrix, p.toArray())
        return new Vector4(v.x / v.w, v.y / v.w, v.z, v.w / v.w)

    }

    canvasTransform(p: Vector4):Vector4 {
        if(p.x == -0){
            p.x = 0
        }
        if(p.y == 0){
            p.y = 0
        }
        // console.log(p)
        let x = (p.x + 1) * this.width / 2
        let y = this.height - (p.y + 1) * this.height / 2
        return new Vector4(x, y, p.z, p.w)
    }

}