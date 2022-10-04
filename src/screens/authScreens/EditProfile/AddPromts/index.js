import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  ViewBase,
  Platform,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { SwipeListView } from "react-native-swipe-list-view";
import RBSheet from "react-native-raw-bottom-sheet";
import { appImages } from "../../../../assets/utility";
import { styles } from "./style";
import { Notifications } from "../../../../components/array";
import Ionicons from "react-native-vector-icons/AntDesign";
import {
  appColor,
  textColor,
  buttonColor,
  iconColor,
} from "../../../../constants/colors";
import Toast from "react-native-simple-toast";

import { TouchableWithoutFeedback } from "react-native";
import { fontFamily } from "../../../../constants/fonts";
import { Icon } from "react-native-elements";
import { ViewPagerAndroidComponent } from "react-native";
import {
  getAllOfCollection,
  getData,
  saveData,
} from "../../../../Backend/utility";
import COLLECTIONS from "../../../../Backend/collecctions";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import AS_KEYS from "../../../../constants/asynckeys";

const NotificationScreen = ({ navigation }) => {
  const refRBSheet = useRef();
  const [listData, setListData] = useState([]);
  const [currentFav, setcurrentFav] = useState(0);
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [editable, setEditable] = useState(false);
  const [promptFlag, setpromptFlag] = useState(false);

  const [promptList, setPromptList] = useState([]);
  const [promptValue, setPromptValue] = useState("");

  const getPromptList = async () => {
    const res = await getAllOfCollection(COLLECTIONS.PROMPTS_LIST);
    const { List } = res[0];
    var prompts = [];
    List.forEach((element) => {
      prompts.push({ name: element, value: "" });
    });
    setPromptList(prompts);
  };

  useEffect(() => {
    getPromptList();
  }, []);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const editable1 = (rowKey) => {
    let __ = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    __.forEach((element) => {
      element.flag = false;
    });
    __[prevIndex].flag = true;
    setEditable(__[prevIndex]);
    setListData(__);
  };
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    if (newData.length < 2) {
      Toast.show("You need at least 1 prompt!!");
    } else {
      newData.splice(prevIndex, 1);
      setListData(newData);
    }
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const onLeftActionStatusChange = (rowKey) => {
    console.log("onLeftActionStatusChange", rowKey);
  };

  const onRightActionStatusChange = (rowKey) => {
    console.log("onRightActionStatusChange", rowKey);
  };

  const onRightAction = (rowKey) => {
    console.log("onRightAction", rowKey);
  };

  const onLeftAction = (rowKey) => {
    console.log("onLeftAction", rowKey);
  };

  const addToList = (name) => {
    var selectedList = listData;
    var promptListArray = promptList;

    for (let index = 0; index < promptListArray.length; index++) {
      const element = promptListArray[index];
      if (element.name === name) {
        if (promptValue.length !== 0) {
          if (selectedList.length == 0) {
            selectedList.push({
              key: `${Math.floor(Math.random() * 1000) + 20}`,
              title: element.name,
              details: promptValue,
              status: true,
            });
          } else {
            selectedList.push({
              key: `${Math.floor(Math.random() * 1000) + 20}`,
              title: element.name,
              details: promptValue,
              status: false,
            });
          }

          setListData(selectedList);
          setPromptValue("");
          promptListArray.splice(index, 1);
          setPromptList(promptListArray);
          refRBSheet.current.close();
          break;
        }
      }
    }
  };

  const VisibleItem = (props) => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      leftActionState,
      rightActionState,
    } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 5000000,
        useNativeDriver: false,
      }).start(() => {
        // removeRow();
      });
    }
    const [currentValue, setCurrentValue] = useState("");
    return (
      <Animated.View
        style={[styles.rowFront, { height: rowHeightAnimatedValue }]}
      >
        <View
          style={styles.rowFrontVisible}
          // onPress={() => setEditable(true)}
          // underlayColor={"#aaa"}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              underlayColor={"#aaa"}
              style={{
                width: responsiveWidth(70),
                paddingLeft: responsiveWidth(1),
              }}
            >
              <View style={{ marginTop: responsiveHeight(1) }}>
                <Text style={styles.title} numberOfLines={1}>
                  {data.item.title}
                </Text>

                <TextInput
                  // editable={data.item.flag}
                  // value={data.item.details}
                  placeholder={data.item.details}
                  placeholderTextColor={"grey"}
                  style={{
                    // backgroundColor: "red",
                    fontSize: responsiveFontSize(2.2),
                    fontFamily: fontFamily.appTextBold,
                    marginTop:
                      Platform.OS === "android" ? responsiveHeight(-2) : 0,
                    marginBottom: responsiveHeight(1),
                  }}
                  returnKeyType="done"
                  onBlur={(val) => {
                    if (currentValue !== "") {
                      let __ = [...listData];
                      __ = __.map((i) => {
                        if (i.key === data.item.key) {
                          i.details = currentValue;
                          return i;
                        }
                        return i;
                      });
                      setListData([...__]);
                    }
                  }}
                  onChangeText={(val) => {
                    setCurrentValue(val);
                  }}
                />
              </View>

              {/* <Text style={styles.details} numberOfLines={1}>
              {data.item.details}
            </Text> */}
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                let __ = listData;
                __ = __.map((i) => {
                  if (i.key === data.item.key) {
                    i.status = true;
                    return i;
                  } else {
                    i.status = false;
                  }
                  return i;
                });
                setListData([...__]);
              }}
              style={{
                width: responsiveWidth(20),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {data.item.status === true ? (
                <Ionicons
                  size={27}
                  name={"star"}
                  color={"#FFD500"}
                  style={{ left: responsiveWidth(5) }}
                />
              ) : (
                <Ionicons
                  size={27}
                  name={"star"}
                  color={"#C9C9C9"}
                  style={{ left: responsiveWidth(5) }}
                />
              )}
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const HiddenItemWithActions = (props) => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View
        style={[styles.rowBack, { height: rowHeightAnimatedValue }]}
      >
        {/* {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )} */}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}
          >
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-10, -5],
                          outputRange: [1, 0],
                          extrapolate: "clamp",
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.rPrompt}>Remove Prompt?</Text>

                <View
                  style={{
                    width: responsiveWidth(19),
                    flexDirection: "row",
                  }}
                >
                  <View style={styles.circle}>
                    <Icon
                      onPress={onDelete}
                      name="check"
                      type="antdesign"
                      size={responsiveFontSize(3)}
                      color="#fff"
                    />
                  </View>
                  <View style={styles.circle}>
                    <Icon
                      onPress={onClose}
                      name="cross"
                      type="entypo"
                      size={responsiveFontSize(3)}
                      color="#fff"
                    />
                  </View>
                </View>
              </Animated.View>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.subtitleview}>
        <TouchableOpacity
          style={styles.backbutton}
          onPress={() => navigation.goBack()}
        >
          <Image source={appImages.cheveronbackblack} />
        </TouchableOpacity>
        <Text style={styles.subtitle}>Add Prompts</Text>
      </View>
      <StatusBar barStyle="dark-content" />
      <ScrollView scrollEnabled={false}>
        {/* <StatusBar backgroundColor="#FF6347" barStyle="light-content"/> */}
        <SwipeListView
          // style={{ backgroundColor: "red", flex: 1 }}
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          disableRightSwipe
          onRowDidOpen={onRowDidOpen}
          leftActivationValue={100}
          rightActivationValue={-100}
          leftActionValue={0}
          rightActionValue={-250}
          onLeftAction={onLeftAction}
          onRightAction={onRightAction}
          onLeftActionStatusChange={onLeftActionStatusChange}
          onRightActionStatusChange={onRightActionStatusChange}
          showsVerticalScrollIndicator={false}
          stopLeftSwipe={80}
        />
        {/* {
       !promptFlag ? */}
        {listData.length < 5 && (
          <TouchableOpacity
            style={styles.buttons1}
            onPress={() => refRBSheet.current.open()}
          >
            <Text style={styles.AddPromtstext}>Add Prompt</Text>
          </TouchableOpacity>
        )}

        {/* :
      null
      } */}
      </ScrollView>
      <View style={styles.bottomview}>
        <Text style={styles.holdtext}>
          {"Don’t forget to choose your \nfavorite prompt"}
        </Text>
        <TouchableOpacity
          style={styles.buttons}
          onPress={async () => {
            if (listData.length == 0) {
              Toast.show("You need at least 1 prompt!", Toast.SHORT);
            } else {
              const uId = await AsyncStorageLib.getItem(AS_KEYS.TOKEN);
              await saveData(COLLECTIONS.PROMPTS, uId, { Prompts: listData });

              navigation.navigate("About", { nextRoute: "App" });
            }
          }}
        >
          <Text style={styles.continuetext}>Continue</Text>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={responsiveHeight(60)}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
          container: {
            borderTopRightRadius: responsiveWidth(7),
            borderTopLeftRadius: responsiveWidth(7),
            elevation: 2,
          },
          draggableIcon: {
            backgroundColor: buttonColor.grey,
            width: responsiveWidth(40),
          },
        }}
      >
        <ScrollView>
          {promptList.map(({ name, val }, index) => {
            return (
              <View key={index} style={[styles.flatlistMainview1, styles.item]}>
                <Text style={styles.rbtexts}>{name}</Text>
                <TextInput
                  placeholder="Tap here to write your answer"
                  maxLength={75}
                  onChangeText={setPromptValue}
                  onBlur={() => addToList(name)}
                  style={styles.input}
                />
              </View>
            );
          })}
        </ScrollView>
      </RBSheet>
    </View>
  );
};

export default NotificationScreen;
