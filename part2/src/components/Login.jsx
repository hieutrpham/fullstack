const Login = ({
    handleLogin, username, userChange,
    password, pwChange
}) => {
    return (
        <>
        <form onSubmit={handleLogin}>
            <div>
                username:
                    <input value={username} onChange={userChange}/>
            </div>

            <div>
                password:
                    <input value={password} onChange={pwChange}/> 
            </div>
            <button type="submit">login</button>
        </form>
        </>
    )
}

export default Login