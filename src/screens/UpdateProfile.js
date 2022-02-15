/* eslint-disable no-undef */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Image} from 'react-native';

import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import DropDownList from '../components/DropDown';
import {theme} from '../core/theme';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import {emailValidator} from '../helpers/emailValidator';
import {nameValidator} from '../helpers/nameValidator';
import AsyncStorage from '@react-native-community/async-storage';
import {requests} from '../api/request';

export default function UpdateProfile({navigation}) {
  const [user, setUser] = useState({});
  const [showDropDown, setShowDropDown] = useState(false);
  const [languagesList, setLanguagesList] = useState([
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'Spanish',
      value: 'es',
    },
    {
      label: 'Polish',
      value: 'pl',
    },
  ]);
  useEffect(() => {
    getUserData();
  }, []);

  const userDataOnChange = e => {
    setUser({...user, [e.name]: e.value});
  };

  const getUserData = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem('user')));
  };

  const onLoginPressed = () => {
    requests.updateUser(user).then(res => {
      AsyncStorage.setItem('user', JSON.stringify(user));
      AsyncStorage.setItem('userName', user.fullname);
    });
  };

  return (
    <Background>
      <BackButton
        goBack={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'Dashboard'}],
          })
        }
      />
      <Image
        source={require('../assets/setting.jpg')}
        style={{width: 100, height: 100}}
      />
      <Header>Update Your Information</Header>
      <Paragraph>Here you can update your settings</Paragraph>
      <TextInput
        label="Display Name"
        returnKeyType="next"
        value={user.fullname}
        onChangeText={text => userDataOnChange({value: text, name: 'fullname'})}
        autoCapitalize="none"
        icon="account"
      />
      <TextInput
        label="Email Address"
        returnKeyType="next"
        value={user?.email}
        onChangeText={text => userDataOnChange({value: text, name: 'email'})}
        autoCapitalize="none"
        icon="email"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Authentication Code"
        returnKeyType="done"
        value={user?.auth?.toString()}
        icon="key"
        onChangeText={text => userDataOnChange({value: text, name: 'auth'})}

        // secureTextEntry
      />
      <DropDownList
        label={'Translation Language'}
        mode={'outlined'}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={user.translation}
        setValue={value =>
          userDataOnChange({value: value, name: 'translation'})
        }
        list={languagesList}
      />
      <Button mode="outlined" onPress={onLoginPressed} icon="content-save">
        Save Changes
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotname: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
