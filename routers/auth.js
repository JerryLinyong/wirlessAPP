import React from 'react';
import { createStackNavigator  } from 'react-navigation';
import LoginPage from "../modules/auth/login";
import RegisterPage from "../modules/auth/register";
import forgotPasswordPage from "../modules/auth/forgotPassword"

const AuthenticationNavigator = createStackNavigator({
    Login: {screen: LoginPage}, // 登录页
    Register: {screen: RegisterPage}, // 注册帐号
    forgotPassword: {screen: forgotPasswordPage}, // 重置帐号密码
})

export default class AuthenticationScreen extends React.Component {
    static router = AuthenticationNavigator.router;
    render() {
        return (
            <AuthenticationNavigator navigation={this.props.navigation} />
        )
    }
}

