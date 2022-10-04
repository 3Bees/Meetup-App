import AsyncStorageLib from "@react-native-async-storage/async-storage";
import COLLECTIONS from "../../../Backend/collecctions";
import {
  getAllOfCollection,
  getData,
  saveData,
} from "../../../Backend/utility";
import AS_KEYS from "../../../constants/asynckeys";
import { getAge, getDistanceFromLatLonInKm } from "../../../global/helpers";

export const get_profiles = async (userId) => {
  var stateArray = [];

  var data = await getAllOfCollection(COLLECTIONS.USERS);

  data = data.sort(function (left, right) {
    return left.hasOwnProperty("boostMe")
      ? -1
      : right.hasOwnProperty("boostMe")
      ? 1
      : 0;
  });

  var usr = await getData(COLLECTIONS.USERS, userId);
  var per = await getData(COLLECTIONS.PREFERENCE, userId);
  console.log(
    "🚀 ~ file: services.js ~ line 26 ~ constget_profiles= ~ per",
    JSON.stringify(per, null, 2)
  );
  if (per) {
    data = data.filter((val, index) => {
      var dist = getDistanceFromLatLonInKm(
        val.location.latitude,
        val.location.longitude,
        usr.location.latitude,
        usr.location.longitude
      );

      return (
        val.id !== userId &&
        getAge(val.date_of_birth) >= per.ageFrom &&
        getAge(val.date_of_birth) <= per.ageTo &&
        per.interested.includes(val.gender) &&
        val.user_images != null &&
        val.date_of_birth != "" &&
        val.occupation != "" &&
        val.gender != "" &&
        val.location != ""
        // per.distance >= dist
      );
    });
  } else {
    data = data.filter((val, index) => {
      return (
        val.id !== userId &&
        val.user_images != null &&
        val.date_of_birth != "" &&
        val.occupation != "" &&
        val.gender != "" &&
        val.city != "" &&
        val.country != ""
      );
    });
  }
  if (data.length > 3) data = getRandom(data, 3);

  data.forEach((element) => {
    var imagesArray = [];

    element.user_images.forEach((img) => {
      imagesArray.push({
        source: { uri: img },
        title: "Paris",
        width: 806,
        height: 720,
      });
    });
    stateArray.push({
      image: imagesArray,
      id: element.id,
      name: `${element.name} `,
      age: getAge(element.date_of_birth),
      occupation: element.occupation,
      location: `${element.city}, ${element.country}`,
      interest: element.interest,
      distance: `${getDistanceFromLatLonInKm(
        element.location.latitude,
        element.location.longitude,
        usr.location.latitude,
        usr.location.longitude
      )} Miles Away`,
      txt: "",
      Movie: "",
      kChecked: false,
      diamondChecked: false,
      crossChecked: false,
      isActive: false,
      giftType: "",
      isRing: false,
      source: imagesArray[0].source,
    });
  });

  for (let index = 0; index < stateArray.length; index++) {
    const element = stateArray[index];
    var { Prompts } = await getData(COLLECTIONS.PROMPTS, element.id);
    if (Prompts)
      if (Prompts.length > 0) {
        Prompts.forEach((p) => {
          if (p.status) {
            stateArray[index].txt = p.title;
            stateArray[index].Movie = p.details;
          }
        });
      }
  }

  return stateArray;
};

const getRandom = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

export const saveMatch = async (
  react,
  personId,
  userId,
  checkMatchState,
  matches,
  setMatches
) => {
  var state = checkMatchState;

  var foundState = false;
  state.forEach((element, index) => {
    if (element.personId === personId) {
      foundState = true;
      state[index].react = react;
    }
  });

  var model = {
    react: react,
    personId: personId,
  };
  if (!foundState) state.push(model);

  if (!matches) {
    matches = [];
  } else {
    let found = false;
    let indexA = 0;
    matches.forEach((element, index) => {
      if (element.personId == personId) {
        found = true;
        indexA = index;
      }
    });
    if (found) {
      matches[indexA].react = react;
      // await saveData(COLLECTIONS.MATCH, userId, { matches: matches });
      setMatches(matches);

      return state;
    }
  }

  matches.push(model);
  // await saveData(COLLECTIONS.MATCH, userId, { matches: matches });
  setMatches(matches);

  return state;
};

export function uniqArray(a) {
  a = a.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );
  return a;
}
