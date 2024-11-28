export default function Country (props) {
  const c = props.country
  if  (Object.entries(c).length>0) {
    return (
    <>
      <h2>{c.name.common}</h2>

      Capital {c.capital}
      <br/>
      Area: {c.area}

      <h2>Languages</h2>  

      {Object.entries(c.languages).map(([key, value]) => <li key={key}>{value}</li>)}
    </>
  )
}
}
  