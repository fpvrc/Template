import React from 'react';
import {StyleSheet, View, Platform, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const backgroundImage = require('./path/to/image.png');

const Landing: React.FC<{navigation: any}> = ({navigation}) => {
  const {colors, fonts} = useTheme() as any;
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundWhite}}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          fontFamily: fonts.regular,
          marginTop: hp('10%'),
        }}>
        React Native Template
      </Text>
    </View>
  );
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
