import axios, { Axios, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 覆寫 Axios 型別 AxiosResponse<T> => IResponse<T>
interface CustomAxios extends Axios {
	get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
	delete<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
	head<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
	options<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
	post<T = any, R = T, D = any>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>
	): Promise<R>;
	put<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
	patch<T = any, R = T, D = any>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>
	): Promise<R>;
}

// 建立 eBird Axios 實例
export const ebird = axios.create({
	baseURL: 'https://api.ebird.org/v2',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		Accept: 'application/json',
		'X-eBirdApiToken': import.meta.env.VITE_EBIRD_API_KEYGEN,
	},
	method: 'get',
	maxBodyLength: Infinity,
	timeout: 10000,
}) as CustomAxios;

// eBird 請求攔截器
ebird.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// 可以在這裡處理或修改請求參數
		return config;
	},
	(error) => {
		// 處理請求錯誤
		return Promise.reject(error);
	}
);

// eBird 響應攔截器
ebird.interceptors.response.use(
	(response: AxiosResponse) => {
		// 處理響應數據
		// 可以在這裡根據返回的狀態碼做一些統一處理
		if (response.status === 200) {
			// 假設200狀態碼表示請求成功
			return response.data; // 只返回數據部分
		}
		// 可以拋出一個錯誤，並在其他地方處理
		return Promise.reject(new Error('Request failed'));
	},
	(error) => {
		// 處理響應錯誤
		if (error.response && error.response.status === 401) {
			// 例如當401時表示未授權，可做特殊處理
			console.error('Unauthorized!');
		}
		return Promise.reject(error);
	}
);

// 建立 EmailJS Axios 實例
export const emailjs = axios.create({
	baseURL: 'https://api.emailjs.com/api',
	responseType: 'json',
	maxBodyLength: Infinity,
	timeout: 10000,
}) as CustomAxios;

// EmailJS 請求攔截器
emailjs.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// 可以在這裡處理或修改請求參數
		config.data = {
			...config.data,
			service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
			template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
			user_id: import.meta.env.VITE_EMAILJS_USER_ID,
			accessToken: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN,
		};
		return config;
	},
	(error) => {
		// 處理請求錯誤
		return Promise.reject(error);
	}
);

// EmailJS 響應攔截器
emailjs.interceptors.response.use(
	(response: AxiosResponse) => {
		// 處理響應數據
		// 可以在這裡根據返回的狀態碼做一些統一處理
		if (response.status === 200) {
			// 假設200狀態碼表示請求成功
			return response.data; // 只返回數據部分
		}
		// 可以拋出一個錯誤，並在其他地方處理
		return Promise.reject(new Error(response.data));
	},
	(error) => {
		// 處理響應錯誤
		if (error.response && error.response.status === 401) {
			// 例如當401時表示未授權，可做特殊處理
			console.error('Unauthorized!');
		}
		return Promise.reject(error);
	}
);

// 建立 Tomorrow.io Axios 實例
export const tomorrow = axios.create({
	baseURL: 'https://api.tomorrow.io/v4',
	responseType: 'json',
	maxBodyLength: Infinity,
	timeout: 10000,
}) as CustomAxios;

// Tomorrow.io 請求攔截器
tomorrow.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// 可以在這裡處理或修改請求參數
		config.params.apikey = import.meta.env.VITE_TOMORROW_API_KEY;
		return config;
	},
	(error) => {
		// 處理請求錯誤
		return Promise.reject(error);
	}
);

// Tomorrow.io 響應攔截器
tomorrow.interceptors.response.use(
	(response: AxiosResponse) => {
		// 處理響應數據
		// 可以在這裡根據返回的狀態碼做一些統一處理
		if (response.status === 200) {
			// 假設200狀態碼表示請求成功
			return response.data; // 只返回數據部分
		}
		// 可以拋出一個錯誤，並在其他地方處理
		return Promise.reject(new Error(response.data));
	},
	(error) => {
		// 處理響應錯誤
		if (error.response && error.response.status === 401) {
			// 例如當401時表示未授權，可做特殊處理
			console.error('Unauthorized!');
		}
		return Promise.reject(error);
	}
);

// 建立 SunriseSunset.io Axios 實例
export const sunriset = axios.create({
	baseURL: 'https://api.sunrisesunset.io',
	responseType: 'json',
	maxBodyLength: Infinity,
	timeout: 10000,
}) as CustomAxios;

// SunriseSunset.io 請求攔截器
sunriset.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// 可以在這裡處理或修改請求參數
		return config;
	},
	(error) => {
		// 處理請求錯誤
		return Promise.reject(error);
	}
);

// SunriseSunset.io 響應攔截器
sunriset.interceptors.response.use(
	(response: AxiosResponse) => {
		// 處理響應數據
		// 可以在這裡根據返回的狀態碼做一些統一處理
		if (response.status === 200) {
			// 假設200狀態碼表示請求成功
			return response.data; // 只返回數據部分
		}
		// 可以拋出一個錯誤，並在其他地方處理
		return Promise.reject(new Error('Request failed'));
	},
	(error) => {
		// 處理響應錯誤
		if (error.response && error.response.status === 401) {
			// 例如當401時表示未授權，可做特殊處理
			console.error('Unauthorized!');
		}
		return Promise.reject(error);
	}
);
