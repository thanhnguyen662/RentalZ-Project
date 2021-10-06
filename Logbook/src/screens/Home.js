import { Layout, Text } from '@ui-kitten/components';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CategoryCard from '../components/CategoryCard';
import ModalCard from '../components/ModalCard';

const Home = ({ navigation }) => {
   const [data, setData] = useState([]);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [selectedId, setSelectedId] = useState('');

   useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
         const getData = async () => {
            try {
               const response = await axios.get(
                  'http://192.168.0.113:8000/rental/get',
               );
               setData(response.data);
            } catch (error) {
               console.log(error);
            }
         };
         getData();
      });
      return () => unsubscribe;
   }, []);

   const handleModalVisible = () => {
      setIsModalVisible(false);
   };

   const handleOnOk = async () => {
      try {
         const response = await axios.post(
            'http://192.168.0.113:8000/rental/delete',
            { rentalId: selectedId },
         );
         setData((prev) => {
            return prev.filter((d) => d.id !== response.data.id);
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <Layout style={styles.header}>
            <Text category='h2' style={styles.title}>
               Category
            </Text>
         </Layout>
         <Layout style={styles.content}>
            <FlatList
               data={data}
               renderItem={({ item }) => (
                  <CategoryCard
                     item={item}
                     handleClickDelete={() => {
                        setSelectedId(item.id);
                        setIsModalVisible(true);
                     }}
                  />
               )}
               keyExtractor={(item) => item?.id}
               contentContainerStyle={{ paddingHorizontal: 15 }}
            />
         </Layout>
         <ModalCard
            isModalVisible={isModalVisible}
            handleModalVisible={handleModalVisible}
            width={300}
            title='Confirm'
            onOk={handleOnOk}
         >
            <Text>Are you want delete?</Text>
         </ModalCard>
      </>
   );
};

export default Home;

const styles = StyleSheet.create({
   header: {
      paddingTop: 50,
      paddingHorizontal: 20,
      flex: 1,
   },
   title: {
      fontWeight: '700',
   },
   content: {
      flex: 7,
   },
});
