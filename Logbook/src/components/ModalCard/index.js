import { Button, Card, Modal } from '@ui-kitten/components';
import React from 'react';
import { View, Text } from 'react-native';
import styles from './ModalStyle';

const ModalCard = (props) => {
   const { isModalVisible, handleModalVisible, children, width, title, onOk } =
      props;

   return (
      <Modal
         visible={isModalVisible}
         backdropStyle={styles.backdrop}
         onBackdropPress={handleModalVisible}
         style={{ width: width }}
      >
         <Card style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
               <Text style={styles.title}>{title}</Text>
            </View>
            <View style={({ flex: 3 }, styles.content)}>{children}</View>
            <View
               style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
               }}
            >
               <Button onPress={handleModalVisible} style={styles.cancelButton}>
                  Cancel
               </Button>
               <Button onPress={onOk}>OK</Button>
            </View>
         </Card>
      </Modal>
   );
};

export default ModalCard;
