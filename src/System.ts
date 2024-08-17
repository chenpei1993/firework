export default class System {

    private _g: number
    private _time: number
    private static _run: boolean = true

    constructor(g: number, time: number) {
        this._g = g;
        this._time = time;
    }

    get g(): number {
        return this._g;
    }

    set g(value: number) {
        this._g = value;
    }

    get time(): number {
        return new Date().getTime()
    }

    set time(value: number) {
        this._time = value;
    }


    static get run(): boolean {
        return this._run;
    }

    static set run(value: boolean) {
        this._run = value;
    }
}