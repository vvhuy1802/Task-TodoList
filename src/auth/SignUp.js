import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
const SignUp = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  
  const handleSignUp = async () => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        var user = userCredential.user;
        firestore()
          .collection('Users')
          .doc(user.uid)
          .set({
            name: name,
            email: email,
          })
          .then(() => {
            setEmail('');
            setPassword('');
            setName('');
            ToastAndroid.show('Signed Up Successfully', ToastAndroid.SHORT);
            navigation.navigate('SignIn');
            console.log('User added!');
          })
          .catch(error => {
            if (error.code == 'auth/email-already-in-use') {
              ToastAndroid.show(
                'That email address is already in use!',
                ToastAndroid.SHORT,
              );
            }
            if (error.code == 'auth/invalid-email') {
              ToastAndroid.show(
                'That email address is invalid!',
                ToastAndroid.SHORT,
              );
            } else {
              console.error(error);
            }
          });
      });
  };
  const handleNavSignIn = () => {
    setName('');
    setEmail('');
    setPassword('');
    navigation.navigate('SignIn');
  };
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Text style={{color: '#30D5C8', fontSize: 50, fontWeight: 'bold'}}>
          Sign Up
        </Text>
        <Text style={{marginTop: 10}}>
          Create an account to get all features.
        </Text>
      </View>
      <View>
        <TextInput
          style={{
            marginTop: 30,
            width: 320,
            height: 50,
            borderWidth: 1,
            borderColor: '#30D5C8',
            borderRadius: 10,
            paddingLeft: 10,
          }}
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={{
            marginTop: 30,
            width: 320,
            height: 50,
            borderWidth: 1,
            borderColor: '#30D5C8',
            borderRadius: 10,
            paddingLeft: 10,
          }}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={{
            marginTop: 30,
            width: 320,
            height: 50,
            borderWidth: 1,
            borderColor: '#30D5C8',
            borderRadius: 10,
            paddingLeft: 10,
          }}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          style={{
            marginTop: 30,
            width: 320,
            height: 50,
            borderWidth: 1,
            borderColor:'#30D5C8',
            borderRadius: 10,
            paddingLeft: 10,
          }}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
      </View>
      <View style={{marginTop: 50}}>
        <TouchableOpacity
          onPress={() => {
            handleSignUp();
          }}
          style={{
            backgroundColor: 'black',
            width: 300,
            height: 50,
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 40}}>
        <Text>
          Already have an account?{' '}
          <Text
            style={{color: 'blue'}}
            onPress={() => {
              handleNavSignIn();
            }}>
            Login here
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
