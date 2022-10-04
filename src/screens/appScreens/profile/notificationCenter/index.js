import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { styles } from "./style";
import { Header } from "../../../../components/header";
import { textColor } from "../../../../constants/colors";
import { Switch, Icon } from "react-native-elements";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const AppScreen = (props) => {
  const [enable, setEnable] = useState(true);
  const [newMatch, setNewMatch] = useState(true);
  const [newMessage, setNewMessage] = useState(true);
  const [keeboNews, setKeeboNews] = useState(true);
  const [keeboTips, setKeeboTips] = useState(true);
  const [] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={textColor.white} />
      <View
        style={{ marginTop: Platform.OS === "ios" ? responsiveHeight(1) : 0 }}
      >
        <Header
          title={"Notifications Settings"}
          onpress={() => props.navigation.goBack()}
          backIcon={"arrow-back-ios"}
          backIcontype={"material"}
          addicon={"arrow-back-ios"}
          addicontype={"material"}
          color={textColor.white}
        />
      </View>

      <View style={styles.lineview} />
      <View>
        <View style={styles.TextInpute}>
          <Text style={styles.lable}>Enable Notifications</Text>
          <Switch
            value={enable}
            onChange={(value) => setEnable(!enable)}
            color={textColor.secondary}
          />
        </View>
        <View style={styles.TextInpute}>
          <Text style={styles.lable}>New Matches</Text>
          <Switch
            value={newMatch}
            onChange={(value) => setNewMatch(!newMatch)}
            color={textColor.secondary}
          />
        </View>
        <View style={styles.TextInpute}>
          <Text style={styles.lable}>New Messages</Text>
          <Switch
            value={newMessage}
            onChange={(value) => setNewMessage(!newMessage)}
            color={textColor.secondary}
          />
        </View>
        <View style={styles.TextInpute}>
          <Text style={styles.lable}>Keebo News</Text>
          <Switch
            value={keeboNews}
            onChange={(value) => setKeeboNews(!keeboNews)}
            color={textColor.secondary}
          />
        </View>
        <View style={styles.TextInpute}>
          <Text style={styles.lable}>Keebo Tips</Text>
          <Switch
            value={keeboTips}
            onChange={(value) => setKeeboTips(!keeboTips)}
            color={textColor.secondary}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.goBack()}
      >
        <Text style={styles.buttontxt}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AppScreen;
