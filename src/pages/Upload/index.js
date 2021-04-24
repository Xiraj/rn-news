import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import back from '../../../assets/image/back.png'


const Upload = ({navigation}) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [header, setHeader] = useState('');
  const [news, setNews] = useState('');
  const [users, setUsers] = useState([]);

  const submit = () => {
    const data = {
      name,
      time,
      header,
      news,
    };
      console.log('data before send :', data);
      Axios.post('http://10.0.2.2:3004/users', data).then((res) => {
        console.log('res :', res);
        setName('');
        setTime('');
        setHeader('');
        setNews('');
        navigation.navigate('News')
      });
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
    <StatusBar backgroundColor='green' />
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={back} style={{width:18, height:32, marginTop: 8, marginLeft: 12}} />
      </TouchableOpacity>
      <Text style={styles.textTitle}>Tambah Berita</Text>
    </View>
    <View style={styles.container}>
      <TextInput
        placeholder="Nama"
        style={styles.input}
        value={name}
        onChangeText={(value) => setName(value)}
      />
      <TextInput
        placeholder="Waktu"
        style={styles.input}
        value={time}
        onChangeText={(value) => setTime(value)}
      />
      <TextInput
        placeholder="Judul"
        style={styles.input}
        value={header}
        onChangeText={(value) => setHeader(value)}
      />
      <TextInput
        placeholder="Berita"
        multiline={true}
        maxLength={400}
        style={styles.input}
        value={news}
        onChangeText={(value) => setNews(value)}
      />
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.textButton}>Upload</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf:'center',
    borderRadius: 20,
    height: 40,
    width: 320,
    backgroundColor: 'green',
    marginTop: 40
  },
  container: {
    padding: 40,
  },
  header: {
    backgroundColor: 'green',
    height: 60
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#aab3aa',
    marginBottom: 18
  },
  textButton: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    marginVertical: 8
  },
  textTitle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    bottom: 30
  },
});
export default Upload;
