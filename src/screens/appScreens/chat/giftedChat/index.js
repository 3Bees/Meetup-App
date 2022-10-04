import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Button,
  StatusBar,
  Platform,
  ImageBackground,
} from "react-native";
import { fontFamily } from "../../../../constants/fonts";
import { Icon, Tooltip } from "react-native-elements";
import { appImages } from "../../../../assets/utility";
import RBSheet from "react-native-raw-bottom-sheet";
import Feather from "react-native-vector-icons/Feather";
import { moment } from "moment";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { styles } from "./style";
import {
  appColor,
  bggradientColor,
  buttonColor,
  textColor,
  theamColor,
} from "../../../../constants/colors";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import AS_KEYS from "../../../../constants/asynckeys";
import COLLECTIONS from "../../../../Backend/collecctions";
import { getAge, textAbstract } from "../../../../global/helpers";
import {
  getChatData,
  getData,
  saveData,
  uniqueID,
} from "../../../../Backend/utility";
import M_PROPS from "../../../../constants/matchingProperties/matchingProperties";
import firestore from "@react-native-firebase/firestore";
import KeyboardSpacer from "react-native-keyboard-spacer";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.unSub = () => {};
    this.state = {
      userId: "",
      personId: "",
      user: {},
      data: [
        // {
        //   id: 1,
        //   date: "9:50",
        //   type: "in",
        //   message: "hi how are  you? ",
        // },
        // {
        //   id: 2,
        //   date: "9:50",
        //   type: "out",
        //   message: "i am fine thank you",
        // },
        // {id:3, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
        // {id:4, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
        // {id:5, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met"},
        // {id:6, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met"},
        // {id:7, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
        // {id:8, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
        // {id:9, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
      ],
      tip: false,
      like: "",
      heart: "",
      laugh: "",
      message: "",
      index: "",
      time: "",
    };
  }
  get = (uId) => {
    getData(COLLECTIONS.MATCH, uId).then(({ matches }) => {
      var react = "";
      matches.forEach((element) => {
        if (element.personId == this.state.personId) {
          react = element.react;
        }
      });
      getData(COLLECTIONS.USERS, uId).then((usr) => {
        getChatData(this.state.userId, this.state.personId).then(
          ({ _docs }) => {
            var cData = [];
            if (_docs.length > 0) {
              cData = _docs[0]._data.chatData;
            }
            this.setState({
              data: cData,
              user: {
                id: usr.id,
                image: { uri: usr.user_images[0] },
                image1:
                  react == M_PROPS.KISS ? appImages.lips : appImages.daimondPic,
                name: usr.name,
                age: getAge(usr.date_of_birth),
                location: `${usr.city}, ${usr.country}`,
              },
            });
          }
        );
      });
    });
  };
  listnerInit = async (user1, user2) => {
    let chats = {};

    // chats = await firestore()
    //   .collection(COLLECTIONS.CHATS)
    //   .where("user1", "==", user1)
    //   .where("user2", "==", user2)
    //   .get();
    // if (chats._docs.length == 0) {
    //   chats = await firestore()
    //     .collection(COLLECTIONS.CHATS)
    //     .where("user1", "==", user2)
    //     .where("user2", "==", user1)
    //     .get();
    // }

    // if (chats._docs.length > 0) {
    const observer = firestore()
      .collection(COLLECTIONS.CHATS)
      .onSnapshot(
        (querySnapshot) => {
          this.get(this.state.personId);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    this.unSub = observer;
    // }
  };
  componentDidMount() {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    this.setState({ time: hours + ":" + min });
    AsyncStorageLib.getItem(AS_KEYS.TOKEN).then((id) => {
      this.get(this.props.route.params);
      this.setState({ userId: id, personId: this.props.route.params });
      this.listnerInit(id, this.props.route.params);
    });
  }
  componentWillUnmount() {
    this.unSub();
  }
  renderDate = (date) => {
    return <Text style={styles.time}>{date}</Text>;
  };
  renderclose = () => {
    let arr = [...this.state.data];
    arr = arr.map((item) => {
      item.flag = false;
      return item;
    });
    this.setState({ data: [...arr] });
  };

  sendMessage = async () => {
    {
      let { data } = this.state;
      data.push({
        senderId: this.state.userId,
        receiverId: this.state.personId,
        message: this.state.message,
        date: this.state.time,
      });
      this.setState({ data, message: "" });
      var docId = uniqueID();

      let chats = {};

      chats = await firestore()
        .collection(COLLECTIONS.CHATS)
        .where("user1", "==", this.state.userId)
        .where("user2", "==", this.state.personId)
        .get();
      if (chats._docs.length == 0) {
        chats = await firestore()
          .collection(COLLECTIONS.CHATS)
          .where("user1", "==", this.state.personId)
          .where("user2", "==", this.state.userId)
          .get();
      }

      if (chats._docs.length == 0) {
        saveData(COLLECTIONS.CHATS, docId, {
          id: docId,
          user1: this.state.userId,
          user2: this.state.personId,
          chatData: data,
        }).then((s) => {
          this.listnerInit(this.state.userId, this.state.personId);
        });
      } else {
        saveData(COLLECTIONS.CHATS, chats._docs[0]._data.id, {
          chatData: data,
        });
      }
    }
  };
  render() {
    return (
      <View
        style={styles.container}
        // activeOpacity={0.9}
        // onPress={() => this.renderclose()}
      >
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={textColor.white}
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={appImages.cheveronbackblack} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("OtherProfile")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: responsiveWidth(3),
            }}
          >
            <View style={styles.topflatlistview}>
              <ImageBackground
                source={this.state.user.image}
                style={styles.image}
                imageStyle={styles.backstyle}
              >
                <View style={styles.card}>
                  <Image
                    source={this.state.user.image1}
                    style={styles.lipsimage}
                  />
                </View>
              </ImageBackground>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  width: responsiveWidth(60),
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: fontFamily.appTextBold,
                    marginLeft: responsiveWidth(3),
                    marginTop:
                      Platform.OS === "ios" ? responsiveHeight(0.5) : 0,
                    fontSize: responsiveFontSize(2.3),
                  }}
                >
                  {textAbstract(this.state.user.name, 14)}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.appTextRegular,
                    marginLeft: responsiveWidth(1.5),
                    marginTop:
                      Platform.OS === "ios" ? responsiveHeight(0.5) : 0,
                    fontSize: responsiveFontSize(2.3),
                  }}
                >
                  {this.state.user.age}
                </Text>
              </View>
              <View
                style={{
                  width: responsiveWidth(60),
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: fontFamily.appTextRegular,
                    marginLeft: responsiveWidth(3),
                    marginTop:
                      Platform.OS === "ios" ? responsiveHeight(0.5) : 0,
                    fontSize: responsiveFontSize(1.9),
                    color: "#8e8e8e",
                  }}
                >
                  {this.state.user.location}
                </Text>
                {/* <Text
                  style={{
                    fontFamily: fontFamily.appTextRegular,
                    marginLeft: responsiveWidth(0.5),
                    marginTop:
                      Platform.OS === "ios" ? responsiveHeight(0.5) : 0,
                    fontSize: responsiveFontSize(1.9),
                    color: "#8e8e8e",
                  }}
                >
                  {"California"}
                </Text> */}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.RBSheet.open()}>
            <Icon
              name={"shield"}
              type={"ionicon"}
              color={textColor.secondary}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>
        </View>
        {/* <KeyboardAvoidingView behavior="height"> */}
        <FlatList
          style={[styles.list, { zIndex: 0 }]}
          data={[...this.state.data].reverse()}
          keyExtractor={(item, index) => {
            return index;
          }}
          inverted
          renderItem={(message) => {
            const item = message.item;

            if (item.senderId === this.state.userId) {
              item["type"] = "out";
            } else {
              item["type"] = "in";
            }
            console.log(
              "🚀 ~ file: index.js ~ line 280 ~ Chat ~ render ~ item.type",
              item.type
            );

            let inMessage = item.type === "in";
            let outMessage = item.type === "out";
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View>
                {item.type === "in" ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.item, itemStyle]}
                    onPress={() => {
                      this.RBSheet1.open();
                    }}
                    onLongPress={() => {
                      let { data } = this.state;

                      data[message.index].flag = !data[message.index].flag;
                      this.setState({ index: data[message.index] });
                      this.setState({ data });
                    }}
                  >
                    {!inMessage}
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={this.state.user.image}
                        style={styles.user4}
                      />

                      <View
                        style={[
                          styles.balloon,
                          {
                            // marginTop: item.flag?responsiveHeight(7):null,
                            backgroundColor: inMessage
                              ? textColor.lightgrey
                              : textColor.secondary,
                          },
                        ]}
                      >
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: inMessage
                              ? textColor.primary
                              : textColor.white,
                          }}
                        >
                          {item.message}
                        </Text>
                        {item.like ? (
                          <View style={[styles.circle1]}>
                            <Icon
                              name={this.state.like}
                              type="antdesign"
                              color={textColor.secondary}
                              size={responsiveFontSize(2)}
                            />
                          </View>
                        ) : null}
                        {item.heart ? (
                          <View style={[styles.circle1]}>
                            <Icon
                              name={this.state.heart}
                              type="antdesign"
                              color={textColor.secondary}
                              size={responsiveFontSize(2)}
                            />
                          </View>
                        ) : null}
                        {item.laugh ? (
                          <View style={[styles.circle1]}>
                            <Icon
                              name={this.state.laugh}
                              type="fontisto"
                              color={textColor.secondary}
                              size={responsiveFontSize(2)}
                            />
                          </View>
                        ) : null}
                      </View>
                    </View>
                    {outMessage}
                  </TouchableOpacity>
                ) : (
                  <View
                    activeOpacity={0.8}
                    style={[styles.item, itemStyle]}
                    onPress={() => {
                      this.RBSheet1.open();
                    }}
                    onLongPress={() => {
                      let { data } = this.state;

                      data[message.index].flag = !data[message.index].flag;
                      this.setState({ index: data[message.index] });
                      this.setState({ data });
                    }}
                  >
                    {!inMessage}
                    <View
                      style={[
                        styles.balloon,
                        {
                          // marginTop: item.flag?responsiveHeight(7):null,
                          backgroundColor: inMessage
                            ? textColor.lightgrey
                            : textColor.secondary,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),

                          color: inMessage
                            ? textColor.primary
                            : textColor.white,
                        }}
                      >
                        {item.message}
                      </Text>
                      {item.like ? (
                        <View style={[styles.circle1]}>
                          <Icon
                            name={this.state.like}
                            type="antdesign"
                            color={textColor.secondary}
                            size={responsiveFontSize(2)}
                          />
                        </View>
                      ) : null}
                      {item.heart ? (
                        <View style={[styles.circle1]}>
                          <Icon
                            name={this.state.heart}
                            type="antdesign"
                            color={textColor.secondary}
                            size={responsiveFontSize(2)}
                          />
                        </View>
                      ) : null}
                      {item.laugh ? (
                        <View style={[styles.circle1]}>
                          <Icon
                            name={this.state.laugh}
                            type="fontisto"
                            color={textColor.secondary}
                            size={responsiveFontSize(2)}
                          />
                        </View>
                      ) : null}
                    </View>
                    {outMessage}
                  </View>
                )}
                <Text
                  style={{
                    alignSelf: inMessage ? "flex-start" : "flex-end",
                    color: textColor.lightgrey,
                    marginLeft: inMessage ? responsiveWidth(3) : null,
                    marginTop: responsiveHeight(-2),
                  }}
                >
                  {item.date}
                </Text>
                {item.flag ? (
                  <View>
                    <View
                      style={[
                        styles.tipview,
                        {
                          marginLeft: inMessage
                            ? responsiveWidth(10)
                            : responsiveWidth(30),
                        },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          let { data } = this.state;
                          data[message.index].like = !data[message.index].like;
                          data[message.index].laugh = false;
                          data[message.index].heart = false;
                          data[message.index].flag = !data[message.index].flag;
                          this.setState({ data });
                          this.setState({ like: "like2" });
                        }}
                      >
                        <Icon
                          name={"like2"}
                          type="antdesign"
                          color={textColor.secondary}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          let { data } = this.state;
                          data[message.index].laugh = true;
                          data[message.index].like = false;
                          data[message.index].heart = false;
                          data[message.index].flag = !data[message.index].flag;
                          this.setState({ data });
                          this.setState({ laugh: "laughing" });
                        }}
                      >
                        <Icon
                          name={"laughing"}
                          type="fontisto"
                          color={textColor.secondary}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          let { data } = this.state;
                          data[message.index].laugh = false;
                          data[message.index].like = false;
                          data[message.index].heart = true;
                          data[message.index].flag = !data[message.index].flag;
                          this.setState({ data });
                          this.setState({ heart: "hearto" });
                        }}
                      >
                        <Icon
                          name={"hearto"}
                          type="antdesign"
                          color={textColor.secondary}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </View>
            );
          }}
        />
        {/* </KeyboardAvoidingView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "height" : "position"}
          enabled
        > */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.btnSend, { backgroundColor: bggradientColor.c1 }]}
          >
            <Feather name={"plus"} size={35} color={textColor.secondary} />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              value={this.state.message}
              placeholder="Write a message..."
              placeholderTextColor={textColor.lightgrey}
              // style={{
              //   color: textColor.primary,
              //   paddingLeft: responsiveWidth(2),
              // }}
              onChangeText={(text) => this.setState({ message: text })}
            />
          </View>

          <TouchableOpacity
            style={styles.btnSend}
            onPress={() => this.sendMessage()}
          >
            <Feather name={"send"} size={30} color={textColor.secondary} />
          </TouchableOpacity>
        </View>
        <KeyboardSpacer />
        {/* </KeyboardAvoidingView> */}

        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={responsiveHeight(45)}
          openDuration={250}
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
            <View style={styles.draggableIcon} />
            <Text style={styles.SafetyText}>Safety Kit</Text>
            <TouchableOpacity
              style={styles.rbsheetbtn}
              onPress={() => {
                this.RBSheet3.open();
              }}
            >
              <Icon
                type={"entypo"}
                name={"flag"}
                color={"red"}
                size={responsiveFontSize(4.2)}
                style={{ bottom: responsiveHeight(1) }}
              />
              <View style={styles.txtView}>
                <Text
                  style={[
                    styles.rbsheetbtntxt,
                    ,
                    { color: "#8c8c8c", textTransform: "uppercase" },
                  ]}
                >
                  REPORT {textAbstract(this.state.user.name, 14)}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rbsheetbtn}
              onPress={() => {
                this.RBSheet2.open();
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
                  UNMATCH {textAbstract(this.state.user.name, 14)}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rbsheetbtn}
              onPress={() => {
                this.props.navigation.navigate(
                  "OtherProfile",
                  this.state.user.id
                );
                this.RBSheet.close();
              }}
            >
              <View style={[styles.orangeCircle, { backgroundColor: "green" }]}>
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
              style={[
                styles.rbsheetbtn,
                // {
                //   borderBottomWidth: responsiveWidth(0.1),
                //   borderBottomColor: textColor.lightgrey,
                // },
              ]}
              onPress={() => {
                this.RBSheet.close();
              }}
            >
              <View
                style={[
                  styles.orangeCircle,
                  { backgroundColor: textColor.placholderColor },
                ]}
              >
                <Icon
                  type={"entypo"}
                  name={"cross"}
                  color={"white"}
                  size={responsiveFontSize(3)}
                />
              </View>
              <Text
                style={[
                  styles.rbsheetbtntxt2,
                  ,
                  { color: "#8c8c8c", textTransform: "uppercase" },
                ]}
              >
                CLEAR CONVERSATION
              </Text>
            </TouchableOpacity>
          </View>

          <RBSheet
            ref={(ref) => {
              this.RBSheet2 = ref;
            }}
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
                    source={this.state.user.image}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: responsiveHeight(7),
                    }}
                  />
                </View>
                <Text
                  style={[
                    styles.unMatchText,
                    { marginTop: responsiveHeight(6) },
                  ]}
                >
                  {`Are you sure you want to unmatch \n ${textAbstract(
                    this.state.user.name,
                    14
                  )}`}
                </Text>
                {/* <Text style={styles.unMatchText}>with this person? </Text> */}

                <View style={styles.btnGroup}>
                  <TouchableOpacity
                    style={styles.noBtn}
                    onPress={() => {
                      this.RBSheet.close();
                      this.RBSheet2.close();
                    }}
                  >
                    <Text style={styles.noTxt}>NO</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.yesBtn}
                    onPress={() => {
                      this.RBSheet.close();
                      this.RBSheet2.close();
                    }}
                  >
                    <Text style={styles.yesTxt}>YES</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </RBSheet>

          <RBSheet
            ref={(ref) => {
              this.RBSheet3 = ref;
            }}
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
                    source={this.state.user.image}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: responsiveHeight(7),
                    }}
                  />
                </View>
                <Text
                  style={[
                    styles.unMatchText,
                    { marginTop: responsiveHeight(6) },
                  ]}
                >
                  {`Are you sure you want to Report \n ${textAbstract(
                    this.state.user.name,
                    14
                  )}`}
                </Text>
                {/* <Text style={styles.unMatchText}>with this person? </Text> */}

                <View style={styles.btnGroup}>
                  <TouchableOpacity
                    style={styles.noBtn}
                    onPress={() => {
                      this.RBSheet.close();
                      this.RBSheet3.close();
                    }}
                  >
                    <Text style={styles.noTxt}>NO</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.yesBtn}
                    onPress={() => {
                      this.RBSheet.close();
                      this.RBSheet3.close();
                    }}
                  >
                    <Text style={styles.yesTxt}>YES</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </RBSheet>
        </RBSheet>
        <RBSheet
          ref={(ref) => {
            this.RBSheet1 = ref;
          }}
          height={200}
          openDuration={250}
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
            <View style={styles.draggableIcon} />
            <TouchableOpacity
              style={[
                styles.rbsheetbtn,
                {
                  borderBottomWidth: responsiveWidth(0.1),
                  borderBottomColor: textColor.lightgrey,
                },
              ]}
              onPress={() => this.RBSheet1.close()}
            >
              <Text style={[styles.rbsheetbtntxt]}>Report this Message</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    );
  }
}
