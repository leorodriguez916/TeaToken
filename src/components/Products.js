import React, { useEffect, useContext, useState } from "react";
import ListProduct from "./ListProduct";
import { Center, Grid, GridItem, Select } from "@chakra-ui/react";
import { CartContext } from "../contexts/cartContext";
import { ProductContext } from "../contexts/productContext";
import { DELETE_PRODUCT } from "../reducers/productReducer";
import axios from "axios";

export default function Products() {
  const { products, dispatch, getProducts } = useContext(ProductContext);
  const [sort, setSort] = useState("alphabetical");
  const [filter, setFilter] = useState("all");
  const [flow, setFlow] = useState("ascending");

  useEffect(() => {
    getProducts();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    if (event.target.value) setSort(event.target.value);
  };

  const handleFlowChange = (event) => {
    setFlow(event.target.value);
  };

  const deleteProduct = async (product) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/api/products/${product.id}`
      );
      dispatch({ type: DELETE_PRODUCT, product: product });
    } catch (err) {
      console.log(err);
    }
  };

  const productSorter = (a, b) => {
    switch (sort) {
      case "alphabetical":
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      case "priceLtH":
        return a.price - b.price;
      case "priceHtL":
        return b.price - a.price;
      case "caffeine":
        return b.caffeine - a.caffeine;
    }
  };

  return products ? (
    <div>
      <Grid
        ml="30px"
        pl="30px"
        mr="30px"
        pr="30px"
        gap="1.5rem"
        templateColumns="repeat(5, 1fr)"
      >
        <GridItem colSpan={3}>
          <Select
            variant="outline"
            placeholder="Show only"
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="black">Black Tea</option>
            <option value="green">Green Tea</option>
            <option value="white">White Tea</option>
            <option value="herbal">Herbal Tea</option>
          </Select>
        </GridItem>
        <GridItem colSpan={2}>
          <Select
            variant="outline"
            placeholder="Sort by"
            onChange={handleSortChange}
          >
            <option value="alphabetical">Alphabetical</option>
            <option value="priceLtH">Price: Low to High</option>
            <option value="priceHtL">Price: High to Low</option>
            <option value="caffeine">Most caffeine (mg / cup)</option>
          </Select>
        </GridItem>
      </Grid>

      <Grid
        minW="375px"
        mb="20px"
        p="20px"
        gap="1.5rem"
        justifyContent="center"
        templateColumns="repeat(auto-fill,minmax(20rem,1fr))"
      >
        {products.allProducts[0]
          ? products.allProducts
              .filter((product) =>
                filter === "all" ? product : product.type === filter
              )
              .sort((a, b) => productSorter(a, b))
              .map((product) => (
                <Center key={product.id}>
                  <ListProduct
                    key={product.id}
                    product={product}
                    type={product.type}
                    deleteProduct={deleteProduct}
                  />
                </Center>
              ))
          : null}
      </Grid>
    </div>
  ) : null;
}

// {this.props.products
//   .filter((product) => {
//     if (!this.state.search.trim()) return true;
//     return product.name.toLowerCase();
//   })
//   .map((product) => {
//     return <ProductItem key={product.id} product={product} />;
//   })}

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:3001/api/products`);
//       dispatch({ type: GOT_PRODUCTS, products: data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   fetchData();
// }, []);

// const [products, dispatch] = useReducer(productReducer, {});
