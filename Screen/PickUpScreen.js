import { StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const navigation = useNavigation()
  const Cart = useSelector((state) => state.cart.cart); // 1: [state.cart] first cart is Store reducer cart. 2:[state.cart.cart] second cart is initialState:cart[] of createSlice method
  const total = Cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState([])
  const [delivery, setDelivery] = useState([])
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days"
    },
    {
      id: "1",
      name: "3-4 Days"
    },
    {
      id: "3",
      name: "4-5 Days"
    },
    {
      id: "4",
      name: "5-6 Days"
    },
    {
      id: "5",
      name: "6-7 Days"
    },
  ]
  const times = [
    {
      id: "0",
      time: "11:00Am",
    },
    {
      id: "1",
      time: "12:00Am",
    },
    {
      id: "2",
      time: "1:00Pm",
    },
    {
      id: "3",
      time: "2:00Pm",
    },
    {
      id: "4",
      time: "3:00Pm",
    },
    {
      id: "5",
      time: "4:00Pm",
    },
  ];
  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert('Empty', 'Please Select all the field', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
        { cancelable: false }
      )
    }
    if (selectedDate && selectedTime && delivery) {
      navigation.replace("Cart", { selectedTime: selectedTime, no_of_days: delivery, pickUpDate: selectedDate })
    }
  }

  return (
    <>

      <SafeAreaView style={styles.mainContainer}>
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          enter Address
        </Text>
        <TextInput
          style={{
            padding: 40,
            borderColor: "gray",
            borderWidth: 0.7,
            paddingVertical: 80,
            borderRadius: 9,
            margin: 10,
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Pick Up date
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date("2020-08-20")}
          endDate={new Date("2020-08-31")}
          initialSelectedDate={new Date("2020-08-22")}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }} >
          Select Time
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          {times.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => { setSelectedTime(item.time) }}
              style={
                selectedTime.includes(item.time) ? {
                  margin: 10,
                  borderRadius: 7,
                  padding: 15,
                  borderColor: "red",
                  borderWidth: 1.5
                } : {
                  margin: 10,
                  borderRadius: 7,
                  padding: 15,
                  borderColor: "grey",
                  borderWidth: 0.7
                }

              }
            >
              <Text> {item.time} </Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }} >
          Delivery Date
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          {
            deliveryTime.map((item, index) => (
              <Pressable
                onPress={() => { setDelivery(item.name) }}
                key={index}
                style={
                  delivery.includes(item.name) ? {
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: "red",
                    borderWidth: 1.5
                  } : {
                    margin: 10,
                    borderRadius: 7,
                    padding: 15,
                    borderColor: "grey",
                    borderWidth: 0.7
                  }

                }
              >
                <Text>
                  {item.name}
                </Text>
              </Pressable>
            ))
          }
        </ScrollView>
      </SafeAreaView>
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
          <Pressable onPress={proceedToCart} >
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }} >Proceed to Cart</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 29,
    marginHorizontal: 12,

  },
});
