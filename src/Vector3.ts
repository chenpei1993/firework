import Point from "./Point";
import Vector4 from "./Vector4";

export default class Vector3 extends Point{

    constructor(x, y, z) {
        super(x, y, z);
    }

    public clone(): Vector3{
        return new Vector3(this.x, this.y, this.z);
    }

    subtract(point: Vector3): Vector3 {
        let x = this.x - point.x
        let y = this.y - point.y
        let z = this.z - point.z
        return new Vector3(x, y, z)
    }

    dot(point: Vector3): number {
        return this.x * point.x + this.y * point.y + this.z * point.z
    }

    normalize():Vector3 {
        const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z *  this.z)
        return new Vector3(this.x / length, this.y / length, this.z / length)
    }

    cross(point: Vector3): Vector3 {
        return new Vector3(
            this.y * point.z - this.z * point.y,
            this.z * point.x - this.x * point.z,
            this.x * point.y - this.y * point.x
        )
    }

    toVector4(): Vector4 {
        return new Vector4(this.x, this.y, this.z, 1);
    }
}