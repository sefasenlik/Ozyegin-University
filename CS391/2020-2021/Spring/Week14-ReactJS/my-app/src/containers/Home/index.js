import React from 'react';
import Heading from '../../components/Heading'
import Table from '../../components/Table'
import Form from '../../components/Form'
import axios from 'axios';
import '../../App.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: []
    }
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/products`)
      .then(res => {
        const productList = res.data;
        this.setState({ productList });
      })
  }

  onDelete(id, index) {
    axios.delete(`http://localhost:3000/products/${id}`)
      .then(res => {
        const { productList } = this.state;
        this.setState({
          productList: productList.filter(
            (id,i) => {
              return i !== index;
            })
        });
      })

  }


  onAdd(product) {
    axios.post(`http://localhost:3000/products`, product)
      .then(res => {
        let { productList } = this.state;
        productList.push(res.data);
        this.setState({ productList });

      })
  }
  
  render() {
    return (
      <div className="App">
        <Heading title="My Product List" />
        <Form onSubmit={this.onAdd} />
        <Table data={this.state.productList} onDelete={this.onDelete} />

      </div>
    );
  }
}

export default Home;
