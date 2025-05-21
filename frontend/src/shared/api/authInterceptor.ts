// src/shared/api/authInterceptor.ts
import axiosInstance from './axios';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => (error ? prom.reject(error) : prom.resolve(token)));
    failedQueue = [];
};

export const setupAuthInterceptor = (
    getToken: () => string | null,
    refreshTokenFn: () => Promise<string | null>
) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token && config.headers) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response: any) => response,
        async (error: any) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const newToken = await refreshTokenFn();
                    if (!newToken) throw new Error('No refresh token result');

                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    processQueue(null, newToken);
                    return axiosInstance(originalRequest);
                } catch (err) {
                    processQueue(err, null);
                    localStorage.clear();
                    window.location.href = '/login';
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
};
