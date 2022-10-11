import React, { useRef, useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';


export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [ error, setError ] = useState("") 
    const [ loading, setLoading ] = useState(false)
    const navigation = useNavigate()

    async function handleSubmit(e) {
        //リロード・リフレッシュ制御
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Failed to create an account")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigation("/")
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirm</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>

                        <br></br>

                        <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            
            

            <div className='w-100 text-center mt-2'>
                Aleady have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}