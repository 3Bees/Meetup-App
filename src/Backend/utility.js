import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { Alert, Linking } from "react-native";
import COLLECTIONS from "./collecctions";
export async function uploadProductImage(uri, name) {
  try {
    console.log(name);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref("/brand/" + name);
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        "state_changed",
        () => {},
        (err) => {
          reject(err);
        },

        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        }
      );
    });
  } catch (err) {
    console.log("uploadImage error: " + err.message);
  }
}
export const callNumber = (phone) => {
  console.log("callNumber ----> ", phone);
  let phoneNumber = phone;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Phone number is not available");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
};
export async function uploadChatImage(uri, name) {
  try {
    console.log(name);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref("/chats/" + name);
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        "state_changed",
        () => {},
        (err) => {
          reject(err);
        },

        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        }
      );
    });
  } catch (err) {
    console.log("uploadImage error: " + err.message);
  }
}
export async function uploadRecipeImage(uri, name) {
  try {
    console.log(name);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref("/recipe/" + name);
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        "state_changed",
        () => {},
        (err) => {
          reject(err);
        },

        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        }
      );
    });
  } catch (err) {
    console.log("uploadImage error: " + err.message);
  }
}
export async function uploadProfileImage(uri, name) {
  try {
    console.log(name);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref("/profile/" + name);
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        "state_changed",
        () => {},
        (err) => {
          reject(err);
        },

        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        }
      );
    });
  } catch (err) {
    console.log("uploadImage error: " + err.message);
  }
}
export async function getDocByDesc(collection, key) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .orderBy(key, "desc")
    .get();
  await querySnapshot.forEach(function (doc) {
    // console.log('doc id=>',doc.id)
    data.push(doc.data());
  });
  return data;
}
export async function uploadPortfolio(uri, name) {
  try {
    console.log(name);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref("/portfolio/" + name);
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        "state_changed",
        () => {},
        (err) => {
          reject(err);
        },

        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          console.log(url);
          resolve(url);
        }
      );
    });
  } catch (err) {
    console.log("uploadImage error: " + err.message);
  }
}
export async function uploadProductDoc(uri, name) {
  try {
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    const ref = storage().ref("/Doc/" + name);
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        "state_changed",
        () => {},
        (err) => {
          reject(err);
        },

        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        }
      );
    });
  } catch (err) {
    console.log("uploadImage error: " + err);
  }
}
export async function getAllOfCollection(collection) {
  let data = [];
  let querySnapshot = await firestore().collection(collection).get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push(doc.data());
    } else {
      console.log("No document found!");
    }
  });
  return data;
}
export async function getAllOfIdeas(
  collection,
  ownerId,
  collabrator_id1,
  collabrator_id2
) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .where("collabrator_id1", "==", collabrator_id1)
    // .where('collabrator_id1','==',ownerId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        data.push(documentSnapshot.data());
      });
    });

  let querySnapshot1 = await firestore()
    .collection(collection)
    .where("collabrator_id2", "==", collabrator_id2)
    //.where('collabrator_id1','==',ownerId)
    .get()
    .then((querySnapshot1) => {
      querySnapshot1.forEach((documentSnapshot) => {
        data.push(documentSnapshot.data());
      });
    });

  let querySnapshot2 = await firestore()
    .collection(collection)
    .where("ownerId", "==", ownerId)
    //.where('collabrator_id1','==',ownerId)
    .get()
    .then((querySnapshot2) => {
      querySnapshot2.forEach((documentSnapshot) => {
        data.push(documentSnapshot.data());
      });
    });

  console.log(data);
  return data;
}
export function uniqueID() {
  function chr4() {
    return Math.random()?.toString(16).slice(-4);
  }
  return (
    chr4() +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    chr4() +
    chr4()
  );
}
export async function getMyOffers(ownerID) {
  let data = [];
  let querySnapshot = await firestore().collection("ideas").get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      if (doc.data().offers) {
        doc.data().offers.map((offer) => {
          if (offer.ownerID == ownerID) {
            data.push(offer);
          }
        });
      }
    } else {
      console.log("No document found!");
    }
  });
  return data;
}

export function getData(collection, doc, objectKey) {
  // check if data exists on the given path
  if (objectKey === undefined) {
    return firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return false;
        }
      });
  } else {
    return firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists && doc.data()[objectKey] != undefined) {
          return doc.data()[objectKey];
        } else {
          return false;
        }
      });
  }
}
export function getDataWhere(collection, property, condition, value) {
  return firestore()
    .collection(collection)
    .where(property, condition, value)
    .get()
    .then(function ({ _docs }) {
      if (_docs) {
        if (_docs.length > 0) {
          return _docs[0]._data;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
}
export async function getChatData(user1, user2) {
  let chats = {};

  chats = await firestore()
    .collection(COLLECTIONS.CHATS)
    .where("user1", "==", user1)
    .where("user2", "==", user2)
    .get();
  if (chats._docs.length == 0) {
    chats = await firestore()
      .collection(COLLECTIONS.CHATS)
      .where("user1", "==", user2)
      .where("user2", "==", user1)
      .get();
  }

  return chats;
}
export async function getDocByKeyValue(collection, key, value) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .where(key, "==", value)
    .get();
  await querySnapshot.forEach(function (doc) {
    // console.log('doc id=>',doc.id)
    data.push(doc.data());
  });
  return data;
}

export async function upDateCollectionData(collection, doc, jsonObject) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .update(jsonObject)
    .then(async () => {
      console.log("Document successfully written!");
      return true;
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}

export async function updateData(collection, doc, jsonObject) {
  const success = await firestore()
    .collection(collection)
    .doc(doc)
    .update({ photo: jsonObject })
    .then(() => {
      return true;
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      return false;
    });
}

export async function saveData(collection, doc, jsonObject) {
  let success = false;
  await firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, { merge: true })
    .then(() => {
      success = true;
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      success = false;
    });
  return success;
}

export async function deleteDocument(collection, doc, jsonObject) {
  let success = false;
  await firestore()
    .collection(collection)
    .doc(doc)
    .delete()
    .then(() => {
      success = true;
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      success = false;
    });
  return success;
}

export async function addToArray(collection, doc, array, value) {
  let docRef = await firestore().collection(collection).doc(doc);
  // console.log('Value',value)
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array] != undefined) {
    // console.log('update',value)
    docRef.update({
      [array]: firestore.FieldValue.arrayUnion(value),
    });
  } else {
    // console.log('saveData',value)
    saveData(collection, doc, { [array]: [value] });
  }
}
export async function removeItemfromArray(collection, doc, array, index) {
  let docRef = await firestore().collection(collection).doc(doc);
  let docData = await docRef.get();

  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef.update({
      [array]: firestore.FieldValue.arrayRemove(docData.data()[array][index]),
    });
  }
}
export async function updateField(collection, doc, field, fieldValue) {
  // console.log('field',[field])
  let db = firestore();
  db.collection(collection)
    .doc(doc)
    .update({
      [field]: fieldValue,
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}
