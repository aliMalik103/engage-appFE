/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import { requests } from "../api/request";
import AsyncStorage from "@react-native-community/async-storage";
export default function Dashboard({ navigation }) {
  const [joinCallShow, setJoinCallShow] = useState(true);
  const [confirmButtonShow, setConfirmButtonShow] = useState(true);
  const [userFullName, setuserFullName] = useState('');
  useEffect(() => {
    getSessions();
  }, []);

  const getSessions = async () => {
    setuserFullName(await AsyncStorage.getItem('userName'))
    var sessions = await requests.getSessions();
    sessions.map((session) => {
      if (session.active == 1) {
        setJoinCallShow(true);
      }
      if (session.active == 2) {
        setConfirmButtonShow(true);
      }
    });
  };
  return (
    <Background>
      <Logo />
      <Header>Welcome Back</Header>
      <Header>{userFullName}</Header>

      <Button
        mode="outlined"
        icon="account"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "UpdateProfile" }],
          })
        }
      >
        Profile
      </Button>
      {joinCallShow && (
        <Button
          mode="outlined"
          icon="video"
          onPress={() =>
            navigation.navigate("CallScreen")
          }
        >
          Join Call
        </Button>
      )}
      {confirmButtonShow && (
        <Button
          mode="outlined"
          icon="check-bold"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "LoginScreen" }],
            })
          }
        >
          Confirm Presence in Session
        </Button>
      )}
      <Button
        icon="logout"
        // mode="outlined"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Logout
      </Button>
    </Background>
  );
}
