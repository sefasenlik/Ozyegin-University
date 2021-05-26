# Using Rest Services


## Install json-server 

Run `npm install -g json-server` for installing json-server


- create a folder named `fake-server'

- create products.json file under that folder:
```json
  {
  "products": [ 
        {
            "id":1,
            "img": "tablet",
            "alt": "img-tablet",
            "name": "10-Inch Tablet",
            "price": "269",
            "description": "Android 4.3 Jelly Bean, 10.1-inch Full HD (1920 x 1200) Display"
        },
        {
            "id":2,
            "img": "shoe",
            "alt": "img-shoe",
            "name": "Running Shoe",
            "price": "48",
            "description": "Synthetic and Mesh, Imported, Rubber sole, Flex Film welded upper, HydraMAX moisture-wicking collar lining"
        },
        {
            "id":3,
            "img": "watch",
            "alt": "img-watch",
            "name": "Slim Bracelet Watch",
            "price": "27",
            "description": "A narrow gold-tone bracelet supports the round case of this  watch, which features three rhinestones marking each hour and a sparkling halo on the bezel"
        }
	]
}
```

- open a terminal window and type `json-server --watch products.json`
- Your fake  server will be started. If you see that information on the screen, you can make rest requests to the server
  
```
Loading products.json
  Done

  Resources
  http://localhost:3000/products

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...
```

- Try following URLs:
  - [http://localhost:3000/products](http://localhost:3000/products)
  - [http://localhost:3000/products/1](http://localhost:3000/products/1)
  
## Install Axios 

First of all you need to install axios with using that command: `npm install axios`

### GET Request with Axios
- Change content of the Home component as follows:
  - **Add this line** => import axios from 'axios';
  - **Delete this line** => import * as data from '../../data.json';
- Change state value as follows:
```
  this.state = {
      productList: []
    }
```
- Add componentDidMount lifecycle method 
  ```
   componentDidMount() {
    axios.get(`http://localhost:3000/products`)
      .then(res => {
        const productList = res.data;
        this.setState({ productList });
      })
  }
  ```

### DELETE Request with Axios
  - Change the content of the onDelete function as shown below:

```
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
```
Notice the input parameters of the onDelete method. We should send id value from the TableBody component.

- Open TableBody component and change content of the Delete button as shown below:

```
    <button onClick={() => this.props.onDelete(item.id,index)}>
                <i>DeleteNew</i>
    </button>
```

Notice the parameters of the method.

- Now you can test your delete operation.

### POST Request with Axios

- Open the Home component and change content of the onAdd function as shown below:

```
  onAdd(product) {
    axios.post(`http://localhost:3000/products`, product)
      .then(res => {
        let { productList } = this.state;
        productList.push(res.data);
        this.setState({ productList });

      })
  }
```
- Now you can test your add operation.
- You can also delete the data.json file from the project folder.