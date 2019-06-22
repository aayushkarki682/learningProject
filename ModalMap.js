import React from 'react';
import {Modal, View, Text, TouchableHighlight} from 'react-native';


export default class ModalMap extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isVisible : "true"
    };
  }

  setModalVisible(visible){
    this.setState({isVisible : visible})
  }
  render(){
    return(
      <View style = {{marginTop : 22}}>
        <Modal
          transparent = {false}
          isVisible = {this.state.isVisible}
        >
        <View style = {{marginTop : 22}}>
          <View>
            <Text> Hey </Text>

            <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
        </Modal>
      </View>
    );
  }
}
