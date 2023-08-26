import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
const Carousel = () => {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBoPZ-FbRuVAUhBYg4fea2PSOsUP1ibbQYXqAqwmPFfexCkHgpw2N6C1k4SsJ7duB1thM&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzwV9ir_PsAbU8l_8neFGp5RDnBCf1ju-yfRx8y4drUnbdT8sIng0Y1c8AGtouuaZgca8&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-3QSbKHMkMlAAXfjiiVL6Nc7LQZWCdLosbA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmyo2cGAo410NKxjfd5BFtbDnef24Pzs3DilyKIl7iOu_Hae8224rPUb2uPThJsfN-qB8&usqp=CAU",
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#1D1D1D"}
        inactiveDotColor="#90A4Ae"
        ImageComponentStyle={{ borderRadius: 6, width: "94%" }}
      />
    </View>
  );
};
 

export default Carousel;
