import { View, Text, ScrollView, Alert, Image } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { router, Link } from 'expo-router';
import { signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Missing Fields");
      return;
    }

    setSubmitting(true);
    try {
      const result = await signIn(form.email, form.password);
      setUser(result);
      setIsLogged(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to ElecThinker
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
