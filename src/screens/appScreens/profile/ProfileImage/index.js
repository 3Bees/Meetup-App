import React, { useState,useRef } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { appImages } from "../../../../assets/utility";
import { textColor } from "../../../../constants/colors";
import styles from "./style";
import Carousel, { Pagination } from "react-native-snap-carousel";
export default function ProfileImage(props) {
  const [flag1, setFlag1] = useState("");
  const [baloon, setBaloon] = useState(false);
  const [heart, setHeart] = useState("");
  const [like, setLike] = useState("");
  const [laugh, setLaugh] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [imageSource, setSource] = useState(0);

  let carousel = useRef();

  const [dataSource, setDataSource] = useState([
    {
      image: appImages.user1,
      baloonFlag: false,
      like: false,
      heart: false,
      laugh: false,
    },
    {
      image: appImages.user2,
      baloonFlag: false,
      like: false,
      heart: false,
      laugh: false,
    },
    {
      image: appImages.user3,
      baloonFlag: false,
      like: false,
      heart: false,
      laugh: false,
    },
    {
      image: appImages.user1,
      baloonFlag: false,
      like: false,
      heart: false,
      laugh: false,
    },
    {
      image: appImages.user2,
      baloonFlag: false,
      like: false,
      heart: false,
      laugh: false,
    },
    {
      image: appImages.user3,
      baloonFlag: false,
      like: false,
      heart: false,
      laugh: false,
    },
  ]);




  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.header}>
        <Icon
          name="chevron-left"
          type="feather"
          color={textColor.white}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </View>
      <View>
        <View>
          <FlatList
            data={dataSource}
            horizontal={true}
            contentContainerStyle={{ height: 3, width: '100%', justifyContent: 'space-between', alignItems: 'center',  }}
            renderItem={({ item, index }) => (
              <View style={{ height: 3, width: responsiveWidth(100)/dataSource.length, backgroundColor: index === activeSlide ? 'white' : 'rgba(255,255,255,0.2)', marginHorizontal: responsiveWidth(0.5) }}>

              </View>
            )}
          />
        </View>
        <Carousel
          ref={carousel}

          enableSnap={true}
          data={dataSource}
          inactiveSlideScale={1}
          onSnapToItem={(index) => setActiveSlide(index)}
          sliderWidth={responsiveWidth(100)}
          itemWidth={responsiveWidth(100)}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.95}
              onLongPress={() => {
                let arr = [...dataSource];
                arr.forEach((element) => {
                  element.baloonFlag = false;
                });
                arr[index].baloonFlag = true;
                setFlag1(arr[index]);
                setDataSource(arr);
              }}
            >
              <Image
                source={item.image}
                style={{
                  height: responsiveHeight(70),
                  width: responsiveWidth(100),
                }}
              />
               <TouchableOpacity
                    style={[styles.circlecard2]}
                    onPress={() => carousel.current.snapToItem(activeSlide-1)}
                    // onPress={()=>alert('helooo')}
                    activeOpacity={1}
                  >
                    <Icon
                      name={"chevron-back"}
                      type={"ionicon"}
                      color={"transparent"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.circlecard3]}
                    onPress={() => carousel.current.snapToItem(activeSlide+1)}
                    activeOpacity={1}
                  >
                    <Icon
                      name={"chevron-forward"}
                      type={"ionicon"}
                      color={"transparent"}
                    />
                  </TouchableOpacity>
              {/* {item.like ? (
                <View style={[styles.emoji]}>
                  <Icon
                    name={"like2"}
                    type="antdesign"
                    color={textColor.secondary}
                  />
                </View>
              ) : item.laugh ? (
                <View style={[styles.emoji]}>
                  <Icon
                    name={"laughing"}
                    type="fontisto"
                    color={textColor.secondary}
                  />
                </View>
              ) : item.heart ? (
                <View style={[styles.emoji]}>
                  <Icon
                    name={"hearto"}
                    type="antdesign"
                    color={textColor.secondary}
                  />
                </View>
              ) : null} */}

              <View style={styles.baloon}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    let arr = [...dataSource];
                    arr.forEach((element) => {
                      element.baloonFlag = false;
                    });
                    arr[index].baloonFlag = false;
                    arr[index].like = true;
                    arr[index].heart = false;
                    arr[index].laugh = false;

                    setFlag1(arr[index]);
                    setDataSource(arr);
                    setLike("like2");
                  }}
                  style={{ zIndex: 3, height: responsiveWidth(15), width: responsiveWidth(15), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: responsiveWidth(15) }}

                >
                  <Icon
                    name={item.like ? "like1" : "like2"}
                    type="antdesign"
                    color={textColor.secondary}
                    size={40}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    let arr = [...dataSource];
                    arr.forEach((element) => {
                      element.baloonFlag = false;
                    });
                    arr[index].baloonFlag = false;
                    arr[index].like = false;
                    arr[index].heart = false;
                    arr[index].laugh = true;
                    setFlag1(arr[index]);
                    setDataSource(arr);
                    setLaugh("laughing");
                  }}
                  style={{ zIndex: 3, height: responsiveWidth(15), width: responsiveWidth(15), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',  borderRadius: responsiveWidth(15) }}

                >
                  {!item.laugh ?
                    <Icon
                      name={"laughing"}
                      type="fontisto"
                      color={textColor.secondary}
                      size={40}

                    />
                    :
                    <Image
                      source={require('../../../../assets/images/laugh.png')}
                      style={{ width: responsiveHeight(5.3), height: responsiveHeight(5.3), resizeMode: 'contain' }}
                    />
                  }
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    let arr = [...dataSource];
                    arr.forEach((element) => {
                      element.baloonFlag = false;
                    });
                    arr[index].baloonFlag = false;
                    arr[index].like = false;
                    arr[index].heart = true;
                    arr[index].laugh = false;
                    setFlag1(arr[index]);
                    setDataSource(arr);
                    setHeart("hearto");
                  }}
                  style={{ zIndex: 3, height: responsiveWidth(15), width: responsiveWidth(15), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',  borderRadius: responsiveWidth(15), }}

                >
                  <Icon
                    name={item.heart ? "heart" : "hearto"}
                    type="antdesign"
                    color={textColor.secondary}
                    size={40}
                  />
                </TouchableOpacity>
               
              </View>

            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}