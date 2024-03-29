import React, { useState, useLayoutEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import Title from '../common/Title'
import Input from '../common/Input'
import Button from '../common/Button'
import api from '../core/api'
import utils from '../core/utils'

import useGlobal from '../core/global'

const SignIn = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const login = useGlobal((state) => state.login)

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [usernameError, setUsernameError] = useState()
    const [passwordError, setPasswordError] = useState()

    const onSignIn = () => {
        // Check username
        const failUsername = !username
        if (failUsername) {
            setUsernameError('Username not provided')
        }
        // Check password
        const failPassword = !password
        if (failPassword) {
            setPasswordError('Password not provided')
        }
        // Break out of this function if there were any issues
        if (failUsername || failPassword) {
            return
        }

        api({
            method: "POST",
            url: "/chat/signin/",
            data: {
                username: username,
                password: password
            }
        }).then(res => {
            utils.log('Sign In:', res.data)

            const credentials = {
                username: username,
                password: password
            }
            login(
                credentials,
                res.data.user,
                res.data.tokens
            )
        }).catch(error => {
            if (error.res) {
                console.log(error.res.data);
                console.log(error.res.status);
                console.log(error.res.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            paddingHorizontal: 20
                        }}
                    >
                        <Title text='RealtimeChat' color='#202020' />

                        <Input
                            title='Username'
                            value={username}
                            error={usernameError}
                            setValue={setUsername}
                            setError={setUsernameError}
                        />

                        <Input
                            title='Password'
                            value={password}
                            error={passwordError}
                            setValue={setPassword}
                            setError={setPasswordError}
                            secureTextEntry={true}
                        />

                        <Button
                            title='Sign In'
                            onPress={onSignIn}
                        />

                        <Text style={{ textAlign: 'center', marginTop: 40 }}>
                            Don't have an account? <Text
                                style={{ color: 'blue' }}
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                Sign Up
                            </Text>
                        </Text>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({})