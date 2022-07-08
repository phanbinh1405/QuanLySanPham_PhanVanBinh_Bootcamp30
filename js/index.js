const renderProduct = (data) => {
  const productItem = data.map(item => {
    return (`<tr>
      <th>${item.id}</th>
      <th><img src="${item.img}" alt="product_image" style="width: 50px; height: 50px;"></th>
      <th>${item.name}</th>
      <th>${item.price}</th>
      <th>${item.description}</th>
      <th>${item.type}</th>
      <th>
        <button type="button" onclick="deleteProduct('${item.id}')" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
        <button type="button" onclick="getProduct('${item.id}')" class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></button>
      </th>
    </tr>`)
  }).join('')

  document.querySelector('#tbodyProduct').innerHTML = productItem
}

const fillProduct = (data) => {
  document.getElementById("txtProductId").value = data.id;
  document.getElementById("txtProductImage").value = data.img;
  document.getElementById("txtProductName").value = data.name;
  document.getElementById("txtProductType").value = data.type;
  document.getElementById("txtProductPrice").value = data.price;
  document.getElementById("txtProductDescription").value = data.description;
}

const getProduct = () => {
  axios.get("http://svcy.myclass.vn/api/Product/GetAll").then(function (response) {
    const productList = response.data
    renderProduct(productList)
  })
}

window.createProduct = () => {
  const id = document.getElementById("txtProductId").value;
  const image = document.getElementById("txtProductImage").value;
  const name = document.getElementById("txtProductName").value;
  const productType = document.getElementById("txtProductType").value;
  const price = document.getElementById("txtProductPrice").value;
  const description = document.getElementById("txtProductDescription").value;
  const form = document.querySelector("#formQLSP")

  axios.post("http://svcy.myclass.vn/api/Product/CreateProduct", {
    id: id,
    name: name,
    price: price,
    img: image,
    description: description,
    type: productType
  }).then(function (response) {
    return (response.status === 200) ? getProduct() : alert(response.data.content)
  }).catch(err => {
    return true;
  })
  form.reset()
}

window.deleteProduct = (id) => {
  axios.delete(`http://svcy.myclass.vn/api/Product/DeleteProduct/${id}`)
    .then(response => {
      getProduct()
    }).catch(err => {
      return true;
    })
}

window.getProduct = (id) => {
  axios.get(`http://svcy.myclass.vn/api/Product/GetById/${id}`)
    .then((response) => {
      fillProduct(response.data)
    }).catch(err => {
      return true;
    })
}

window.updateProduct = () => {
  const id = document.getElementById("txtProductId").value;
  const image = document.getElementById("txtProductImage").value;
  const name = document.getElementById("txtProductName").value;
  const productType = document.getElementById("txtProductType").value;
  const price = document.getElementById("txtProductPrice").value;
  const description = document.getElementById("txtProductDescription").value;

  axios.put(`http://svcy.myclass.vn/api/Product/UpdateProduct/${id}`, {
    name: name,
    price: price,
    img: image,
    description: description,
    type: productType
  })
    .then((response) => {
      getProduct()
    }).catch(err => true)
}

window.searchProduct = () => {
  const searchName = document.getElementById("txtSearch").value;
  if (searchName) {
    axios.get(`http://svcy.myclass.vn/api/Product/SearchByName?name=${encodeURIComponent(searchName)}`)
      .then((response) => {
        renderProduct(response.data)
      })
  } else {
    getProduct()
  }
}


window.onload = function () {
  getProduct()
}