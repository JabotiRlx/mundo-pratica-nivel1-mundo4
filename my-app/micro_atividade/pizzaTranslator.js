import React, {useState} from 'react';

import {StyleSheet,Text, TextInput, View} from 'react-native';

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const PizzaTranslator = () => {

  const [text, setText] = useState('');

  return (

    <View style={styles.container}>

      <TextInput

        style={{height: 40}}

        placeholder="Type here to translate!"

        onChangeText={newText => setText(newText)}

        defaultValue={text}

      />

      <Text style={{padding: 10, fontSize: 42}}>

        {text

          .split(' ')

          .map(word => word && '🍕')

          .join(' ')}

      </Text>

    </View>

  );

};


export default PizzaTranslator;