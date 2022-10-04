import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Header } from "../../../components/header";
import { textColor } from "../../../constants/colors";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Icon } from "react-native-elements";
import { styles } from "./style";

const AppScreen = (props) => {
  const [counter, setCounter] = useState("0");
  const [dataSource, setDataSource] = useState([
    {
      id: "1",
      name: "Pack of 5 soul mates",
      price: "$5",
      counter: 0,
    },
    {
      id: "2",
      name: "Pack of 5 soul mates",
      price: "$10",
      counter: 0,
    },
    {
      id: "3",
      name: "Pack of 5 soul mates",
      price: "$15",
      counter: 0,
    },
    {
      id: "4",
      name: "Pack of 5 soul mates",
      price: "$50",
      counter: 0,
    },
    {
      id: "5",
      name: "Pack of 5 soul mates",
      price: "$1",
      counter: 0,
    },
  ]);
  const increment = (index) => {
    let arr = dataSource;
    arr[index] = { ...arr[index], counter: arr[index].counter + 1 };
    setDataSource([...arr]);
    console.log("set");
  };
  const decrement = (index) => {
    let arr = dataSource;
    if (arr[index].counter == 0) {
      console.log("value cannot be nagitive");
    } else {
      let arr = dataSource;
      arr[index] = { ...arr[index], counter: arr[index].counter - 1 };
      setDataSource([...arr]);
      console.log("set11");
    }
    // if(counter==0){
    // console.log('value cannot be nagitive');
    // }
    // else{
    //     setCounter(counter-1)
    // }
  };
  return (
    <View style={styles.container}>
      <Header
        title={"Add Ons"}
        onpress={() => props.navigation.goBack()}
        backIcon={"arrow-back-ios"}
        backIcontype={"material"}
        addicon={"arrow-back-ios"}
        addicontype={"material"}
        color={textColor.white}
      />
      <ScrollView>
        <FlatList
          data={dataSource}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                props.navigation.navigate("Premium", { text: "free" })
              }
            >
              <Text style={styles.buttontxt}>Continue</Text>
            </TouchableOpacity>
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.headingtxt}>{item.name}</Text>
                <Text
                  style={[
                    styles.headingtxt,
                    {
                      fontSize: responsiveFontSize(3),
                      color: textColor.secondary,
                      marginTop: responsiveHeight(1),
                    },
                  ]}
                >
                  {item.price}
                </Text>
              </View>
              <View style={styles.iconview}>
                <TouchableOpacity
                  style={styles.iconbtn}
                  onPress={() => decrement(index)}
                >
                  <Icon name="minus" type={"entypo"} color={textColor.white} />
                </TouchableOpacity>
                <Text style={styles.countertxt}>{item.counter}</Text>
                <TouchableOpacity
                  style={[
                    styles.iconbtn,
                    { backgroundColor: textColor.secondary },
                  ]}
                  onPress={() => increment(index)}
                >
                  <Icon name="plus" type="entypo" color={textColor.white} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
      
    </View>
  );
};
export default AppScreen;
