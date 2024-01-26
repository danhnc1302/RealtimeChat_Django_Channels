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

const SignIn = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [usernameError, setUsernameError] = useState()
    const [passwordError, setPasswordError] = useState()

    const onSignIn = () => {

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