"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {
  IconButton,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";

export default function ProductList() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  // let products = [
  //     { desc: "iPad", price: 20000 },
  //     { desc: "iPhone 8", price: 20000 },
  //     { desc: "iPhone X", price: 30000 }
  // ];
  const [products, setProducts] = useState([
    { desc: "iPad", price: 20000 },
    { desc: "iPhone 8", price: 20000 },
    { desc: "iPhone X", price: 30000 },
  ]);
  const [newProduct, setNewProduct] = useState({
    visible: false,
    desc: "",
    price: 0,
  });
  const handleClick = function (e: React.ChangeEvent<HTMLInputElement>) {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const show = () => {
    setNewProduct({ ...newProduct, visible: true });
  };
  const hide = () => {
    setNewProduct({ ...newProduct, visible: false });
  };
  function update() {
    setProducts(() => [...products, newProduct]);
    setNewProduct({ ...newProduct, visible: false });
    console.log(products);
  }

  const [changeProduct, setChangeProduct] = useState({
    visible: false,
    desc: "",
    price: 0,
    index: -1,
  });
  const handleClick_change = function (e: React.ChangeEvent<HTMLInputElement>) {
    setChangeProduct({ ...changeProduct, [e.target.name]: e.target.value });
  };
  const changeShow = (index: number) => {
    const currentProdcuct = products[index];
    setChangeProduct({ ...currentProdcuct, visible: true, index });
  };
  const changeHide = () => {
    setChangeProduct({ desc: "", price: 0, visible: false, index: -1 });
  };
  function changeUpdate() {
    const { index } = changeProduct;
    setProducts(() =>
      products.map((p, i) => (i === index ? changeProduct : p))
    );
    setChangeProduct({ desc: "", price: 0, visible: false, index: -1 });
    console.log(products);
  }

  const deleteThing = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <Box
      sx={{
        width: "80vw",
        height: "100vh",
        backgroundColor: "background.paper",
        color: "black",
        textAlign: "left",
      }}
    >
      {/* <List subheader="Product list" aria-label="secondary mailbox folder">
                {products.map((product, index) =>
                    <ListItemButton
                        divider
                        key={product.desc}
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index)}>
                        <ListItemText
                            primary={product.desc} secondary={product.price}>
                        </ListItemText>
                    </ListItemButton>)}
            </List> */}

      {/* 新增 */}
      <Dialog
        open={newProduct.visible}
        onClose={hide}
        aria-labelledby="新增活動"
      >
        <DialogTitle>新增活動</DialogTitle>
        <DialogContent>
          <TextField
            label="活動描述"
            variant="outlined"
            name="desc"
            value={newProduct.desc}
            onChange={handleClick}
          />
          <p />
          <TextField
            label="活動價格"
            variant="outlined"
            name="price"
            value={newProduct.price}
            onChange={handleClick}
          />
          <p />
        </DialogContent>
        <DialogActions>
          <IconButton
            aria-label="close"
            onClick={hide}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button variant="contained" color="primary" onClick={update}>
            新增
          </Button>
        </DialogActions>
      </Dialog>

      {/* 修改 */}
      <Dialog
        open={changeProduct.visible}
        onClose={hide}
        aria-labelledby="修改活動"
      >
        <DialogTitle>修改活動</DialogTitle>
        <DialogContent>
          <TextField
            label="活動描述"
            variant="outlined"
            name="desc"
            value={changeProduct.desc}
            onChange={handleClick_change}
          />
          <p />
          <TextField
            label="活動價格"
            variant="outlined"
            name="price"
            value={changeProduct.price}
            onChange={handleClick_change}
          />
          <p />
        </DialogContent>
        <DialogActions>
          <IconButton
            aria-label="close"
            onClick={changeHide}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button variant="contained" color="primary" onClick={changeUpdate}>
            修改
          </Button>
        </DialogActions>
      </Dialog>

      <div>
        <Button variant="contained" color="success" onClick={show}>
          新增活動
        </Button>
        <List subheader="Product list" aria-label="product list">
          {products.map((product, index) => (
            <ListItem divider key={product.desc}>
              <ListItemText
                primary={product.desc}
                secondary={product.price}
              ></ListItemText>
              <IconButton
                key={product.desc}
                //selected={selectedIndex === index}
                onClick={() => deleteThing(index)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>

              <IconButton
                key={product.desc}
                //selected={selectedIndex === index}
                onClick={() => changeShow(index)}
                edge="end"
                aria-label="delete"
              >
                <BuildCircleIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>

      {/* {newProduct.visible ?
                <div>
                    活動描述:<input type="text" name="desc" value={newProduct.desc} onChange={handleClick} /><br />
                    活動價格:<input type="number" name="price" value={newProduct.price} onChange={handleClick} /><br />
                    <button onClick={update}>新增</button>
                </div>
                :
                <div>
                    <button onClick={show}>新增活動</button>
                    <List subheader="Product list" aria-label="product list">
                        {products.map((product, index) =>
                            <ListItem divider key={product.desc}>
                                <ListItemText primary={product.desc} secondary={product.price}>

                                </ListItemText>
                                <IconButton

                                    edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>)}
                    </List>
                </div>
            } */}
    </Box>
  );
}
