async function getRival(name) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rivals/${name}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) return data;
    else console.log(data.message);
  } catch (error) {
    console.log(`Error al obtener problema: ${error.message}`);
  }
}

export default function TestMyRivalPage({ params }) { }
