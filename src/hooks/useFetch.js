import { useState, useEffect } from "react";

async function fetchUri(uri, options, errorMessage) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${uri}`,
      options,
    );
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
) {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await fetchUri(uri, options, errorMessage);
      callback ? callback(fetchedData) : setData(fetchedData);
    }
    fetchData();
  }, []);

  return [data, setData];
}
