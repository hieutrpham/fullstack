export default function Country ({country}) {
    return (
      <>
        <h2>{country.name?.common}</h2>
        <div>
          {country.capital}
          {country.area}
          {Object.entries(country.languages).map(([key, value]) => {
              <li key={key}>{value}</li>
          })}
        </div>
      </>
    )
  }
  