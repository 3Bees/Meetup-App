import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

const THUMB_RADIUS = 21;

const Thumb = () => {
  return (
    <View style={styles.root}/>
  );
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 1.8,
    height: THUMB_RADIUS * 1.8,
    borderRadius: THUMB_RADIUS,
    borderWidth: 7,
    borderColor: '#fff',
    backgroundColor: '#0384BB',
  },
});

export default memo(Thumb);
