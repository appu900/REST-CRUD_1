const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const data = JSON.parse(fs.readFileSync("data.json"));

app.get("/", (request, response) => {
  response.send("hello world");
});


app.get("/products", (req, res) => {
  res.json(data);
});

app.get("/products/:id", (request, response) => {
  const requestProductId = +request.params.id;
  const productToBeSent = data.find(
    (product) => product.id == requestProductId
  );
  response.json(productToBeSent);
});

app.post("/products", bodyParser.json(), (request, response) => {
  const requestedProduct = request.body;
  data.push(requestedProduct);
  response.json(data);
});

app.put("/products/:id", bodyParser.json(), (request, response) => {
  const requestProductId = +request.params.id;
  const productIndex = data.findIndex(
    (product) => product.id === requestProductId
  );
  data.splice(productIndex, 1, { ...request.body, id: requestProductId });
  response.send(data);
});

app.patch('/products/:id',bodyParser.json(),(request,response)=>{
  const requestedId = +request.params.id;
  const productIndex = data.findIndex(product=>product.id === requestedId);
  const existingProduct = data[productIndex];
  data.splice(productIndex,1,{...existingProduct,...request.body})
  response.json(data);
})

app.delete('/products/:id',bodyParser.json(),(request,response)=>{

  const requestedId = +request.params.id;
  const productIndex = data.findIndex(product=>product.id === requestedId);
  data.splice(productIndex,1);
  response.json(data);

})


app.listen(5000, () => {
  console.log("app is live");
});
