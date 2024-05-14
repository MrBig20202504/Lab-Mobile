import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    borderColor:'grey',
    backgroundColor:'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  containerDisplay: {
    flex: 8,
    padding: 0,
  },
  button: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonZero: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  numberText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  buttonOperate: {
    flex: 1,
    color:'orange',
    backgroundColor:'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  funtionText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'orange',
  },
  operateText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  buttonClear: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 50,
    color: '#1E5F75',
    fontWeight: 'bold',
    borderWidth: 5,
    padding: 10,
    borderColor: '#0F3F4D',
  },
  display: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 300,
    margin: 'auto',
  },
});
export default styles;