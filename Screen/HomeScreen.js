import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Image,
  TextInput,
} from "react-native";
import { React, useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../ReducerData/ProductReducer";
import { useNavigation } from "@react-navigation/native"
import { collection,  getDocs } from "firebase/firestore";
import { db } from "../firebase";
const HomeScreen = () => {
  const Service = [
    {
      id: 0,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHr97tV2MMW11D-Hwu2wB2dh3mklwNe2sSrA&usqp=CAU",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzsKWJhNZRew8KygDWEtcKRh9gO8VAUiXo2g&usqp=CAU",
      name: "Short",
      quantity: 0,
      price: 10,
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYbFGZ3527ybVi6RXfAT4nEYiRVHlAoK0nUQ&usqp=CAU",
      name: "SleeveLess",
      quantity: 0,
      price: 10,
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTU2Tsup9HCmo2Q5DcPbb9cG1AQjDbvV8ifQ&usqp=CAU",
      name: "Pant",
      quantity: 0,
      price: 10,
    },
    {
      id: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl4NTIYbHX7dzD-zpCO0MDZTYITSfD-7Gg_g&usqp=CAU",
      name: "Pant & Shard",
      quantity: 0,
      price: 10,
    },
    {
      id: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3BTbg693egwFkaG1IafRx5hIYJ82kXURokQ&usqp=CAU",
      name: "Winter Cloths",
      quantity: 0,
      price: 10,
    },
  ];
  const [items, setItem] = useState([])
  const navigation = useNavigation();
  // for accessing cart with the help of useSelector hook
  const product = useSelector((state) => state.product.product); // 1: [state.product] first product is Store reducer product. 2:[state.product.product] second product is initialState:product[] of createSlice method
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts = async () => {
      const colRef = collection(db, "types"); // types is collection i make this in fireStore database // bd parameter is coming form firebase file 
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service)=>dispatch(getProducts(service))) // we are just using the product inside of application
    };
    fetchProducts();
  }, []);

  const Cart = useSelector((state) => state.cart.cart); // 1: [state.cart] first cart is Store reducer cart. 2:[state.cart.cart] second cart is initialState:cart[] of createSlice method
  const total = Cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0)
  const [displayCurrentAddress, setDisplayCurrentAddress] =
    useState(" we are loading");
  const [locationServicesEnable, setLocationServicesEnable] = useState(false);
  // useEffect is a  user lisner its location is anble or not then we gat the current location
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []); // [] it is emty dependency arry , or jab ham is ma [item] rakta han to first time item ko run nahi karta but second time ya item ko rum  kar data ha
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      // in  this we learn location is enabled or not
      Alert.alert(
        //title
        "Location Services not enabled",
        //body
        " plz enabled the location services",
        [
          {
            text: "cancel",
            onPress: () => console.log("Cancels Pressed"),
            style: "cancel",
          },

          {
            text: "ok",
            onPress: () => console.log("ok Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
    } else {
      setLocationServicesEnable(enabled);
    }
  };
  // in this function we learn about the user current location
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        //title
        "Permission not granted ",
        //body
        "allow the app to use the location services ",
        [
          {
            text: "cancel",
            onPress: () => console.log("Cancels Pressed"),
            style: "cancel",
          },

          {
            text: "ok",
            onPress: () => console.log("No Pressed"),
          },
        ],
        +{ cancelable: false }
        //clicking out side of alert will not cancel
      );
    }
    // agr hama location open karna ki permition mi jati ha to ham coordinate la ga
    const { coords } = await Location.getCurrentPositionAsync(); // .getCurrentPositionAsync() hama user ki location ka   latitude &  longitude data ha
    // console.log(" coords data ", coords);
    if (coords) {
      // agr (coords) ha to ham destructure of latitude and longitude kar ta han , like this  {latitude, longitude}
      const { latitude, longitude } = coords;
      // we need to apply the reverse your code method on there latitude &  longitude to get the exit location
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      // console.log("response", response);

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode} `;
        setDisplayCurrentAddress(address);
      }
    }
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: "#F0F0F0",
          flex: 1,
          marginTop: 30,
          borderRadius: 9,
        }}
      >
        {/* location and profile */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-pin" size={24} color="red" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}> Home </Text>
            <Text>{displayCurrentAddress}</Text>
          </View>
          <Pressable onPress={()=> navigation.navigate("Profile") } style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 25 }}
              source={{
                uri: "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=600",
              }}
            />
          </Pressable>
        </View>
        {/* search Bar  */}
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "black",
            borderRadius: 7,

          }}
        >
          <TextInput placeholder="Search for item or more " />
          <Ionicons name="search" size={24} color="red" />
        </View>
        {/* image Carousal  */}
        <Carousel />
        {/*  Services  */}
        <Services />
        {/* services Product  */}
        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>
      {total === 0 ? (null) : (
        <Pressable
          style={{
            backgroundColor: "#0BBF8F",
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
          <Pressable onPress={() => navigation.navigate("PickUp")} >
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }} >Proceed to Pickup</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({});
export default HomeScreen;
