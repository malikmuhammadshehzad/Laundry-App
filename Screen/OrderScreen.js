import { View, Text } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native"
const OrderScreen = () => {
  return (
    <View>
      <LottieView source={require("../assets/thumbs.json")} style={{
        height: 360,
        width: 300,
        alignSelf: 'center',
        marginTop: 40,
        justifyContent: 'center'
      }} autoPlay loop={false} speed={0.7} />
      <Text style={{ marginTop: 40, fontSize: 19, fontWeight: "600", textAlign: 'center' }} >
        your order has been place
      </Text>
      <LottieView autoPlay loop={false} speed={0.7}  source={require("../assets/sparkle.json")} style={{ height: 300, position: "absolute", top: 100, width: 300, alignSelf: "center  " }} />
    </View>
  )
}

export default OrderScreen;