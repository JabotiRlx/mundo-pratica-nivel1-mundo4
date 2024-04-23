import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button mode="contained" style={styles.button} labelStyle={styles.buttonLabel} onPress={() => navigation.navigate('CadastroFornecedor')} >
        Cadastrar Fornecedor
      </Button>

      <Button  mode="contained" style={styles.button} labelStyle={styles.buttonLabel} onPress={() => navigation.navigate('ListaFornecedores')}>
        Listar Fornecedores
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 20,
    width: '70%',
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default HomeScreen;