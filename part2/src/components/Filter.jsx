const Filter = (props) => {
    return (
        <>
        filter shown with: 
        <input value={props.filterValue} onChange={props.onChange} onKeyDown={props.onKeyDown}/>
        </>
    )
}

export default Filter