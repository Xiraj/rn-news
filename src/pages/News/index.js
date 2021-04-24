import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import add from '../../../assets/icon/pencil.png';

const detectTime = () => {
  const today = new Date();
  const curHr = today.getHours();

  if (curHr < 12) {
    return ('Selamat Pagi');
  } else if (curHr < 15) {
    return ('Selamat Siang');
  } else if (curHr < 18) {
    return ('Selamat Sore')
  }
    return ('Selamat Malam');
}

const Item = ({name, time, header, news, onDelete}) => {
    return (
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri: `https://i.pravatar.cc/150?u=fake${header}`,
            }}
            style={styles.avatar}
          />
          <View style={styles.desc}>
              <Text style={styles.descHeader}>{header}</Text>
              <Text style={styles.descNews}>{news}</Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={styles.descTime}>{time}</Text>
                <Text style={styles.descName}>Penulis: {name}</Text>
                <TouchableOpacity onPress={onDelete}>
                  <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      );
};

const News = ({navigation}) => {
  const [users, setUsers] = useState([]);
    
  useEffect(() => {
    getData();
  }, []);

  
  const getData = () => {
    Axios.get('http://10.0.2.2:3004/users').then((res) => {
      console.log('res get data : ', res);
      setUsers(res.data);
    });
  };


  const deleteItem = (item) => {
    console.log(item);
    Axios.delete(`http://10.0.2.2:3004/users/${item.id}`).then((res) => {
      console.log('res delete', res);
      getData();
    });
  };

  return (
    <View>
    <StatusBar backgroundColor= 'green' />
    <ScrollView showsVerticalScrollIndicator={false}>
    <View>
      <View style={styles.header}>
          <Text style={styles.textHeader}>My News</Text>
          <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 14}}>
            <Text style={styles.textTime}>Hai, </Text><Text style={styles.textTime}>{detectTime()}</Text>
          </View>
      </View>
      {users.map((user) => {
        return (
          <Item
          key={user.id}
          name={user.name}
          time={user.time}
          header={user.header}
          news={user.news}
            onDelete={() =>
              Alert.alert('Peringatan', 'Anda yakin ingin menghapus ini?', [
                {text: 'Tidak', onPress: () => console.log('Button tidak')},
                {text: 'Ya', onPress: () => deleteItem(user)},
              ])
            }
          />
        );
      })}
    </View>
    </ScrollView>
    <View style={{position:'absolute', bottom: 24, left: 310}}>
        <TouchableOpacity onPress={() => navigation.navigate('Upload')}>
            <Image source={add} style={{width:60, height: 60}}/>
        </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 10,
    width: 360,
    height: 180,
    alignSelf: 'center'
  },
  delete: {
    bottom: 3,
    fontSize: 14,
    fontWeight: '300',
    color: 'red',
    marginLeft: 80,
  },
  desc: {
    marginHorizontal: 28,
    marginTop: 20
  },
  descName: {
    fontSize: 12,
    marginLeft: 60
  },
  descTime: {
    fontSize: 12,
  },
  descHeader: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  descNews: {
    fontSize: 12,
    marginTop: 10
  },
  header: {
    backgroundColor: 'green',
    height: 90,
    marginBottom: 40
  },
  itemContainer: {
    elevation: 5,
    shadowOpacity: 2,
    marginBottom: 30
  },
  textHeader: {
      fontSize: 22,
      color: 'white',
      marginLeft: 20,
      marginTop: 10
  },
  textTime: {
    color: 'white',
    fontSize: 14,
  }
});
export default News;
