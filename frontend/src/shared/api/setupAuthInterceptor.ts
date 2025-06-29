import axiosInstance from './axios';

export const setupAuthInterceptor = (
  getAccessToken: () => string | null,
  refreshToken: () => Promise<string | null>
) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
