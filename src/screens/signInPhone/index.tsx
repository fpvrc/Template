import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Platform, Text, TextInput, Alert} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CountryPicker from 'react-native-region-country-picker';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import auth from '@react-native-firebase/auth';
import ProgressBar from 'react-native-progress/Bar';

const options = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false,
};

const SignInPhone: React.FC<{
  navigation: any;
  signInPhone: (phone_number: string) => void;
}> = ({navigation, signInPhone}) => {
  const {colors, fonts} = useTheme() as any;
  const [phone_number, setNumber] = useState('');
  const [countryData, setCountryData] = useState('1');
  const [confirm, setConfirm] = useState(null) as any;
  const [loading, setLoading] = useState('');
  const inputRef = useRef<any>();
  const inputRef2 = useRef<any>();
  let countryRef;

  const changeText = (new_text: string) => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);
    setNumber(new_text);
  };
  const changeCode = (new_text: string) => {
    console.log(new_text);
  };
  const reFocus = () => inputRef.current.focus();
  const newCountry = (data: any) => {
    setCountryData(data.callingCode);
  };
  const initCountryRef = (ref: any) => {
    countryRef = ref;
  };

  useEffect(() => {
    if (phone_number.length === 10) {
      try {
        (async () => {
          setLoading('phone_number');
          console.log(`+${countryData}${phone_number}`);
          const confirmation = await auth().signInWithPhoneNumber(
            `+${countryData}${phone_number}`,
          );
          console.log('done');
          console.log(confirmation);
          setLoading('');
          inputRef.current.blur();
          inputRef2.current.focus();
          setConfirm(confirmation);
        })();
      } catch (error) {
        console.log(error);
      }
    } else if (phone_number.length === 0) {
      setLoading('');
    }
  }, [phone_number]);

  useEffect(() => {
    inputRef.current.focus();
  });

  // Handle user state changes
  const onAuthStateChanged = (user: any) => {
    if (user) {
      Alert.alert('Hi', `${user}`);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundWhite,
        padding: wp('4%'),
      }}>
      <View style={{marginTop: hp('35%')}}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: fonts.bold,
            color: colors.primaryBlack,
          }}>
          Phone Number
        </Text>
        <View style={{flexDirection: 'row', marginTop: hp('3%')}}>
          <CountryPicker
            countryPickerRef={initCountryRef}
            enable={true}
            darkMode={false}
            countryCode={countryData === '' ? 'US' : countryData}
            containerConfig={{
              showFlag: true,
              showCallingCode: true,
              showCountryName: false,
              showCountryCode: false,
            }}
            onSelectCountry={newCountry}
            onClose={reFocus}
            containerStyle={{
              container: {},
              flagStyle: {
                fontSize: 30,
              },
              callingCodeStyle: {
                fontSize: 30,
                fontFamily: fonts.regular,
              },
            }}
            modalStyle={{
              container: {},
              searchStyle: {fontFamily: fonts.regular},
              tileStyle: {fontFamily: fonts.regular},
              itemStyle: {
                itemContainer: {},
                flagStyle: {},
                countryCodeStyle: {fontFamily: fonts.regular},
                countryNameStyle: {fontFamily: fonts.regular},
                callingNameStyle: {fontFamily: fonts.regular},
              },
            }}
            title={'Country'}
            searchPlaceholder={'Search'}
            showCloseButton={true}
            showModalTitle={true}
          />
          <TextInput
            ref={inputRef as any}
            keyboardType="numeric"
            keyboardAppearance={'light'}
            onChangeText={changeText}
            style={{
              height: wp('10%'),
              fontSize: 30,
              fontFamily: fonts.regular,
              letterSpacing: wp('1%'),
              marginLeft: wp('1%'),
              flex: 1,
            }}
          />
        </View>
        <View
          style={{
            width: wp('92%'),
            height: hp('.1%'),
            backgroundColor: colors.backgroundLightGrey,
          }}
        />
        <ProgressBar
          indeterminate={true}
          width={wp('92%')}
          borderWidth={0}
          height={hp('.1%')}
          useNativeDriver={true}
          style={{display: loading === 'phone_number' ? 'flex' : 'none'}}
        />
        <TextInput
          placeholder={'code...'}
          ref={inputRef2 as any}
          keyboardType="numeric"
          keyboardAppearance={'light'}
          onChangeText={changeCode}
          textContentType="oneTimeCode"
          style={{
            height: wp('10%'),
            fontSize: 30,
            fontFamily: fonts.regular,
            letterSpacing: wp('1%'),
            marginLeft: wp('1%'),
            marginTop: hp('3%'),
          }}
        />
        <View
          style={{
            width: wp('92%'),
            height: hp('.1%'),
            backgroundColor: colors.backgroundLightGrey,
          }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPhone);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
