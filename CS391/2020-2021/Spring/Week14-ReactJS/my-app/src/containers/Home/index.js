import React from 'react';
import Heading from '../../components/Heading'
import Table from '../../components/Table'
import Form from '../../components/Form'
import axios from 'axios';
import '../../App.css';
const api=axios.create({baseURL:`http://localhost:3000/products`});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: []
    }
    api.get('/').then(res => {
      const productList = res.data;
      this.setState({ productList });
    })
   
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  

  onDelete(id, index) {
    api.delete(`/${id}`)
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
    api.post(`/`, product)
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
