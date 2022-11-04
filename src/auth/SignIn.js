import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useContext} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {SignInContext} from '../context/authContext';
export default function SignIn({navigation}) {
  const dispatch = useDispatch();
  const {dispatchSignedIn} = useContext(SignInContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleTakeData = async uid => {
    let todo = [];
    await firestore()
      .collection('TodoUser' + uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          todo.push(documentSnapshot.data());
        });
      });
    dispatch({type: 'user/addTodo', payload: todo});
  };
  const handleLogIn = async () => {
    if (email === '' || password === '') {
      Alert.alert('Please fill all the fields');
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          var user = userCredential.user;
          setEmail('');
          setPassword('');
          ToastAndroid.show('Logged In Successfully', ToastAndroid.SHORT);
          handleTakeData(user.uid);
          if (user) {
            dispatchSignedIn({
              type: 'UPDATE_SIGN_IN',
              payload: {userToken: 'signed-in'},
            });
          }
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          Alert.alert(errorMessage);
        });
    }
  };
  const handleNavSignUp = () => {
    setEmail('');
    setPassword('');
    navigation.navigate('SignUp');
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={{alignItems: 'center', marginTop: 70}}>
        <Image
          source={{
            uri: 'https://cdn1.iconfinder.com/data/icons/scenarium-vol-19/128/019_022_todo_list_deadline_task-256.png',
          }}
          style={{width: 150, height: 150}}
        />
        <Text
          style={{
            color: '#30D5C8',
            fontSize: 30,
            marginTop: 10,
            fontWeight: 'bold',
          }}>
          Welcome Back!
        </Text>
        <Text style={{marginTop: 5}}>Login into your Todo</Text>
      </View>
      <View style={{marginTop:10}}>
        <TextInput
          placeholder="Email"
          style={{
            marginTop: 30,
            width: 320,
            height: 50,
            borderWidth: 1,
            borderColor: '#30D5C8',
            borderRadius: 10,
            paddingLeft: 10,
          }}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          style={{
            marginTop: 30,
            width: 320,
            height: 50,
            borderWidth: 1,
            borderColor: '#30D5C8',
            borderRadius: 10,
            paddingLeft: 10,
          }}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={{marginTop: 50}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            width: 300,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            marginTop: 10,
          }}
          onPress={() => {
            handleLogIn();
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 30}}>
        <Text>
          Don't have an account?{' '}
          <Text
            style={{color: 'blue'}}
            onPress={() => {
              handleNavSignUp();
            }}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
