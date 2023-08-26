import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { cleanCart, decrementQuantity, incrementQuantity } from "../ReducerData/CartReducer";
import { decrementQty, incrementQty } from "../ReducerData/ProductReducer";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const CartScreen = () => {
  const navigation = useNavigation();
  const userUid = auth.currentUser.uid
  const route = useRoute();
  const Cart = useSelector((state) => state.cart.cart); // 1: [state.cart] first cart is Store reducer cart. 2:[state.cart.cart] second cart is initialState:cart[] of createSlice method
  const total = Cart.map((item) => item.quantity * item.price).reduce(
    (curr, prev) => curr + prev,
    0
  );
  const dispatch = useDispatch();
  const placeOrder = async () => {
    navigation.navigate("Order")
    dispatch(cleanCart())
    await setDoc(doc(db, "users", `${userUid}`),
      {
        order: { ...Cart },
        pickUpDetails: route.params
      },
      {
        merge: true
      }
    )
  }
  return (
    <>

      <ScrollView style={style.mainContainer}>
        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}> Your cart is Empty </Text>
          </View>
        ) : (
          <>
            <View
              style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
            >
              <Ionicons
                onPress={() => {
                  navigation.goBack();
                }}
                name="arrow-back"
                size={24}
                color="black"
              />
              <Text> Your Bucket </Text>
            </View>
            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                marginLeft: 10,
                marginRight: 10,
                padding: 14,
              }}
            >
              {Cart.map((item, index) => (
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between", marginVertical: 12 }} key={index}>
                  <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }} >{item.name}</Text>
                  {/* - and + Button  */}
                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      alignItems: "center",
                      borderColor: "#BEBEBE",
                      borderWidth: 0.5,
                      borderRadius: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => { // we will dispatch these two event
                        dispatch(decrementQuantity(item)); // this for cart  // item is coming for the props
                        dispatch(decrementQty(item)); // this for product 
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#0BBF",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        -
                      </Text>
                    </Pressable>
                    <Pressable>
                      <Text
                        style={{
                          fontSize: 19,
                          color: "#0BBF8F",
                          paddingHorizontal: 8,
                          fontWeight: "600",
                        }}
                      >
                        {item.quantity}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item));  // this for cart  // item is coming for the props
                        dispatch(incrementQty(item));  // this for product // when i click on the plus button then product function run and increas by 1 
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#0BBF8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </Pressable>

                  <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>${item.price * item.quantity}</Text>
                </View>
              ))}
            </Pressable>
            <View style={{ marginHorizontal: 10 }}>
              <Text> Billing details </Text>
              <View style={{
                borderColor: "white",
                borderRadius: 7,
                padding: 10,
                marginTop: 15
              }} >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Text style={{
                    fontSize: 18, fontWeight: "400", color: 'gray'
                  }} >
                    Item total
                  </Text>
                  <Text style={{
                    fontSize: 18, fontWeight: "400",
                  }} >
                    {total}
                  </Text>
                </View>

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                  <Text style={{
                    fontSize: 18, fontWeight: "400", color: 'gray'
                  }} >
                    Delivery Fee | 1.2KM
                  </Text>
                  <Text style={{
                    fontSize: 18, fontWeight: "400", color: '088F8F',
                  }} >
                    FREE
                  </Text>
                </View>

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',

                }}>
                  <Text style={{
                    fontSize: 18, fontWeight: "400", color: 'gray'
                  }} >
                    Free Delivery on Your Oder
                  </Text>
                </View>
                {/* Selected Date Container  */}
                <View style={{
                  borderColor: 'gray',
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10
                }} />
                <View style={{
                  flexDirection: 'row',
                  alignItems: "center",
                  justifyContent: 'space-between',
                  marginVertical: 10
                }} >
                  <Text style={{ fontSize: 18, fontWeight: "500", color: 'gray' }} >
                    selected Date
                  </Text>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: '088F8F'
                  }} >
                    {/* {route.params.pickUpDate} */}
                  </Text>
                </View>

                <View style={{
                  flexDirection: 'row',
                  alignItems: "center",
                  justifyContent: 'space-between',

                }} >
                  <Text style={{ fontSize: 18, fontWeight: "500", color: 'gray' }} >
                    No of Days
                  </Text>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: '088F8F'
                  }} >
                    {route.params.no_of_days}
                  </Text>
                </View>

                <View style={{
                  flexDirection: 'row',
                  alignItems: "center",
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }} >
                  <Text style={{ fontSize: 18, fontWeight: "500", color: 'gray' }} >
                    selected pick up Time
                  </Text>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: '088F8F'
                  }} >
                    {route.params.selectedTime}
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />
                <View style={{
                  flexDirection: 'row',
                  alignItems: "center",
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }} >
                  <Text style={{ fontSize: 18, fontWeight: "500", color: 'gray' }} >
                    To Pay
                  </Text>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",

                  }} >
                    {total + 95}
                  </Text>
                </View>



              </View>
            </View>
          </>
        )}
      </ScrollView>
      {total === 0 ? (null) : (
        <Pressable
          style={{
            backgroundColor: "#0BBF8F",
            marginTop: 'auto',
            padding: 10,
            marginBottom: 30,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }} >
              {/* for calculating the no of item */}
              {Cart.length} items |$  {total}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "white", marginVertical: 6 }} >extra charge might apply</Text>
          </View>
          <Pressable onPress={placeOrder} >
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }} >Place Order</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};
export default CartScreen;

const style = StyleSheet.create({
  mainContainer: {
    marginTop: 29,
    marginHorizontal: 12,
  },
});
