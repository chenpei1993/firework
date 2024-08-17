export default class LimitArray<T>{
    private size: number
    private arr: T[]

    constructor(size: number = 10) {
        this.size = size
        this.arr = []
    }

    push(t: T){
        this.arr.push(t)
        if(this.arr.length >= this.size){
            this.arr.shift()
        }
    }

    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.arr.length) {
                    return { value: this.arr[index++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            },
        };
    }


}