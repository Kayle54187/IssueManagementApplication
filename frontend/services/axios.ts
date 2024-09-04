import axios, { AxiosError, AxiosResponse } from "axios";

const baseInstance = axios.create({
	baseURL: "http://localhost:8000",
});

function baseRequestSuccessResponseInterceptor(response: AxiosResponse) {
	return response;
}

function baseRequestErrorResponseInterceptor(error: AxiosError) {
	const status = error.response?.status;
	const url = error.request.responseURL;

	if (status === 401) {
		console.log("401", url);
		window.location.href = "/sign-in";
	}
	return Promise.reject(error);
}

baseInstance.interceptors.response.use(
	baseRequestSuccessResponseInterceptor,
	baseRequestErrorResponseInterceptor
);

export { baseInstance };
