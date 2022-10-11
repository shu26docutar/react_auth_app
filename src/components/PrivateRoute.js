import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

//最終変更コード:Outletを使用した場合のコード
export default function PrivateRoute() {
    const { currentUser } = useAuth()

    return currentUser ? <Outlet /> : <Navigate to="/login" replace />
}

//YouTubeコード
// export default function PrivateRoute({ component: Component, ...rest }) {
//     const { currentUser } = useAuth()

//     return (
//         <Route
//             {...rest}
//             render={props => {
//                 return currentUser ? <Component {...props} /> : <Redirect to="/login" />
//             }}
//         ></Route>
//     )
// }


//YouTubeコード変更後:Childrenを使用した場合のコード
// export default function PrivateRoute({children}) {
//     const { currentUser } = useAuth() 

//     return  currentUser ? children : <Navigate to="/login" replace />
// }

