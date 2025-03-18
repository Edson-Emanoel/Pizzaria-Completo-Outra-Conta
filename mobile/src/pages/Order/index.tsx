import React, {useState, useEffect, useContext} from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api';
import { ModalPicker } from '../../components/ModalPicker';


type RouteDetailParams = {
 Order:{
  number: string | number;
  order_id: string;
 }
}

export type CategoryProps = {
  id: string;
  name: string;
}

type ProductProps = {
  id: string;
  name: string;
}

type OrderRouteParams = RouteProp<RouteDetailParams, 'Order'>

export default function Order() {
  const route = useRoute<OrderRouteParams>()
  const navigation = useNavigation()

  const [category, setCategory] = useState<CategoryProps[] | []>([]) 
  const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

  const [products, setProducts] = useState<ProductProps[] | []>([])
  const [productsSelected, setProductsSelected] = useState<ProductProps[] | undefined>([])
  const [modalProductVisible, setModalProductVisible] = useState(false)

  const [amount, setAmount] = useState('1')

  useEffect(() => {
    async function loadInfo() {
      const response = await api.get('/category')

      setCategory(response.data)
      setCategorySelected(response.data[0])

    }

    loadInfo()
  }, [])

  useEffect(() => {
    
    async function  loadProducts() {
      const response = await api.get('/category/product', {
        params: {
          category_id: categorySelected?.id
        }
      })

      console.log(response.data);
    }

    loadProducts()

  }, [categorySelected])

  async function handleCloseOrder() {
    try {
      
      await api.delete(`/order`, {
        params:{
          order_id: route.params?.order_id
        }
      })
      
      navigation.goBack()

    } catch (err) {
      console.log(err);
    }
  }

  async function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item)
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        <TouchableOpacity onPress={handleCloseOrder}>
          <Feather name='trash-2' size={28} color='#FF3F4B' />
        </TouchableOpacity>
      </View>

      {category.length !== 0 &&(
        <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
          <Text style={{ color: '#F0F0F0' }}>
            {categorySelected?.name}
          </Text>
        </TouchableOpacity>
      )}


      <TouchableOpacity style={styles.input}>
        <Text style={{ color: '#F0F0F0' }}>Pizza de Frango com Catupiry</Text>
      </TouchableOpacity>


      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        
        <TextInput
          style={[styles.input, { width: '60%', textAlign: 'center', color: '#F0F0F0' } ]}
          placeholderTextColor="#F0F0F0"
          keyboardType='number-pad'
          value={amount}
          onChangeText={setAmount}
        />
      </View>


      <View style={styles.actions}>
        <TouchableOpacity style={styles.Add}>
          <Text style={[styles.buttonText, { color: '#F0F0F0' }]}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>


      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType='fade'
      >
      
        <ModalPicker 
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={ handleChangeCategory }
        />

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({  
  container:{
    flex: 1,
    backgroundColor: '#1D1D2E',
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%'
  },
  header:{
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  title:{
    fontSize: 30,
    color: '#F0F0F0',
    fontWeight: 'bold',
    marginRight: 14
  },
  input:{
    backgroundColor: '#101020',
    borderRadius: 7,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 8,
    color: '#F0FFF0',
    fontSize: 20,
    marginBottom: 12,
  },
  qtdContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  qtdText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F0F0F0',
  },
  actions:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  Add:{
    backgroundColor: '#3FD1FF',
    borderRadius: 7,
    width: '20%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    color: '#101026',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button:{
    backgroundColor: '#3FFFA3',
    borderRadius: 7,
    width: '75%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
})