import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    height: 24,
    position: 'relative',
    alignSelf: 'center',
  },
  inputWrapper: {
    position: 'absolute',
    top: 0,
    height: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
  },
  input: {
    height: 24,
    fontSize: 18,
    width: '100%',
  },
  text: {
    height: 24,
    fontSize: 18,
    position: 'absolute',
    top: 0,
    color: 'transparent',
  },
  mention: {
    backgroundColor: 'rgba(0, 150, 255, .5)',
  },
});

const QuestionTabScreen = () => {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}></View>
  );
};

export default QuestionTabScreen;
