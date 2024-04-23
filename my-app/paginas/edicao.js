import React, { useState } from 'react';
import { View, Alert, TouchableOpacity,StyleSheet,Text } from 'react-native';
import { Avatar ,TextInput, Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const EdicaoFornecedorScreen = ({ route, navigation }) => {
  const { fornecedor,setFornecedores,fornecedores } = route.params;
  const [nome, setNome] = useState(fornecedor.nome);
  const [endereco, setEndereco] = useState(fornecedor.endereco);
  const [contato, setContato] = useState(fornecedor.contato);
  const [categorias, setCategorias] = useState(fornecedor.categorias);
  const [imagem, setImagem] = useState(fornecedor.imagem);

  const handleSubmit = () => {
    const fornecedorAtualizado = {
        ...fornecedor,
        nome,
        endereco,
        contato,
        categorias,
        imagem,
      };

      const fornecedoresAtualizados = fornecedores.map((item) =>
         item.id === fornecedorAtualizado.id ? fornecedorAtualizado : item
      );

      setFornecedores(fornecedoresAtualizados);
      Alert.alert('Sucesso', 'Fornecedor atualizado com sucesso!');
      navigation.goBack();
  };

  const editarImagem = async () => {
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


  return (
    <View style={styles.container}>
      {imagem && <Avatar.Image source={{ uri: imagem }} size={150} style={styles.imagem} />}
      <TouchableOpacity onPress={editarImagem}>
          <View style={styles.botaoImagem}>
            <Text style={styles.textoBotaoImagem}>Escolher Imagem</Text>
          </View>
        </TouchableOpacity>

      <TextInput
        style={styles.input}
        label="Nome do fornecedor"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        label="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        label="Contato"
        value={contato}
        onChangeText={setContato}
      />
      <TextInput
        style={styles.input}
        label="Categoria de produtos"
        value={categorias}
        onChangeText={setCategorias}
      />
      <Button  mode="contained"style={styles.button} labelStyle={styles.buttonLabel}  title="Atualizar Fornecedor" onPress={handleSubmit} >
        Editar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  imagem: {
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

export default EdicaoFornecedorScreen;