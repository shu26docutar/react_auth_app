import React from 'react';

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from './Dashboard';
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile";
import ForgetPassword from "./ForgetPassword";

import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//上記は動画とバージョンが異なるため注意!


function App() {
  return (
    <Container className="d-flex align-items-center
      justify-content-center"
      style={{minHeight: "100vh"}}
    >
    
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* childrenを使用した場合のpath */}
            {/* <Route path={`/`} element={
                                      <PrivateRoute>
                                        <Dashboard />
                                      </PrivateRoute>}
            />
            <Route path={`/update-profile`} element={
                                      <PrivateRoute>
                                        <UpdateProfile />
                                      </PrivateRoute>} 
            /> */}

            {/* Private Route */}
            {/* Outletを使用した場合のpath */}
            <Route path={`/`} element={<PrivateRoute />}>
              <Route path={`/`} element={<Dashboard />}/>
              <Route path={`/update-profile`} element={<UpdateProfile />}/>
            </Route>
            
            {/*Public Route*/}
            <Route path={`signup`} element={<Signup />} />
            <Route path={`login`} element={<Login />} />
            <Route path={`forget-password`} element={<ForgetPassword />} />

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
    </Container>
  )
}

export default App;