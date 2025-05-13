import React, { useEffect, useContext, useState } from "react";
import ListProduct from "./ListProduct";
import { Center, Grid, GridItem, Select } from "@chakra-ui/react";
import { ProductContext } from "../contexts/productContext";
import { DELETE_PRODUCT } from "../reducers/productReducer";
import axios from "axios";

export default function Products() {
  const { products, dispatch, getProducts } = useContext(ProductContext);
  const [sort, setSort] = useState("alphabetical");
  const [filter, setFilter] = useState("all");
  const [userX, setUserX] = useState(null);
  const [userY, setUserY] = useState(null);

  useEffect(() => {
    getProducts();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(foundLocation, errors);
    }
  }, []);

  //Finds user's location when permitted and adds it to the state for the purpose of sorting by distance.
  const foundLocation = (pos) => {
    var crd = pos.coords;
    if (!userX || !userY) {
      setUserX(crd.latitude);
      setUserY(crd.longitude);
    }
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
  };

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  //Watches the Select components for changes and updates the state upon change, re-rendering the product list.
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const handleSortChange = (event) => {
    if (event.target.value) setSort(event.target.value);
  };

  //Uses the "sort" variable in the state to determine the order in which products are sorted.
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
      case "distance":
        var distA = Math.sqrt(
          (userX - a.location.latitude) ** 2 +
            (userY - a.location.longitude) ** 2
        );
        var distB = Math.sqrt(
          (userX - b.location.latitude) ** 2 +
            (userY - b.location.longitude) ** 2
        );
        return distA - distB;
    }
  };

  //Deletes products in the database.
  const deleteProduct = async (product) => {
    console.log("deleting1");
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/api/products/${product.id}`
      );
      dispatch({ type: DELETE_PRODUCT, product: product });
    } catch (err) {
      console.log(err);
    }
  };

  //Returns Select components in a Grid component followed by products filtered and sorted.
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
            <option value="distance">Closest to you</option>
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
                    deleteProduct={deleteProduct}
                  />
                </Center>
              ))
          : null}
      </Grid>
    </div>
  ) : null;
}
