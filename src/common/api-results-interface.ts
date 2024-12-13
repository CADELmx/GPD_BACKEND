export interface APIResult<T> {
    error: string | null;
    message: string;
    data: T;
}