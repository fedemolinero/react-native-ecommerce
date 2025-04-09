import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const LogoTitle = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('@/assets/profile-img.jpg')}
        accessibilityLabel="Profile logo"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 20,
  },
});

export default React.memo(LogoTitle);
