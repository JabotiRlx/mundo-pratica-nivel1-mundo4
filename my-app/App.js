import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import CadastroFornecedorScreen from './paginas/Cadastro.js';
import ListaFornecedoresScreen from './paginas/Lista.js';
import EdicaoFornecedorScreen from './paginas/edicao.js';
import { View,Text } from 'react-native';
import HomeScreen from './paginas/home.js';

const Stack = createStackNavigator();

const App = () => {
  const [fornecedores, setFornecedores] = useState([]);

  return (

    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CadastroFornecedor">
            {props => <CadastroFornecedorScreen {...props} setFornecedores={setFornecedores} />}
          </Stack.Screen>
          <Stack.Screen name="EdicaoFornecedor">
            {props => <EdicaoFornecedorScreen {...props}  />}
          </Stack.Screen>
        
          <Stack.Screen name="ListaFornecedores">
            {props => <ListaFornecedoresScreen {...props} fornecedores={fornecedores} setFornecedores={setFornecedores} />}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;