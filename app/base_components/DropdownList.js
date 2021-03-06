import React, { Component } from 'react';
import { Content, Form, Item, Picker, Icon } from 'native-base';
export default class DropdownList extends Component {
    constructor(props) {
    super(props);
    this.state = {
      selectedValue: 1
    };
  }
  onValueChange2(value) {
    this.setState({
      selectedValue: value
    });
  }
  render() {
    const { placeholder, items } = this.props
    debugger
    return (
      // <Container>
        // <Header />
        <Content>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder={placeholder}
                placeholderStyle={{ color: "#bfc6e" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selectedValue}
                onValueChange={this.onValueChange2.bind(this)}
              >
                {items.map(item => <Picker.Item label={item} value={item} key={item} />)}
              </Picker>
            </Item>
          </Form>
        </Content>
      // </Container>
    );
  }
}