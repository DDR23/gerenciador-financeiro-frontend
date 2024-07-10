import axios, { AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"

interface ErrorResponse {
  code: number;
  error: string;
  message: string;
}

interface UseGetResponse<T> {
  data: T | null;
  isGetting: boolean;
  error: ErrorResponse | null
}

interface UseGetOptions extends AxiosRequestConfig {}

export default function useGet<T>(url: string, options: UseGetOptions = {}, deps: any[] = []): UseGetResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isGetting, setIsGetting] = useState<boolean>(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    if (deps.every(dep => dep !== null && dep !== undefined)) {
      setIsGetting(true);
      axios.get(url, options)
        .then(res => {
          setData(res.data);
        })
        .catch(err => {
          setError(err.response.data);
        })
        .finally(() => {
          setIsGetting(false);
        });
    }
  }, deps);

  return { data, isGetting, error };
}