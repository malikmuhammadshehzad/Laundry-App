import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

const Services = () => {
  const servicesData = [
    {
      id: 0,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScdYKRFVeHUP9LF4C3jKpHpYF262Qb03JhSQ&usqp=CAU",
      name: "Washing",
    },
    {
      id: 1,
      image:
        "https://media.cnn.com/api/v1/images/stellar/prod/210915133905-how-to-do-laundry-lead.jpg?q=w_1601,h_901,x_0,y_0,c_fill",
      name: "Laundry",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1-a2JZo5Xx1fOZaO6JLGm6-Qy64HP0pFZZw&usqp=CAU",
      name: "wash & Iron ",
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQfxXhN9u-7otV5P8Xe_ZiTqBdZ2w93lnPw&usqp=CAU",
      name: "Cleaning",
    },
  ];
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 7 }}>
        Services Available{" "}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {servicesData.map(( service ,index) => {
          return (
            <Pressable
              style={{
                margin: 10,
                backgroundColor: "#E2E3E5",
                padding: 20,
                borderRadius: 7,
              }}
              key={index}
            >
              <Image
                source={{ uri: service.image }}
                style={{ width: "70", height: 70 }}
              />
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                {service.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({});

export default Services;
