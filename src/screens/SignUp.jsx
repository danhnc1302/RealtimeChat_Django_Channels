import { useLayoutEffect, useState } from "react"
import {
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    View,
    TouchableWithoutFeedback
} from "react-native"
import Input from "../common/Input"
import Button from "../common/Button"

function SignUpScreen({ navigation }) {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [password1Error, setPassword1Error] = useState('')
    const [password2Error, setPassword2Error] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    function onSignUp() {

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}>

                        <Text
                            style={{
                                textAlign: 'center',
                                marginBottom: 24,
                                fontSize: 36,
                                fontWeight: 'bold'
                            }}
                        >
                            Sign Up
                        </Text>

                        <Input
                            title='Username'
                            value={username}
                            error={usernameError}
                            setValue={setUsername}
                            setError={setUsernameError}
                        />

                        <Input
                            title='First Name'
                            value={firstName}
                            error={firstNameError}
                            setValue={setFirstName}
                            setError={setFirstNameError}
                        />

                        <Input
                            title='Last Name'
                            value={lastName}
                            error={lastNameError}
                            setValue={setLastName}
                            setError={setLastNameError}
                        />

                        <Input
                            title='Password'
                            value={password1}
                            error={password1Error}
                            setValue={setPassword1}
                            setError={setPassword1Error}
                            secureTextEntry={true}
                        />

                        <Input
                            title='Retype Password'
                            value={password2}
                            error={password2Error}
                            setValue={setPassword2}
                            setError={setPassword2Error}
                            secureTextEntry={true}
                        />

                        <Button title='Sign Up' onPress={onSignUp} />

                        <Text style={{ textAlign: 'center', marginTop: 40 }}>
                            Already have an account? <Text
                                style={{ color: 'blue' }}
                                onPress={() => navigation.goBack()}
                            >
                                Sign In
                            </Text>
                        </Text>


                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUpScreen