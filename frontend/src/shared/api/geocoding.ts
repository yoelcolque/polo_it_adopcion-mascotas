const OPENCAGE_API_KEY = '5a577bdbab6d4545b756460bce677c34';   // CUIDADO! esta es mi api key => deberia crearse un .env (para facilitar desarrollo lo puse aqui)

export const buscarCoordenadas = async (direccion: string) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        direccion
    )}&key=${OPENCAGE_API_KEY}&language=es&limit=1`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data?.results?.length) throw new Error("No se encontraron coordenadas");

    const { lat, lng } = data.results[0].geometry;
    return { lat, lon: lng };
};
