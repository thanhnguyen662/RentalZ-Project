import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
   image: {
      width: 100,
      height: 95,
      borderRadius: 15,
   },
   homeTitle: {
      fontWeight: 'bold',
      fontSize: 18,
   },
   date: {
      fontSize: 11,
      color: '#8C8C98',
      marginTop: 2,
      marginLeft: 1,
   },
   address: {
      fontSize: 13,
      color: '#555555',
      marginTop: 1,
      marginLeft: 1,
   },
   price: {
      fontSize: 20,
      color: '#F36162',
      fontWeight: 'bold',
      marginBottom: 3,
   },
   type: {
      color: '#8C8C98',
      fontSize: 12,
   },
   icon: {
      width: 18,
      height: 18,
      marginRight: 1,
   },
});
