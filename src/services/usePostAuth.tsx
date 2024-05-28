import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface ErrorResponse {
  code: number;
  error: string;
  message: string;
}

interface UsePostAuthResult {
  isPosted: boolean;
  isPosting: boolean;
  error: ErrorResponse | null;
  error409: ErrorResponse | null;
}

export default function usePostAuth<T>(url: string, data: T, posted: boolean): UsePostAuthResult {
  const [isPosted, setIsPosted] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [error409, setError409] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    if (posted) {
      setIsPosting(true);
      setError(null);
      setError409(null);
      axios.post(url, data)
        .then(() => {
          setIsPosted(true);
        })
        .catch((err: AxiosError<ErrorResponse>) => {
          console.log(err)
          if (err.response?.status === 409) {
            setError409(err.response.data);
          } else {
            setError(err.response?.data?? { code: 500, error: "Internal server error", message: "An error occurred on our servers. Please try again later." });
          }
        })
        .finally(() => {
          setIsPosting(false);
        });
    }
  }, [posted, url, data]);

  return { isPosted, isPosting, error, error409 };
}