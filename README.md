<div align="center"><h1>React-Auth-App</h1></div>

# 事前準備

プロジェクトを作成するために、アプリケーションのセットアップを行います。  
下記のコマンドを、任意のディレクトリ内で実行します。  
アプリケーションのセットアップとパッケージのインストールを行います。

```Terminal:ターミナル
$ npm init react-app プロジェクト名    ...アプリケーションセットアップ
$ npm i firebase                     ...firebaseのインストール
$ npm i bootstrap react-bootstrap    ...bootstrapのインストール
$ npm i react-router-dom             ...router-domのインストール
```

アプリケーションの立ち上げでは、プロジェクト内で以下のコマンドを入力すると、`http://localhost:3000/`がブラウザで立ち上がります。

```Terminal:ターミナル
$ npm start
```

# 動画の流れ
動画で作成するアプリケーションは、EmailとPasswordを使用する認証アプリケーションです。  
動画の流れは以下の内容で再生されます。

```
00:00 - イントロダクション
00:43 - 作成するアプリケーションをデモアプリケーションで確認
01:38 - Firebaseのセットアップ
08:36 - Signupのコンポーネント作成
16:03 - 認証用Contextの作成
20:20 - Signupコンポーネントのロジックを実装
25:28 - globalに扱う値Loadingを認証用Contextに追加
27:11 - URL・ルーティングの設定
30:11 - Loginのコンポーネント作成
32:32 - Loginのロジックの実装
35:44 - Dashboardのコンポーネント作成
39:15 - Logoutのロジックの実装
41:02 - PrivateRouteの実装
43:38 - Passwordのコンポーネント作成
49:17 - Profileのコンポーネント作成
55:46 - 最後に
```

大まかな内容としては、作成するアプリケーションの全体像を確認し実装を行います。  
必要に応じて、コンポーネントの作成とロジックの実装を各機能ごとに実装する流れになります。

# 前提知識

1. useState
2. useEffect
3. useContext
4. useRef
5. GlobalなState
6. Native
7. props
8. children
9. 非同期通信: async/await, promise

・基本フック:[https://ja.reactjs.org/docs/hooks-reference.html#useState]

# つまずいたpoint

### 1.firebaseのインポートステートメント
firebaseのインストールを行い、firebaseの機能を使用する際に参考動画の通り下記のようにインポートを行いました。

```js:変更前
import firebase from 'firebase/app';
import 'firebase/auth'
```

実行してみると下記のようなエラーが発生しました。

エラー内容:  
```
export 'default' (imported as 'firebase') was not found in 'firebase/app'
```
firebase/appのリンクでfirebaseが見当たらないとエラーが発生しています。  
firebaseのドキュメントを確認してみると、今回使用したバージョンからインポートステートメントの記述が変更されていることを確認することができました。

・firebaseドキュメント：(https://firebase.google.com/docs/web/modular-upgrade)

原因・解決方法：  
バージョンアップに伴い、インポートステートメントが変更されていたため、エラーが発生してしまいました。    
そのため、下記のリンクにドキュメント通り変更することでエラーの解消ができました。

```js:変更後
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
```

### 2.react-router-domバージョン相違
今回は、各機能毎に、ユーザの権限に合わせて特定のリンクに入れないようにする、URL設定を行いました。  
ブラウザでアクセスしたURLのパスを元にルーティングを行い、パスに紐づいているコンポーネントを表示する仕組みである、  
パッケージ`react-router-dom`を使用し実装することになりました。

参考動画と同様に`App.js`を実装してみると下記のようにエラーが発生しました。

```
Uncaught Error: [PrivateRoute] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>
```

参考したコードの`router-dom`のバージョンは`v5`に対し、使用したバージョンは`v6`でした。  
このままでは実装しても、機能することはないためインストールするバージョンを下げるか、最新版で最新のコードを実装することになります。  
`v6`では実装方法は大きく変更されているため、確認が必要です。

```js:参考コード
function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}
```

参照コードでは、`BrowserRouter,Switch,Route`を使用していましたが、最新バージョンでは、`BrowserRouter,Routes,Route`に変更されています。  
最新バージョンのように変更を施してみましたが、エラーの解消はされることはありませんでした。
さらに、参考したPrivateRouteでの実装方法では、バージョンが異なるため実装しても機能しません。そのため注意が必要です。    

```js:変更後
function App() {
  return (
    <Container className="d-flex align-items-center
      justify-content-center"
      style={{minHeight: "100vh"}}
    >
    
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <BrowserRouter>
      {/*AuthProviderで囲むことでGlobalStateを使用できるようにする*/}
        <AuthProvider>
          <Routes>
            {/* Private Route */}
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
```

PrivateRouteの実装方法としては、初めにpropsの概念を活用し、Childrenを使用してユーザの権限に合わせてレンダリングする方法で実装を行いました。  
propsの概念を活用した実装でも機能はするのですが、コード量が増え、見難いものになったため、新機能を使用する方法で実装する方法を見つけました。

`v6`では、最新機能として`Outlet`が導入されています。  
`Outlet`では、PrivateRouteをより簡単に実装することができるようになっています。  
`Outlet`は、Childrenとして設定した子コンポーネントを`Outlet`自身で判別を行い、親ルートで`Outlet`を実装することで、自動でレンダリングしてくれる便利な機能になっています。　　
そうすることで、以前より見やすいコードになりました。


# 注意点

### Authorized domains
動画の内容でSKIPするべき場面があるため、共有します。  
`3:15~`以降の解説で、firebase consoleに関する動画です。Authorized domainsに関してドメインのlocalhost削除の動画が再生されます。  
現在のFirebaseConsoleはドメインを削除する項目は無くなっているため、スキップしても問題ありません。

### React-Router-Dom
動画の配信時のパッケージバージョンと現行バージョンは異なるため、実装内容と方法が異なるため、注意が必要です。

### APIKeyの確認方法
登録したアプリケーションのAPI Keyの確認方法では、FirebaseConsole内で、  
「プロジェクトの概要」横の歯車をクリック>プロジェクトの設定>全般のマイアプリの画面下部に記載されてます。
万が一、プロジェクトに登録ができていない場合に、是非参照ください。

<img width="781" alt="スクリーンショット 2022-10-11 16 11 02" src="./public/スクリーンショット 2022-10-11 16.11.02.png">

## 解説(.envファイル)
.envファイルを作成することで、開発環境・本番環境でのアプリに渡す環境変数を切り分けることができます。

`.env`: デフォルト  
`.env.local:` ローカル環境用  
`.env.development,.env.test,.env.production`: それぞれの環境モードで読み込み  
`.env.development.local,.env.test.local,.envproduction.local`: ローカル環境用  

環境変数記載時は`REACT_APP_`から始まる`変数名=値` の形式で記述。
環境変数取得時は、`process.env.変数名`で取得ができる


# 参考リンク
- ・基本フック(公式ドキュメント):[https://ja.reactjs.org/docs/hooks-reference.html#useState]
- React Authentication Crash Course With Firebase And Routing: [https://www.youtube.com/watch?v=PKwu15ldZ7k&ab_channel=WebDevSimplified]
- モダンJavaScriptの基本から始める　React実践の教科書　（最新ReactHooks対応）
- firebaseドキュメント：[https://firebase.google.com/docs/web/modular-upgrade]
- Reactでグローバルな状態を管理する:[https://m-kenomemo.com/react-context/]
- React hooksを基礎から理解する:[https://qiita.com/seira/items/f063e262b1d57d7e78b4]