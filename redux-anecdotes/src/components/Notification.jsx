import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(noti => noti.noti)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1, 
    margin: 30
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification