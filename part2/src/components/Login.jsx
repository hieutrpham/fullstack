import PropTypes from "prop-types"

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
                    <input type="password" value={password} onChange={pwChange}/> 
            </div>
            <button type="submit">login</button>
        </form>
        </>
    )
}

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    userChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    pwChange: PropTypes.func.isRequired
}

export default Login