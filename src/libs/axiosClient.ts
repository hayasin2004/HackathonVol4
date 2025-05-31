import axios from 'axios';
import type {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from 'axios';
import type { ZodSchema } from 'zod';

const createAxiosError = (errorMessage: string, errorCode: number) => {
	const error = new Error(errorMessage) as Error & { errorCode: number };
	error.errorCode = errorCode;
	error.name = 'ApiError';
	return error;
};

// Axiosクライアントのインスタンスを作成
const createAxiosClient = (): AxiosInstance => {
	const client = axios.create();

	// 成功時のハンドラー
	const handleSuccess = (response: AxiosResponse) => response;

	// エラー時のハンドラー
	const handleError = (error: AxiosError): Promise<Error> => {
		const errorMessage =
			(error.response?.data as { errorMessage?: string })?.errorMessage ??
			error.message;
		const errorCode = error.response?.status ?? 500;
		return Promise.reject(createAxiosError(errorMessage, errorCode));
	};

	// インターセプターの設定
	client.interceptors.response.use(handleSuccess, handleError);

	return client;
};

const axiosClient = createAxiosClient();

// エラーハンドリングと Zod 検証 (任意)
const requestWithValidation = async <T>(
	request: Promise<AxiosResponse<T>>,
	zodSchema?: ZodSchema<T>,
): Promise<T> => {
	try {
		const response = await request;
		if (zodSchema) {
			const parsed = zodSchema.safeParse(response.data);
			if (!parsed.success) {
				console.error('Zod validation error:', parsed.error);
				throw createAxiosError('Validation failed', 500);
			}
			return parsed.data;
		}
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const axiosGet = async <T>(
	url: string,
	config?: AxiosRequestConfig,
	zodSchema?: ZodSchema<T>,
): Promise<T> => {
	return requestWithValidation(axiosClient.get<T>(url, config), zodSchema);
};

export const axiosPost = async <T, R>(
	url: string,
	data?: T,
	config?: AxiosRequestConfig,
	zodSchema?: ZodSchema<R>,
): Promise<R> => {
	return requestWithValidation(
		axiosClient.post<R>(url, data, config),
		zodSchema,
	);
};

export const axiosPatch = async <T, R>(
	url: string,
	data?: T,
	config?: AxiosRequestConfig,
	zodSchema?: ZodSchema<R>,
): Promise<R> => {
	return requestWithValidation(
		axiosClient.patch<R>(url, data, config),
		zodSchema,
	);
};

export const axiosPut = async <T, R>(
	url: string,
	data?: T,
	config?: AxiosRequestConfig,
	zodSchema?: ZodSchema<R>,
): Promise<R> => {
	return requestWithValidation(
		axiosClient.put<R>(url, data, config),
		zodSchema,
	);
};

export const axiosDelete = async <T>(
	url: string,
	config?: AxiosRequestConfig,
	zodSchema?: ZodSchema<T>,
): Promise<T> => {
	return requestWithValidation(axiosClient.post<T>(url, config), zodSchema);
};
