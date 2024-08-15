import Vector4 from "./Vector4";

export default class MatrixHelper {

    static  multiplyMatrices(A, B): Vector4 {
        let result : number[][] = []
        for (let i = 0; i < A.length; i++) {
            result[i] = [];
            for (let j = 0; j < B[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < B.length; k++) {
                    sum += A[i][k] * B[k][j];
                }
                result[i][j] = sum;
            }
        }
        return new Vector4(result[0][0],result[1][0],result[2][0],result[3][0]);
    }


}