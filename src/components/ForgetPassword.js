import { Link } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Form, Button, Card, Alert } from 'react-bootstrap'


export default function ForgetPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [ error, setError ] = useState("") 
    const [ message, setMessage ] = useState("") 
    const [ loading, setLoading ] = useState(false)

    //非同期関数宣言
    async function handleSubmit(e) {
        //リロード・リフレッシュ制御
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check inbox for further instructions')
        } catch {
            setError("Failed to reset password")
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Reset Password</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        {message && <Alert variant='success'>{message}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} />
                        </Form.Group>

                        <br></br>

                        <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                    </Form>

                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
            
            <div className='w-100 text-center mt-2'>
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}