import axios from "axios";

const baseUrl = "http://api.weatherapi.com/v1";

const apiKey = import.meta.env.VITE_API_KEY;

export const getWeather = async (lat, lon) => {
  try {
    const w = await axios.get(
      `${baseUrl}/current.json?key=${apiKey}&q=${lat},${lon}`
    );

    return w.data;
  } catch (error) {
    console.log(error);
  }
};
