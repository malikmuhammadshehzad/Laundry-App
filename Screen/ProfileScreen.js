import {Text, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import {useNavigation} from "@react-navigation/native"
const ProfileScreen = () => {
    const navigation = useNavigation()

    // we are excess the user
    const user = auth.currentUser;
    const SignOutUser = ()=>{
      signOut(auth).then(()=>{
      }).catch((err)=>{
        console.log(err)
      })
      navigation.navigate("Login")
    }
  return (
    <View style={{ flex:1 , justifyContent:'center',  alignItems:'center'}} >
     <Pressable>
        <Text>
            Welcome{user.email}
        </Text>
     </Pressable>
     <Pressable onPress={SignOutUser} > 
        <Text>
        Sign Out 
        </Text>
      
        
     </Pressable>
    </View>
  )
}

export default ProfileScreen

 