import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Modal from "react-native-modal";

import { appImages } from "../../../assets/utility";
import RBSheet from "react-native-raw-bottom-sheet";
import { buttonColor, textColor } from "../../../constants/colors";
import { styles } from "./style";
import { Icon } from "react-native-elements/dist/icons/Icon";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import AS_KEYS from "../../../constants/asynckeys";
import { getData, getDataWhere } from "../../../Backend/utility";
import COLLECTIONS from "../../../Backend/collecctions";
import { uniqArray } from "../Home/services";
import M_PROPS from "../../../constants/matchingProperties/matchingProperties";
import { textAbstract } from "../../../global/helpers";
import Loder from "../../../components/loader";

const AppScreen = (props) => {
  const [username, setUsername] = useState("");
  const [ReportModal, setReportModal] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [refreshMatch, setRefreshMatch] = useState(false);

  const refRBSheet = useRef();
  const unMatchRb = useRef();
  const [image, setImage] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loader, setLoader] = useState(true);

  const get = (uId) => {
    try {
      getData(COLLECTIONS.MATCH, uId).then(({ matches }) => {
        getData(COLLECTIONS.MATCHED_PROFILES, uId).then((profileMatches) => {
          if (profileMatches) {
            var imgs = image;
            profileMatches.ProfileIds.forEach((element, index) => {
              getData(COLLECTIONS.USERS, element).then((usr) => {
                for (let index = 0; index < matches.length; index++) {
                  const matchelement = matches[index];

                  if (matchelement.personId == element) {
                    imgs.push({
                      id: usr.id,
                      image: { uri: usr.user_images[0] },
                      image1:
                        matchelement.react == M_PROPS.KISS
                          ? appImages.lips
                          : appImages.daimondPic,
                      name: usr.name,
                    });
                  }
                  setImage(uniqArray(imgs));
                  setRefreshMatch(!refreshMatch);
                  setLoader(false);
                }
              });
            });
          }
        });
      });
    } catch (error) {
      setLoader(false);
    }
  };
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setLoader(true);
      AsyncStorageLib.getItem(AS_KEYS.TOKEN).then((id) => {
        setUserId(id);
        get(id);
      });
    });

    return unsubscribe;
  }, [props.navigation]);
  useEffect(() => {
    setLoader(true);

    AsyncStorageLib.getItem(AS_KEYS.TOKEN).then((id) => {
      setUserId(id);
      get(id);
    });
  }, []);
  const getUser = (id) => {
    getData(COLLECTIONS.USERS, id).then((val) => {
      console.log("🚀 ~ file: index.js ~ line 100 ~ getData ~ val", val);
      setUser(val);
    });
  };

  return (
    <>
      {loader ? (
        <Loder />
      ) : (
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle={"dark-content"}
            backgroundColor={textColor.white}
          />

          <Text style={styles.headingtxt}>New Matches</Text>
          <View>
            {image.length > 0 ? (
              <FlatList
                data={image}
                showsHorizontalScrollIndicator={false}
                extraData={refreshMatch}
                ListHeaderComponent={
                  <View style={{ marginLeft: responsiveWidth(3) }} />
                }
                ListFooterComponent={
                  <View style={{ marginRight: responsiveWidth(3) }} />
                }
                horizontal={true}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={styles.topflatlistview}
                    onPress={() => {
                      refRBSheet.current.open();
                      setUsername(item.name);
                      setUserId(item.id);
                      getUser(item.id);
                    }}
                  >
                    <ImageBackground
                      source={item.image}
                      style={styles.image}
                      imageStyle={styles.backstyle}
                    >
                      <View style={styles.card}>
                        <Image source={item.image1} style={styles.lipsimage} />
                      </View>
                    </ImageBackground>
                    <Text style={[styles.nametxt, { alignSelf: "center" }]}>
                      {textAbstract(item.name, 14)}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text
                style={{ marginVertical: responsiveHeight(6), marginStart: 20 }}
              >
                New matches will appear here
              </Text>
            )}
          </View>
          <Text style={styles.headingtxt}>Messages</Text>
          <View>
            {dataSource.length > 0 ? (
              <FlatList
                data={dataSource}
                renderItem={({ item, index }) => (
                  <View style={styles.headerview}>
                    <TouchableOpacity
                      style={styles.mesages}
                      onPress={() => props.navigation.navigate("GiftedChat")}
                    >
                      <ImageBackground
                        source={item.image}
                        style={styles.image1}
                        imageStyle={styles.backstyle1}
                      >
                        <View style={styles.card1}>
                          <Image
                            source={item.image1}
                            style={styles.lipsimage1}
                          />
                        </View>
                      </ImageBackground>
                      <View
                        style={{
                          width: responsiveWidth(57),
                          marginLeft: responsiveWidth(3),
                        }}
                      >
                        <Text style={styles.nametxt}>{item.name}</Text>
                        <Text style={styles.txt} numberOfLines={1}>
                          {item.txt}
                        </Text>
                      </View>
                      <Text style={styles.txt}>{item.time}</Text>
                    </TouchableOpacity>
                    <View style={styles.Seperator} />
                  </View>
                )}
              />
            ) : (
              <Text
                style={{ marginVertical: responsiveHeight(6), marginStart: 20 }}
              >
                Your chats will appear here
              </Text>
            )}
          </View>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={responsiveHeight(35)}
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
            <View>
              <Text style={styles.SafetyText}>{username}</Text>
              <TouchableOpacity
                style={styles.rbsheetbtn}
                onPress={() => {
                  unMatchRb.current.open();
                  // refRBSheet.current.close()
                }}
              >
                <View style={styles.orangeCircle}>
                  <Icon
                    type={"entypo"}
                    name={"cross"}
                    color={"white"}
                    size={responsiveFontSize(3)}
                  />
                </View>
                <View style={styles.txtView}>
                  <Text
                    style={[
                      styles.rbsheetbtntxt,
                      ,
                      { color: "#8c8c8c", textTransform: "uppercase" },
                    ]}
                  >
                    {"UNMATCH  " + textAbstract(username, 14)}
                  </Text>
                </View>
              </TouchableOpacity>
              <RBSheet
                ref={unMatchRb}
                closeOnDragDown={false}
                closeOnPressMask={true}
                customStyles={{
                  wrapper: {
                    backgroundColor: "rgba(0,0,0,0.3)",
                  },
                  container: {
                    backgroundColor: "rgba(0, 0, 0, 0)",
                  },
                  //   draggableIcon: {
                  //     backgroundColor: "white",
                  //     // width: responsiveWidth(40),
                  //   },
                }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 0.4 }} />
                  <View style={styles.subContainer}>
                    <View
                      style={{
                        height: responsiveHeight(13),
                        width: responsiveHeight(13),
                        borderRadius: responsiveHeight(7),

                        alignSelf: "center",
                        zIndex: 1,
                        position: "absolute",
                        top: -responsiveHeight(7),
                      }}
                    >
                      <Image
                        source={{
                          uri: user.hasOwnProperty("user_images")
                            ? user.user_images[0]
                            : "",
                        }}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: responsiveHeight(7),
                        }}
                      />
                    </View>
                    <View style={styles.textWrapper}>
                      <Text
                        style={[
                          styles.unMatchText,
                          { marginTop: responsiveHeight(6) },
                        ]}
                      >
                        Are you sure you want to unmatch
                      </Text>
                      <Text style={styles.unMatchText}>
                        with {textAbstract(username, 14)}?
                      </Text>
                    </View>

                    <View style={styles.btnGroup}>
                      <TouchableOpacity
                        style={styles.noBtn}
                        onPress={() => {
                          unMatchRb.current.close();
                          refRBSheet.current.close();
                        }}
                      >
                        <Text style={styles.noTxt}>NO</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.yesBtn}
                        onPress={() => {
                          unMatchRb.current.close();
                          refRBSheet.current.close();
                        }}
                      >
                        <Text style={styles.yesTxt}>YES</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </RBSheet>
              <TouchableOpacity
                style={styles.rbsheetbtn}
                onPress={() => {
                  props.navigation.navigate("OtherProfile", userId);
                  refRBSheet.current.close();
                }}
              >
                <View
                  style={[styles.orangeCircle, { backgroundColor: "green" }]}
                >
                  <Icon
                    type={"font-awesome-5"}
                    name={"user-alt"}
                    color={"white"}
                    size={responsiveFontSize(2)}
                  />
                </View>
                <View style={styles.txtView}>
                  <Text
                    style={[
                      styles.rbsheetbtntxt,
                      ,
                      { color: "#8c8c8c", textTransform: "uppercase" },
                    ]}
                  >
                    VIEW PROFILE
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rbsheetbtn}
                onPress={() => {
                  props.navigation.navigate("GiftedChat", userId);
                  refRBSheet.current.close();
                }}
              >
                <View
                  style={[styles.orangeCircle, { backgroundColor: "blue" }]}
                >
                  <Icon
                    type={"ionicon"}
                    name={"ios-chatbubbles-sharp"}
                    color={"white"}
                    size={responsiveFontSize(2)}
                  />
                </View>

                <Text
                  style={[
                    styles.rbsheetbtntxt2,
                    ,
                    { color: "#8c8c8c", textTransform: "uppercase" },
                  ]}
                >
                  START CONVERSATION
                </Text>
              </TouchableOpacity>
            </View>
          </RBSheet>
        </SafeAreaView>
      )}
    </>
  );
};
export default AppScreen;
