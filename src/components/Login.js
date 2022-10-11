import React, { useRef, useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const navigation = useNavigate()
    //Stateから返される値を配列分割代入。一つ目の要素はStateの現在の値、二つ目の要素はそれを更新するための関数*1
    const [ error, setError ] = useState("") 
    //第２引数に関しては、Boostrap標準の関数を入れている
    const [ loading, setLoading ] = useState(false)

    //非同期関数宣言
    async function handleSubmit(e) {
        //リロード・リフレッシュ制御
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            //API_KeyとEmail・Password共にAPI接続
            await login(emailRef.current.value, passwordRef.current.value)
            //上記の処理完了を待たずに下記の処理を実行、ルートはLogInが承認されていることを確認しViewを表示させる
            navigation("/")
        } catch {
            setError("Failed to log in")//現在の値:""から、ここに入力された文字列がアラートとして表示される。
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
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
                        
                        <br></br>
                        
                        <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                    </Form>

                    <div className="w-100 text-center mt-3">
                        <Link to="/forget-password">Forget Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            
            <div className='w-100 text-center mt-2'>
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}