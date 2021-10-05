import { Layout, Text } from '@ui-kitten/components';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CategoryCard from '../components/CategoryCard';

const Home = ({ navigation }) => {
   const [data, setData] = useState([]);

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

   const handleClickDelete = async (rentalId) => {
      try {
         const response = await axios.post(
            'http://192.168.0.113:8000/rental/delete',
            { rentalId: rentalId },
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
                     handleClickDelete={handleClickDelete}
                  />
               )}
               keyExtractor={(item) => item?.id}
               contentContainerStyle={{ paddingHorizontal: 15 }}
            />
         </Layout>
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
