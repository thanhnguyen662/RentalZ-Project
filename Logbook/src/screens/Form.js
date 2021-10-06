import { useNavigation } from '@react-navigation/native';
import {
   Button,
   Datepicker,
   Icon,
   Input,
   Layout,
   Select,
   SelectItem,
   Text,
} from '@ui-kitten/components';
import axios from 'axios';
import { Formik } from 'formik';
import moment from 'moment';
import React, { useState } from 'react';
import {
   ScrollView,
   StyleSheet,
   View,
   FlatList,
   ToastAndroid,
} from 'react-native';
import * as yup from 'yup';
import ModalCard from '../components/ModalCard';

const AlertIcon = (props) => (
   <Icon {...props} fill='#FF4E45' name='alert-circle-outline' />
);

const CalendarIcon = (props) => <Icon {...props} name='calendar-outline' />;

const RenderCaption = ({ message }) => {
   return (
      <View style={styles.captionContainer}>
         {AlertIcon(styles.captionIcon)}
         <Text style={styles.captionText}>{message}</Text>
      </View>
   );
};

const Form = () => {
   const navigation = useNavigation();
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [formData, setFormData] = useState({});
   const now = new Date();
   const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
   );

   const propertyType = ['Flat', 'House', 'Bungalow'];
   const bedRoom = ['Studio', 'One', 'Two', 'Three'];
   const furnitureType = ['Furnished', 'Unfurnished', 'Part Furnished'];

   const initialValues = {
      name: '',
      address: '',
      startDate: '',
      endDate: '',
      propertyType: '',
      furnitureType: '',
      bedRoom: '',
      rentPrice: '',
      note: '',
   };

   const bookingValidation = yup.object().shape({
      name: yup
         .string()
         .min(8, 'Name must be at least 8 characters long')
         .required('Name is Required'),
      address: yup
         .string()
         .min(8, 'Address must be at least 8 characters long')
         .required('Address is required'),
      startDate: yup.mixed().required('Start Date is required'),
      endDate: yup.mixed().required('End Date is required'),
      propertyType: yup.number().required('Property Type is required'),
      furnitureType: yup.number().required('Furniture Type is required'),
      bedRoom: yup.number().required('Bed Room is required'),
      rentPrice: yup
         .number()
         .moreThan(0, 'Price must be greater than 0')
         .required('Price is required'),
   });

   const handleSubmitForm = async (data) => {
      try {
         const formData = {
            ...data,
            propertyType: propertyType[data.propertyType],
            bedRoom: bedRoom[data.bedRoom],
            furnitureType: furnitureType[data.furnitureType],
         };
         setFormData(formData);
         setIsModalVisible(true);
      } catch (error) {
         console.log(error);
      }
   };

   const handleOnOk = async () => {
      const response = await axios.post(
         'http://192.168.0.113:8000/rental/create',
         formData,
      );
      ToastAndroid.showWithGravityAndOffset(
         response.data.message,
         ToastAndroid.LONG,
         ToastAndroid.BOTTOM,
         10,
         150,
      );
      if (response.data.message === 'Success') {
         setIsModalVisible(false);
         return navigation.navigate('Home');
      }
   };

   const handleModalVisible = () => {
      setIsModalVisible(false);
   };

   return (
      <>
         <ScrollView>
            <Layout style={styles.formContainer}>
               <Text category='h2' style={styles.title}>
                  Rental Form
               </Text>
               <Text category='s1' style={styles.subtitle}>
                  Takes less than 10 minutes to fill out all the information
                  needed
               </Text>
               <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => handleSubmitForm(values)}
                  validationSchema={bookingValidation}
               >
                  {({
                     values,
                     errors,
                     touched,
                     handleBlur,
                     handleChange,
                     handleSubmit,
                     setFieldValue,
                  }) => (
                     <>
                        <Input
                           name='name'
                           size='large'
                           placeholder='Your name'
                           label='Name'
                           onChangeText={handleChange('name')}
                           value={values.name}
                           style={styles.input}
                           onBlur={handleBlur('name')}
                           caption={
                              errors.name &&
                              touched.name && (
                                 <RenderCaption message={errors.name} />
                              )
                           }
                           status={errors.name && touched.name && 'danger'}
                        />
                        <Input
                           name='address'
                           size='large'
                           placeholder='Your address'
                           label='Address'
                           onChangeText={handleChange('address')}
                           value={values.address}
                           style={styles.input}
                           onBlur={handleBlur('address')}
                           caption={
                              errors.address &&
                              touched.address && (
                                 <RenderCaption message={errors.address} />
                              )
                           }
                           status={
                              errors.address && touched.address && 'danger'
                           }
                        />
                        <View style={styles.datePickerContainer}>
                           <Datepicker
                              style={styles.datePicker}
                              label='Start Date'
                              size='large'
                              min={now}
                              date={values.startDate}
                              accessoryRight={CalendarIcon}
                              caption={
                                 errors.startDate &&
                                 touched.startDate && (
                                    <RenderCaption message={errors.startDate} />
                                 )
                              }
                              status={
                                 errors.startDate &&
                                 touched.startDate &&
                                 'danger'
                              }
                              onSelect={(nextDate) =>
                                 setFieldValue('startDate', nextDate)
                              }
                           />
                           <Datepicker
                              style={styles.datePicker}
                              label='End Date'
                              size='large'
                              date={values.endDate}
                              accessoryRight={CalendarIcon}
                              min={
                                 values.startDate === ''
                                    ? tomorrow
                                    : values.startDate
                              }
                              onSelect={(nextDate) =>
                                 setFieldValue('endDate', nextDate)
                              }
                              status={
                                 errors.endDate && touched.endDate && 'danger'
                              }
                              caption={
                                 errors.endDate &&
                                 touched.startDate && (
                                    <RenderCaption message={errors.endDate} />
                                 )
                              }
                           />
                        </View>

                        <Select
                           style={styles.input}
                           label='Property Type'
                           value={propertyType[values.propertyType]}
                           onSelect={(index) =>
                              setFieldValue('propertyType', Number(index.row))
                           }
                           size='large'
                           status={
                              errors.propertyType &&
                              touched.propertyType &&
                              'danger'
                           }
                           caption={
                              errors.propertyType &&
                              touched.propertyType && (
                                 <RenderCaption message={errors.propertyType} />
                              )
                           }
                        >
                           {propertyType.map((p) => (
                              <SelectItem title={p} key={p} />
                           ))}
                        </Select>

                        <Select
                           style={styles.input}
                           label='Bed Room'
                           value={bedRoom[values.bedRoom]}
                           onSelect={(index) =>
                              setFieldValue('bedRoom', Number(index.row))
                           }
                           size='large'
                           status={
                              errors.bedRoom && touched.bedRoom && 'danger'
                           }
                           caption={
                              errors.bedRoom &&
                              touched.bedRoom && (
                                 <RenderCaption message={errors.bedRoom} />
                              )
                           }
                        >
                           {bedRoom.map((p) => (
                              <SelectItem title={p} key={p} />
                           ))}
                        </Select>

                        <Select
                           style={styles.input}
                           label='Furniture Type'
                           value={furnitureType[values.furnitureType]}
                           onSelect={(index) =>
                              setFieldValue('furnitureType', Number(index.row))
                           }
                           size='large'
                           status={
                              errors.furnitureType &&
                              touched.furnitureType &&
                              'danger'
                           }
                           caption={
                              errors.furnitureType &&
                              touched.furnitureType && (
                                 <RenderCaption
                                    message={errors.furnitureType}
                                 />
                              )
                           }
                        >
                           {furnitureType.map((p) => (
                              <SelectItem title={p} key={p} />
                           ))}
                        </Select>

                        <Input
                           name='rentPrice'
                           size='large'
                           placeholder='Price'
                           label='Rent Price'
                           onChangeText={handleChange('rentPrice')}
                           value={values.rentPrice}
                           style={styles.input}
                           onBlur={handleBlur('rentPrice')}
                           caption={
                              errors.rentPrice &&
                              touched.rentPrice && (
                                 <RenderCaption message={errors.rentPrice} />
                              )
                           }
                           status={
                              errors.rentPrice && touched.rentPrice && 'danger'
                           }
                           keyboardType='number-pad'
                        />

                        <Input
                           multiline={true}
                           textStyle={styles.textarea}
                           name='note'
                           placeholder='Input your note'
                           label='Note'
                           onChangeText={handleChange('note')}
                           value={values.note}
                        />

                        <Button
                           status='primary'
                           onPress={handleSubmit}
                           style={styles.submitButton}
                           size='medium'
                        >
                           Submit
                        </Button>
                     </>
                  )}
               </Formik>
            </Layout>
         </ScrollView>
         <ModalCard
            isModalVisible={isModalVisible}
            handleModalVisible={handleModalVisible}
            width={300}
            title='Confirm'
            onOk={handleOnOk}
         >
            <FlatList
               data={Object.entries(formData)}
               keyExtractor={(item) => item[0]}
               renderItem={({ item }) => {
                  if (item[1].toString() === '') return;
                  const nameFunc = () => {
                     if (item[0] === 'name') return 'Name';
                     if (item[0] === 'address') return 'Address';
                     if (item[0] === 'startDate') return 'Start Date';
                     if (item[0] === 'endDate') return 'End Date';
                     if (item[0] === 'propertyType') return 'Property Type';
                     if (item[0] === 'furnitureType') return 'Furniture Type';
                     if (item[0] === 'bedRoom') return 'Bed Room';
                     if (item[0] === 'rentPrice') return 'Rent Price';
                     if (item[0] === 'note') return 'Note';
                  };
                  return (
                     <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold' }}>
                           {nameFunc()}:{' '}
                        </Text>
                        <Text>
                           {typeof item[1] === 'string'
                              ? item[1]
                              : moment(item[1]).format('YYYY-MM-DD')}
                        </Text>
                     </View>
                  );
               }}
            />
         </ModalCard>
      </>
   );
};

export default Form;

const styles = StyleSheet.create({
   backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   formContainer: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 20,
   },
   title: {
      textAlign: 'left',
      fontWeight: '700',
   },
   subtitle: {
      marginBottom: 30,
      marginTop: 10,
   },
   input: {
      marginBottom: 15,
   },
   textarea: {
      minHeight: 64,
      textAlignVertical: 'top',
      paddingVertical: 5,
   },
   datePicker: {
      marginBottom: 15,
      width: '48%',
   },
   datePickerContainer: {
      width: '100%',
      justifyContent: 'space-between',
      flexDirection: 'row',
   },
   submitButton: {
      marginVertical: 30,
      width: '100%',
      height: '7%',
   },
   captionContainer: {
      marginTop: 3,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
   },
   captionIcon: {
      width: 10,
      height: 10,
      marginRight: 5,
   },
   captionText: {
      fontSize: 12,
      fontWeight: '400',
      color: '#FF4E45',
   },
});
