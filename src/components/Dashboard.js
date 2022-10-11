import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";


export default function Dashboard() {
    const navigation = useNavigate()
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()

    //Logout処理
    async function handleLogout() {
        setError("")

        //問題がない場合
        try {
            //LogOutが完了していなくても、結果を待たずにLogInページへ遷移する
            await logout()
            navigation('/login')
        } 
        //問題が発生した場合
        catch {
            setError('Failed to log out')
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <strong>Email:</strong> {currentUser.email}

                    <Link to="/update-profile" className="btn btn-primary w-100 mt-4">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>

            <div className='w-100 text-center mt-2'>
                <Button variant="link" onClick={handleLogout}>Log out</Button>
            </div>
        </>
    )
}