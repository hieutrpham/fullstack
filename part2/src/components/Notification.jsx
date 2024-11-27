export const Notification = ({message}) => {
    if (message===null) {return null}
    return (
        <div className='noti'>{message}</div>
    )
}

export const Error = ({message}) => {
    if (message===null) {return null}
    return (
        <div className='error'>{message}</div>
    )
}
