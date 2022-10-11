import React, { useRef, useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';


export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const navigation = useNavigate()
    const [ error, setError ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const { currentUser, updateEmail, updatePassword } = useAuth()

    function handleSubmit(e) {
        //デフォルト動作の停止(データ送信に伴い、ページがリロード・リフレッシュしないように制御)
        e.preventDefault()

        //パスワード一致の確認
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Failed to create an account")
        }

        //通信用配列
        const promises = []
        setLoading(true)
        setError("")

        //既存Emailと編集後のEmailが異なる際にPromiseに編集後のEmailを追加
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        //パスワードが入力されると、Promiseにパスワードを追加
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        //引数に指定した全てのPromiseを実行するメソッド
        Promise.all(promises)
            //Fullfield:成功すれば、ルートへ遷移
            .then(() => {
                navigation('/')
            })
            //Rejected:失敗した場合はアラートを表示
            .catch (() => {
                setError('Failed to update account')
            })
            //結果に問わず処理を継続:結果に問わずPromise処理が完了すれば、処理は終了
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
                        </Form.Group>

                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirm</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                        </Form.Group>

                        <br></br>

                        <Button disabled={loading} className="w-100" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            
            <div className='w-100 text-center mt-2'>
                <Link to="/">Cancel</Link>
            </div>
        </>
    )
}