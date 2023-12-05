import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

async function fetchUri(uri, options, errorMessage, router) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${uri}`,
      options,
    );
    if (response.status === 404) router.push("/404");
    const jsonData = await response.json();
    if (response.ok) {
      return jsonData;
    } else if (jsonData.errors?.length > 0) {
      data.errors.forEach((error) => {
        alert(error.message);
      });
    } else {
      console.error("something went wrong but we don't know what");
    }
  } catch (error) {
    errorMessage && console.error(`${errorMessage}: ${error}`);
  }
}

export default function useFetch(
  uri,
  options,
  { errorMessage = null, callback = null },
  dependecies = [],
) {
  const [data, setData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const fetchedData = await fetchUri(uri, options, errorMessage, router);
      callback && fetchedData ? callback(fetchedData) : setData(fetchedData);
    }
    fetchData();
  }, dependecies);

  return [data, setData];
}
