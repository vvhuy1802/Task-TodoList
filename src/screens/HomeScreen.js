import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';
import {SignInContext} from '../context/authContext';
import {FloatingAction} from 'react-native-floating-action';

const width = Dimensions.get('window').width;
export default function HomeScreen() {
  const {dispatchSignedIn} = useContext(SignInContext);
  const user = auth().currentUser;
  const DataTodo = useSelector(state => state.user.todos);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [idChange, setIdChange] = useState('');
  const [todoName, setTodoName] = useState('');

  const FormatDate = date => {
    return (StringDay = date.split('-')[2] + ' tháng ' + date.split('-')[1]);
  };
  const actions = [
    {
      text: 'Add Todo',
      icon: require('../assets/add.png'),
      name: 'bt_add',
      position: 1,
      buttonSize: 45,
      textColor: 'black',
    },
    {
      text: 'Log Out',
      icon: require('../assets/logout.png'),
      name: 'bt_logout',
      position: 2,
      buttonSize: 45,
      textColor: 'black',
    },
  ];

  const handleAddTodo = () => {
    let todo = {
      id: Math.random(),
      title: todoName,
      completed: false,
      date: day,
    };
    firestore()
      .collection('TodoUser' + user.uid)
      .add({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        date: todo.date,
      })
      .then(() => {
        console.log('Todo added!');
      });
    dispatch({type: 'user/newTodo', payload: todo});
    setTodoName('');
    setModalVisible(false);
    ToastAndroid.show('Added Successfully', ToastAndroid.SHORT);
  };
  handleDelete = id => {
    dispatch({type: 'user/deleteTodo', payload: id});
    firestore()
      .collection('TodoUser' + user.uid)
      .where('id', '==', id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          documentSnapshot.ref.delete();
        });
      });
    ToastAndroid.show('Deleted Successfully', ToastAndroid.SHORT);
  };
  handleUpdate = (id, title, completed) => {
    let todo = {
      id: id,
      title: title,
      completed: completed,
    };
    dispatch({type: 'user/updateTodo', payload: todo});
    firestore()
      .collection('TodoUser' + user.uid)
      .where('id', '==', id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          documentSnapshot.ref.update({
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
          });
        });
      });
    setModalVisible1(false);
    ToastAndroid.show('Updated Successfully', ToastAndroid.SHORT);
    setTodoName('');
  };
  async function signOut() {
    Alert.alert('Are you sure you want to sign out?', '', [
      {
        text: 'Ok',
        onPress: () => {
          try {
            auth()
              .signOut()
              .then(() => {
                ToastAndroid.show('Sign out successfully!', ToastAndroid.SHORT);
                dispatchSignedIn({
                  type: 'UPDATE_SIGN_IN',
                  payload: {userToken: null},
                });
              });
          } catch (error) {
            Alert.alert('Error', error.message);
          }
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            marginTop: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>TodoList</Text>
        </View>
        <ScrollView
          style={{height: '80%'}}
          showsVerticalScrollIndicator={false}>
          {DataTodo.map(item => {
            return (
              <View
                key={item.id}
                style={{
                  width: '95%',
                  height: 80,
                  backgroundColor: 'white',
                  marginBottom: 15,
                  marginTop: 15,
                  borderRadius: 10,
                  alignSelf: 'center',
                  elevation: 5,
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  justifyContent: 'center',
                  backgroundColor: item.completed ? '#f5f5f5' : 'white',
                }}>
                <View style={{padding: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <CheckBox
                        disabled={false}
                        value={item.completed}
                        onValueChange={() => {
                          handleUpdate(item.id, item.title, !item.completed);
                        }}
                      />
                      <View>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 20,
                            fontWeight: 'bold',
                            textDecorationLine: item.completed
                              ? 'line-through'
                              : 'none',
                            marginBottom: 4,
                            marginLeft: 10,
                            width: width * 0.6,
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 14,
                            textDecorationLine: item.completed
                              ? 'line-through'
                              : 'none',
                            marginBottom: 4,
                            marginLeft: 10,
                            width: width * 0.6,
                          }}>
                          {FormatDate(item.date)}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Icon
                        onPress={() => {
                          handleDelete(item.id);
                        }}
                        name="x"
                        size={20}
                        color="black"
                        style={{marginBottom: 5}}
                      />
                      <Icon
                        onPress={() => {
                          setModalVisible1(true);
                          setIdChange(item.id);
                        }}
                        name="edit-2"
                        size={20}
                        color="black"
                        disabled={item.completed}
                      />
                    </View>
                  </View>
                </View>
              </View>
            );
          }).reverse()}
        </ScrollView>
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            if (name === 'bt_add') {
              setModalVisible(true);
            } else if (name === 'bt_logout') {
              signOut();
            }
          }}
          overlayColor="transparent"
          listenKeyboard={true}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Todo</Text>
            <Icon
              onPress={() => {
                setModalVisible(false);
              }}
              name="x"
              size={25}
              color="black"
              style={{position: 'absolute', zIndex: 1, right: 15, top: 10}}
            />
            <TextInput
              style={styles.input}
              value={todoName}
              placeholder="Enter Task Name"
              onChangeText={text => setTodoName(text)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#2196F3',
                padding: 10,
                borderRadius: 10,
                elevation: 2,
                width: 100,
                alignSelf: 'center',
                marginTop: 20,
                alignItems: 'center',
                marginTop: 30,
              }}
              onPress={() => {
                handleAddTodo();
              }}>
              <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Todo Name</Text>
            <Icon
              onPress={() => {
                setModalVisible1(false);
              }}
              name="x"
              size={25}
              color="black"
              style={{position: 'absolute', zIndex: 1, right: 15, top: 10}}
            />
            <TextInput
              style={styles.input}
              value={todoName}
              placeholder="Enter Task Name"
              onChangeText={text => setTodoName(text)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#2196F3',
                padding: 10,
                borderRadius: 10,
                elevation: 2,
                width: 100,
                alignSelf: 'center',
                marginTop: 20,
                alignItems: 'center',
                marginTop: 30,
              }}
              onPress={() => {
                handleUpdate(idChange, todoName, false);
              }}>
              <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  modalView: {
    width: width - 40,
    height: 250,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#d0e0e3',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
