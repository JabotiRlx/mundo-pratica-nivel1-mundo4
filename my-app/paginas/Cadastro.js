import React, { useState } from 'react';
import { View,StyleSheet,Alert, Image, TouchableOpacity,Text,ScrollView  } from 'react-native';
import { Button, TextInput,Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const CadastroFornecedorScreen = ({ navigation, setFornecedores }) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [categorias, setCategorias] = useState('');
  const [imagem, setImagem] = useState(null);
 
  const cadastrarImagem = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permissão negada', 'A permissão para acessar a biblioteca de mídia é necessária.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if (pickerResult.cancelled === true) {
      return;
    }

    Alert.alert('Sucesso', 'Fornecedor imagem com sucesso!');
    setImagem( pickerResult.assets[0].uri );
  };

  const cadastrarFornecedor = () => {
    if (nome && endereco && contato && categorias && imagem) {
      setFornecedores(prevFornecedores => [
        ...prevFornecedores,
        { nome, endereco, contato, categorias, imagem }
      ]);
      setNome('');
      setEndereco('');
      setContato('');
      setCategorias('');
      setImagem('');
      
      navigation.goBack();
      Alert.alert('Sucesso', 'Fornecedor cadastrado com sucesso!');
    } else {
      Alert.alert( "Erro","Favor fornecer todos os dados!");
    }
  };

  return (
    <ScrollView >
      <View style={styles.container}>
        {imagem && <Avatar.Image source={{ uri: imagem }} size={150} style={styles.imagem} />}
        <TouchableOpacity onPress={cadastrarImagem}>
          <View style={styles.botaoImagem}>
            <Text style={styles.textoBotaoImagem}>Escolher Imagem</Text>
          </View>
        </TouchableOpacity>

        <TextInput
          label="Nome do Fornecedor"
          value={nome}
          onChangeText={text => setNome(text)}
          style={styles.input}
        />
        <TextInput
          label="Endereço"
          value={endereco}
          onChangeText={text => setEndereco(text)}
          style={styles.input}
        />
        <TextInput
          label="Contato"
          value={contato}
          onChangeText={text => setContato(text)}
          style={styles.input}
        />
        <TextInput
          label="Categorias de Produtos Fornecidos"
          value={categorias}
          onChangeText={text => setCategorias(text)}
          style={styles.input}
        />

        <View style={styles.alinharBotoes}>
          <Button mode="contained" style={styles.button} labelStyle={styles.buttonLabel} onPress={cadastrarFornecedor}>
            Cadastrar
          </Button>

          {/* <Button mode="contained" style={styles.button} labelStyle={styles.buttonLabel} onPress={navigation.goBack}>
            Voltar
          </Button> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
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

  imagem: {
    alignself:"center",
    marginBottom: 20,
  },
  botaoImagem: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  textoBotaoImagem: {
    textAlign: 'center',
  },
  alinharBotoes:{
    paddingTop: 10,
    alignItems: 'center',
  }
});


export default CadastroFornecedorScreen;