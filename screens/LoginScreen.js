import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>LoginScreen</Text>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Text>Go to home</Text>
      </Pressable>
      <Text>Hello Again!</Text>
      <Text>Welcome</Text>
      <Text>Back</Text>
      <View>
        <View  style={{borderWidth:1}}>
          <TextInput style={{backgroundColor:"red"}} placeholder="Email Address" />
        </View>
        <TextInput placeholder="Password" />
        <Pressable>
          <Text>Sign In</Text>
        </Pressable>
      </View>
      <View>
        <Pressable>
          <Text>Forgot Your Password</Text>
        </Pressable>
        <Pressable>
          <Text>SignUp</Text>
        </Pressable>
      </View>
    </View>
  );
}
