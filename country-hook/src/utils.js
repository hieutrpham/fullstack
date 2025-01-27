import axios from "axios";

export const getAllCountries = async () => {
  let data = [];
  await axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((res) => {
      const c = res.data.map((d) => d.name.common);
      data = data.concat(c);
    });

  return data;
};

// const data = getAllCountries();
// console.log(data);

// axios
//   .get("https://studies.cs.helsinki.fi/restcountries/api/all")
//   .then((res) => {
//     const data = res.data.map((d) => d.name.common);
//     console.log(data);
//   });
