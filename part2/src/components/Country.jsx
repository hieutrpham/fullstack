export default function Country ({country}) {

    if  (Object.entries(country).length>0) {
      return (
      <>
        <h2>{country.name.common}</h2>

        Capital {country.capital}
        <br/>
        Area: {country.area}

        <h2>Languages</h2>  

        {Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
      </>
    )
  }
  }
  