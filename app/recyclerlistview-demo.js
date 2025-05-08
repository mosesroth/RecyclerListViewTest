import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';

// Get window dimensions
const { width } = Dimensions.get('window');

export default class RecyclerListDemo extends Component {
  constructor(props) {
    super(props);

    // Create the data provider
    this.dataProvider = new DataProvider((r1, r2) => {
      return r1.id !== r2.id;
    });

    // Generate some sample data
    const data = [];
    for (let i = 0; i < 1000; i++) {
      data.push({
        id: i,
        text: `Item ${i}`,
        // Alternate between two types of items
        type: i % 2 === 0 ? 'NORMAL' : 'ALTERNATE',
      });
    }

    this.state = {
      dataProvider: this.dataProvider.cloneWithRows(data),
    };

    // Define layout provider
    this.layoutProvider = new LayoutProvider(
      (index) => {
        // Return the type of item
        return this.state.dataProvider.getDataForIndex(index).type;
      },
      (type, dim) => {
        // Set dimensions based on type
        dim.width = width;
        dim.height = type === 'NORMAL' ? 70 : 100;
      }
    );
  }

  // Render each row
  rowRenderer = (type, data) => {
    switch (type) {
      case 'NORMAL':
        return (
          <View style={styles.normalRow}>
            <Text style={styles.text}>{data.text}</Text>
          </View>
        );
      case 'ALTERNATE':
        return (
          <View style={styles.alternateRow}>
            <Text style={styles.alternateText}>{data.text}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>RecyclerListView Demo</Text>
        <RecyclerListView
          style={styles.list}
          dataProvider={this.state.dataProvider}
          layoutProvider={this.layoutProvider}
          rowRenderer={this.rowRenderer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  normalRow: {
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
    margin: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  alternateRow: {
    justifyContent: 'center',
    backgroundColor: '#E0F7FA',
    padding: 16,
    margin: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    height: 100,
  },
  text: {
    fontSize: 16,
  },
  alternateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
