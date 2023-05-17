import React, { useEffect, useState, useContext  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Button } from "native-base";
import { StyleSheet, Text, View, FlatList, Image, Modal } from 'react-native';
import Header from './components/header';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [account, setAccount] = useState(null);

  const openPost = async (postid) => {
    const response = await fetch(`https://mymarketbackend.onrender.com/api/posts/single/${postid}`);
    const data = await response.json();
    console.log(data);
    setSelectedPost(data);
    setShowModal(true);
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`https://mymarketbackend.onrender.com/api/posts/getall`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <NavigationContainer>
    <NativeBaseProvider>
    <View style={styles.container}>
      <Header />
      {selectedPost && (
        <Modal  visible={showModal} >
         
          <View style={styles.modal1}>
          <Text>Category: {selectedPost.category}</Text>
            <Image 
           style={styles.images}
           source={{uri: `data:image/png;base64,${selectedPost.image}`}} 
           />
            <Text>Price: {selectedPost.price} LRD</Text>
            <Text>Location: {selectedPost.location}</Text>
            <Text>In stock: {selectedPost.instock ? 'Yes' : 'No'}</Text>
            <Text>Quantity: {selectedPost.quantity}</Text>

            {account === null ? (
                  
                  <Text>Login to purchase</Text>            
              ) : (
              
                // <Form onSubmit={handleBuySubmit}>
                // <Form.Group>
                //   <Form.Label>Select an option:</Form.Label>
                //   <Form.Control as="select" onChange={handleOptionChange} value={selectedOption}>
                //     <option value="">Choose option</option>
                //     <option value="pickup">Pick up in person</option>
                //     <option value="delivery">Delivery</option>
                //   </Form.Control>
                // </Form.Group>
                <Button variant="primary">
                  Buy
                </Button>
              // </Form>
              )}
           
          </View>
          <MaterialIcons 
            name='close'
            size={24} 
            style={{...styles.modalToggle, ...styles.modalClose}} 
            onPress={() => setShowModal(false)} 
          />
        </Modal>
      )}
      <View style={styles.menuview}>
        <Text>Market Place</Text>
        <View >
        <Button style={styles.allbtn}>All</Button>
        {/* <Button>Ready For Delivery</Button><Button>Sell</Button> */}
        </View>
      </View>
      <View>
      {posts[0] && (<FlatList 
        numColumns={2}
        keyExtractor={(item) => item.id} 
        data={posts} 
        renderItem={({ item }) => ( 
          <View
          style={{
            backgroundColor: "#edeade",
            borderRadius: 10,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            marginHorizontal: 20,
            marginBottom: 20
          }}
          >
         <Text >{item.name}</Text>
         <Image 
            style={styles.images}
            source={{uri: `data:image/png;base64,${item.image}`}}
          />
         
          <Text>{item.price} LRD For {item.quantity}</Text>
          <Button onPress={() => openPost(item.postid)} style={styles.buybtn} size="sm">Buy</Button>
          </View>
        )}
      />)}
      </View>
    </View>
    </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 200
  },
  allbtn: {
    position: 'relative', 
    left: 5,
    width: '20%',
    backgroundColor: 'orange'
  },
  menuview: {
    width: '100%',
    textAlign: 'left',
  },
  buybtn: {
    width: '40%',
    position: 'relative',
    left: 40
  },
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
  modal1: {
    paddingTop: 130,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
