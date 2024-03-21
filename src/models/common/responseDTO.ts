export interface IResponse<T> {
    code: string;
    data: T;
    msg: string;
}
