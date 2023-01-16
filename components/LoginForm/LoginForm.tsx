import { View, Image, ToastAndroid } from "react-native";
import { Text, TextInput } from "@react-native-material/core";

import AppButton from "../AppButton/AppButton.component";

import LoginFormStyles from "./LoginForm.styles";
import { useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../services/api.service";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const response = await createAPIEndpoint(ENDPOINTS.GETTOKEN).login(
      username,
      password
    );
    if (response) {
      console.log(response.data);
      ToastAndroid.show("You are now logged in.", ToastAndroid.SHORT);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <View style={LoginFormStyles.container}>
      <Image
        source={{
          uri: "https://www.impressico.com/wp-content/uploads/2020/09/impressico-logo.png",
        }}
        style={LoginFormStyles.image}
      />
      <Text style={LoginFormStyles.heading}>Sign in to Asset Management</Text>
      <Text style={LoginFormStyles.subheading}>Enter your details below</Text>
      <TextInput
        style={LoginFormStyles.input}
        placeholder="Username"
        onChangeText={(newText) => setUsername(newText)}
        defaultValue={username}
        variant="standard"
        maxLength={15}
      />
      <TextInput
        style={LoginFormStyles.input}
        placeholder="Password"
        onChangeText={(newText) => setPassword(newText)}
        defaultValue={password}
        variant="standard"
        secureTextEntry
        maxLength={32}
      />
      <AppButton onPress={handleSubmit} title="Log in" />
    </View>
  );
};

export default LoginForm;
