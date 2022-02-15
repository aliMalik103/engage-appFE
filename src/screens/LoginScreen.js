/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { requests } from "../api/request";
import AsyncStorage from "@react-native-community/async-storage";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [authCode, setAuthCode] = useState({ value: "", error: "" });

  const onLoginPressed = async() => {
    // const emailError = emailValidator(email.value)
    // const passwordError = passwordValidator(password.value)
    // if (emailError || passwordError) {
    //   setEmail({ ...email, error: emailError })
    //   setAuthCode({ ...authCode, error: passwordError })
    //   return
    // }
    
    requests.loginUser(email.value, authCode.value).then((res) => {
      AsyncStorage.setItem("userToken",authCode.value)
      AsyncStorage.setItem("userName",res.data.fullname)
      AsyncStorage.setItem("userId",res.data.fullname)
      AsyncStorage.setItem("user",JSON.stringify(res.data))
      navigation.navigate("Dashboard");
     
    });
  };

  return (
    <Background>
      <Logo />
      <TextInput
        label="Email Address"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        icon="email"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Authentication Code"
        returnKeyType="done"
        value={authCode.value}
        icon="key"
        onChangeText={(text) => setAuthCode({ value: text, error: "" })}
        error={!!authCode.error}
        errorText={authCode.error}
        // secureTextEntry
      />
      <Button mode="outlined" onPress={onLoginPressed} icon="key">
        Login
      </Button>
      <View style={styles.row}>
        <Text>Auth code not Working </Text>
        <TouchableOpacity onPress={() => navigation.replace("ResendCode")}>
          <Text style={styles.link}>Resend Auth Code!</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
