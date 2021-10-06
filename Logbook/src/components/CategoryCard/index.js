import { Text, Icon } from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import priceFormat from '../../utils/priceFormat';
import styles from './CardStyle';

const EvaIcon = (props) => (
   <Icon {...props} fill='#8C8C98' style={styles.icon} />
);

const imageArray = [
   'https://pix10.agoda.net/hotelImages/200524/-1/e7e36079645da64601ea20c5249c367d.jpg?s=1024x768',
   'https://exp.cdn-hotels.com/hotels/22000000/21320000/21314100/21314041/e1260dcb_y.jpg?impolicy=fcrop&w=500&h=333&q=high',
   'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/92/2019/11/20071929/0919-AJS-NOI-Hotel-des-Arts-SGN-1091-Web-1500x690.jpg',
   'https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzv032bDTPdXr5CZdCAQtC9dv4PODm9CLuVw&usqp=CAU',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ2oJr8oZY0uNl5esuMyJSXHOLlFXaNeL5fw&usqp=CAU',
];

const CategoryCard = (props) => {
   const { item, handleClickDelete } = props;
   const randomImage = Math.floor(Math.random() * imageArray.length);

   return (
      <View style={{ marginBottom: 20 }}>
         <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1.8 }}>
               <Image
                  style={styles.image}
                  source={{
                     uri: imageArray[randomImage],
                  }}
               />
            </View>
            <View style={{ flex: 4 }}>
               <View
                  style={{
                     flex: 2,
                     flexDirection: 'row',
                     paddingVertical: 5,
                  }}
               >
                  <View style={{ flex: 3 }}>
                     <Text style={styles.homeTitle}>{item.name}</Text>
                     <Text style={styles.address}>{item.address}</Text>
                     <Text style={styles.date}>
                        {moment(item.startDate).format('MM-DD-YYYY')} -{' '}
                        {moment(item.endDate).format('MM-DD-YYYY')}
                     </Text>
                  </View>
                  <View
                     style={{
                        flex: 2,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                     }}
                  >
                     <Text style={styles.price}>
                        {priceFormat(Number(item.price) || 0)}
                     </Text>
                     <TouchableOpacity
                        onPress={() => handleClickDelete(item.id)}
                     >
                        <EvaIcon name='close-circle-outline' />
                     </TouchableOpacity>
                  </View>
               </View>
               <View
                  style={{
                     flex: 1,
                     flexDirection: 'row',
                     paddingBottom: 6,
                  }}
               >
                  <View
                     style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                     }}
                  >
                     <EvaIcon name='home-outline' />
                     <Text style={styles.type}>{item.propertyType}</Text>
                  </View>
                  <View
                     style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                     }}
                  >
                     <EvaIcon name='moon-outline' />
                     <Text style={styles.type}>{item.bedRoom}</Text>
                  </View>
                  <View
                     style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                     }}
                  >
                     <EvaIcon name='image-outline' />
                     <Text style={styles.type}>{item.furnitureType}</Text>
                  </View>
               </View>
            </View>
         </View>
      </View>
   );
};

export default CategoryCard;
