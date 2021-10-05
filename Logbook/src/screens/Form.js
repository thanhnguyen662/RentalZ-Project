import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import {
   Modal,
   Input,
   Button,
   Datepicker,
   Icon,
   Text,
   Layout,
   Select,
   SelectItem,
   Card,
} from '@ui-kitten/components';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

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
   const [isModalVisible, setIsModalVisible] = useState(false);
   const navigation = useNavigation();
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
      rentPrice: yup.number().required('Price is required'),
   });

   const handleSubmitForm = async (data) => {
      try {
         const formData = {
            ...data,
            propertyType: propertyType[data.propertyType],
            bedRoom: bedRoom[data.bedRoom],
            furnitureType: furnitureType[data.furnitureType],
         };
         const response = await axios.post(
            'http://192.168.0.113:8000/rental/create',
            formData,
         );
         if (response.data.message === 'Success')
            return navigation.navigate('Home');
         if (response.data.message === 'Exist') return setIsModalVisible(true);
      } catch (error) {
         console.log(error);
      }
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
         <Modal
            visible={isModalVisible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setIsModalVisible(false)}
         >
            <Card disabled={true}>
               <Text category='h6' style={{ marginBottom: 20 }}>
                  Address is Exist 💂‍♂️
               </Text>
               <Button onPress={() => setIsModalVisible(false)}>OK</Button>
            </Card>
         </Modal>
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
