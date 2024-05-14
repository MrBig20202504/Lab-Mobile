import React from 'react';
import {Button, StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: 'black',
  },
  input: {
    width: 350,
    height: 50,
    borderRadius: 15,
    borderColor: 'orange',
    borderWidth: 2,
    padding: 10,
    fontSize: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    padding: 15,
    borderRadius: 20,
    color: 'orange',
  },

  button: {
    width: 200,
    height: 50,
    borderRadius: 50,
    borderColor: 'orange',
    borderWidth: 3,
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
});
