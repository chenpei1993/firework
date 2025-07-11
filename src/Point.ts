export default class Point{
    private _x: number
    private _y: number
    private _z: number

    constructor(x, y, z) {
        this._x = x
        this._y = y
        this._z = z
    }


    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get z(): number {
        return this._z;
    }

    set z(value: number) {
        this._z = value;
    }


}