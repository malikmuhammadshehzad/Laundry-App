import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [passWord, setPassWord] = useState("")
    // we are creating function if there user or not  
    useEffect(() => {
       setLoading(true)
      const unSubscribe=auth.onAuthStateChanged((authUser)=>{
        if(!authUser){
            setLoading(false)
        }
        if(authUser){
            navigation.navigate("Home")
        }
      });
      return  unSubscribe
    }, [])
    
    const Login = () =>{
        signInWithEmailAndPassword(auth,email,passWord).then((useCredential)=>{
            console.log("user Credential");
            const user = useCredential.user
            console.log("user Details" , user);
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "width", alignItems: 'center', padding: 10 }} >
            {loading ? (
            <View style={{alignItems:'center' , display:'flex' , justifyContent:'center' , flex:1 }} >
                <Text style={{ fontWeight:'bold' , marginRight:10 }} >
                    loading
                    <ActivityIndicator size="large" color={"red"}  />
                </Text>
            </View>
            ) : (
                <KeyboardAvoidingView>
                <View style={{
                    justifyContent: 'center',
                    alignItems: "center",
                    marginTop: 100

                }} >
                    <Text style={{
                        fontSize: 20,
                        color: "#662d91",
                        fontWeight: 'bold'

                    }} > Sign in  </Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                        marginTop: 8

                    }} > Sign In to account </Text>
                </View>
                <View style={{ marginTop: 50 }} >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }} >
                        <MaterialCommunityIcons
                            style={{ marginRight: 10 }}
                            name="email-outline" size={24}
                            color="black" />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder='Email'
                            placeholderTextColor="black"
                            style={{
                                fontSize: email ? 18 : 18,
                                borderBottomWidth: 1,
                                marginTop: 13,

                                width: 300,
                                marginVertical: 20,
                            }} />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }} >
                        <Ionicons
                            style={{ marginRight: 10 }}
                            name="key-outline"
                            size={24}
                            color="black" />
                        <TextInput
                            value={passWord}
                            secureTextEntry={true}
                            onChangeText={(text) => setPassWord(text)}
                            placeholder='PassWord'
                            placeholderTextColor="black"
                            style={{
                                fontSize: passWord ? 18 : 18,
                                borderBottomWidth: 1,
                                marginTop: 13,
                                 
                              
                                width: 300,
                                marginVertical: 20,
                            }} />
                    </View>
                    <Pressable onPress={Login} style={{ width: 200, backgroundColor: '#318CE7', padding: 15, borderRadius: 7, marginTop: 50, marginLeft: "auto", marginRight: 'auto' }} >
                        <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }} > Login </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate("Register")}
                        style={{
                            marginTop: 50,
                        }} >
                        <Text
                            style={{
                                fontSize: 17,
                                textAlign: 'center',
                                color: 'gray',
                                fontWeight: '500',
                            }} >  Don't have account ? Sign Up  </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>   
            )}
           
        </SafeAreaView>

    )
}

export default LoginScreen

const styles = StyleSheet.create({})