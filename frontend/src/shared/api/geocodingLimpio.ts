const OPENCAGE_API_KEY = '5a577bdbab6d4545b756460bce677c34';

export const obtenerGeocodificacionLimpia = async (direccion: string) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        direccion
    )}&key=${OPENCAGE_API_KEY}&language=es&limit=1`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data?.results?.length) {
        throw new Error('No se encontraron coordenadas para la dirección proporcionada.');
    }

    const result = data.results[0];
    const { lat, lng } = result.geometry;
    const { components } = result;

    const direccionFormateada = [
        components.road,
        components.house_number,
        components.suburb || components.neighbourhood,
        components.city || components.town || components.village,
        components.state,
        components.country
    ]
        .filter(Boolean)
        .join(', ');

    return {
        latitud: lat,
        longitud: lng,
        direccion: direccionFormateada,
        codigo_postal: components.postcode || '',
        ciudad: components.city || components.town || components.village || '',
        barrio: components.neighbourhood || '',
        suburbio: components.suburb || '',
        provincia: components.state || '',
        pais: components.country || ''
    };
};
