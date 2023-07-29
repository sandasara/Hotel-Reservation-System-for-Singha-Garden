import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children, ...rest}) => {
    // let {user} = useContext(AuthContext)
    console.log('pr')
    return(
        <Route {...rest}>{children}</Route>
    )
    // !user ? <Redirect to="/login" /> :   
}
 
export default PrivateRoute;