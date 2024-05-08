import { AxiosHeaders } from 'axios';

export interface IResponse<T> {
	status: number;
	data: T;
	statusText: string;
	headers: AxiosHeaders;
}
