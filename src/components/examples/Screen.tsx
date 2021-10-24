import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {connect} from 'react-redux';

interface FullName {
  navigation: any;
}

const Screen = (props: FullName) => {
  const {colors, fonts} = useTheme();
  return <View style={{flex: 1}}></View>;
};

const mapStateToProps = (state: object) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);

const styles = StyleSheet.create({
  ...Platform.select({
    ios: {},
    android: {},
  }),
});
