import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Header } from "../../../../components/header";
import { textColor } from "../../../../constants/colors";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Icon } from "react-native-elements";
import { styles } from "./style";
import { ScrollView } from "react-native-gesture-handler";

const AppScreen = (props) => {
  const [counter, setCounter] = useState("0");
  const [item, setItem] = useState();
  const [dataSource, setDataSource] = useState([
    {
      id: "1",
      name: "Pack of 5 Soulmates",
      price: "$5",
      counter: 0,
      discount: "",
    },
    {
      id: "2",
      name: "Pack of 20 Soulmates",
      price: "$20",
      counter: 0,
      discount: "Save 20%",
    },
    {
      id: "3",
      name: "Pack of 20 Games",
      price: "$5",
      counter: 0,
      discount: "",
    },
    {
      id: "4",
      name: "Pack of 100 Games",
      price: "$20",
      counter: 0,
      discount: "Save 20%",
    },
    {
      id: "5",
      name: "Boost",
      price: "$5",
      counter: 0,
      discount: "",
    },
    {
      id: "6",
      name: "Pack of 5 Boosts",
      price: "$20",
      counter: 0,
      discount: "Save 20%",
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
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"white"}
        translucent={Platform.OS === "ios" ? true : false}
      />
      <Header
        title={"Add Ons"}
        onpress={() => props.navigation.goBack()}
        backIcon={"arrow-back-ios"}
        backIcontype={"material"}
        addicon={"arrow-back-ios"}
        addicontype={"material"}
        color={textColor.white}
      />
      <ScrollView
        style={{
          backgroundColor: Platform.OS === "ios" ? "#eeeeee" : null,
          height: Platform.OS === "ios" ? responsiveHeight(80) : null,
        }}
      >
        <FlatList
          data={dataSource}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                props.navigation.navigate("Premium", {
                  text: "free",
                  item: dataSource,
                  payment: false,
                })
              }
            >
              <Text style={styles.buttontxt}>Continue</Text>
            </TouchableOpacity>
          }
          ListHeaderComponent={
            <View
              style={{
                height: Platform.OS === "ios" ? responsiveHeight(1) : 0,
              }}
            />
          }
          ListFooterComponentStyle={
            <View style={{ height: responsiveHeight(5) }} />
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.headingtxt}>{item.name}</Text>
                <View style={styles.discountView}>
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
              </View>
              <View style={styles.iconview}>
                <TouchableOpacity
                  style={[
                    styles.iconbtn,
                    {
                      backgroundColor:
                        item.counter > 0
                          ? textColor.secondary
                          : textColor.lightgrey,
                    },
                  ]}
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
                  onPress={() => {
                    increment(index);
                    console.log("kkkk", item);
                    setItem(item);
                  }}
                >
                  <Icon name="plus" type="entypo" color={textColor.white} />
                </TouchableOpacity>
              </View>
              {item.discount == "" ? null : (
                    // <View style={styles.discountBanner}>
                    //   <Text style={styles.discountText}>{item.discount}</Text>
                    // </View>
                    <View style={{ position:'absolute',right:-10,top:2,
                    transform: [{rotate: '45deg'}],
                    }}
                    >
                    <View
                      style={{
                        width: responsiveWidth(20),
                        
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: textColor.secondary,
                        height: responsiveHeight(3),
                        borderTopRightRadius: 3,
                        borderBottomRightRadius: 3,
                        elevation:10,
                       
                      }}>
                      <Text style={{color: '#FFF', fontWeight: 'bold'}}>{item.discount}</Text>
                    </View>
                    <View
                      style={{
                        width: 0,
                        height: 0,
                        backgroundColor: 'transparent',
                        borderStyle: 'solid',
                        borderRightWidth: 20,
                        borderTopWidth: 20,
                        borderRightColor: 'transparent',
                        borderTopColor: textColor.secondary,
                        transform: [{rotate: '90deg'}],
                      }}
                    />
                  </View>
                  )}
            </View>
          )}
        />
      
      </ScrollView>
      
    </SafeAreaView>
  );
};
export default AppScreen;
