import { auth } from "../firebase";
import React, { createContext, useContext, useState, useEffect } from 'react';

//グローバルなステートを管理できるオブジェクト、Contextの器を作成
// Stateの値はPropsではなく、Contextで一元管理
const AuthContext = createContext()

//現状のユーザのステータスをGlobalStateで共有
//AuthContextから返される値を受け入れ、コンテキストの最も近いコンテキスト プロバイダーによって指定された、現在のコンテキスト値を返す
export function useAuth() {
    return useContext(AuthContext)
}

//Gobal State,引数のchildrenはこれを参照できるコンポーネント
export function AuthProvider( { children } ) {
    // ユーザステータス
    const [currentUser, setCurrentUser] = useState()
    // 実行中のステータス
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    } 

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    //レンダリング制御
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    // Global値
    const value = {
        login,
        signup,
        logout,
        currentUser,
        updateEmail,
        resetPassword,
        updatePassword
    }

    //Valueを返すことで、処理の結果を継承できる
    // AuthContext.ProviderコンポーネントでラップしたコンポーネントからContextで設定した値にアクセス、または更新ができる
    return (
        // value(Global値)というpropsを設定し、グローバルに管理する実際の値を渡すことでvalueの値が参照できる
        <AuthContext.Provider value={value}>
            {/* Global Stateを参照できるコンポーネント */}
            { !loading && children } 
        </AuthContext.Provider>
    )
}