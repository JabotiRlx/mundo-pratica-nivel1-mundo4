import React, { useState } from 'react';
import { View, StyleSheet, FlatList , Modal,TouchableOpacity,Text } from 'react-native';
import { List, Avatar, Divider, Title, Caption,TextInput } from 'react-native-paper';

const ListaFornecedoresScreen = ({navigation,fornecedores,setFornecedores }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFornecedores, setFilteredFornecedores] = useState(fornecedores);
  const [filterCriteria, setFilterCriteria] = useState('nome');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = () => {
    let filtered = fornecedores;
    if (filterCriteria === 'nome') {
      filtered = fornecedores.filter(fornecedor =>
        fornecedor.nome.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (filterCriteria === 'categorias') {
      filtered = fornecedores.filter(fornecedor =>
        fornecedor.categorias.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (filterCriteria === 'contato') {
      filtered = fornecedores.filter(fornecedor =>
        fornecedor.contato.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (filterCriteria === 'endereco') {
      filtered = fornecedores.filter(fornecedor =>
        fornecedor.endereco.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } 
    setFilteredFornecedores(filtered);
  };

  const handleEditFornecedor = (fornecedor) => {
    navigation.navigate('EdicaoFornecedor', { fornecedor,fornecedores,setFornecedores });
  };

  const handleSelectCriteria = (criteria) => {
    setFilterCriteria(criteria);
    setIsModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <>
      <List.Item
        title={item.nome}
        description={
          `Endereço: ${item.endereco}\nContato: ${item.contato}\nCategoria: ${item.categorias}` 
        }
        descriptionNumberOfLines={3}
        left={() => <Avatar.Image source={{ uri: item.imagem }} size={60} />}
        right={()=> <TouchableOpacity onPress={() => handleEditFornecedor(item)}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>}
      />
      <Divider />
    </>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Lista de Fornecedores</Title>

      <TextInput
        style={styles.searchInput}
        placeholder={`Pesquisar por ${filterCriteria}...`}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />

      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.criteriaButton}>
        <Text style={styles.buttonText}>Critério: {filterCriteria}</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleSelectCriteria('nome')} style={styles.modalItem}>
              <Text style={styles.modalText}>Nome</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectCriteria('categorias')} style={styles.modalItem}>
              <Text style={styles.modalText}>Categoria</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectCriteria('contato')} style={styles.modalItem}>
              <Text style={styles.modalText}>Contato</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelectCriteria('endereco')} style={styles.modalItem}>
              <Text style={styles.modalText}>Endereco</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {filteredFornecedores && filteredFornecedores.length > 0 ? (
        <FlatList
          data={fornecedores}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Caption style={styles.caption}>Nenhum fornecedor cadastrado</Caption>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
   },
  title: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  caption: {
    marginTop: 20,
    fontSize: 16,
  },
  criteriaButton: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  searchInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalText: {
    fontSize: 16,
  },
});

export default ListaFornecedoresScreen;