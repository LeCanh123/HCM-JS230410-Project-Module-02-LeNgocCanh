import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import "./Card.css";
import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import axios from "axios";
import { useDispatch ,useSelector} from "react-redux";
import { handleAddToCart,addToCart,addToCart1} from "../redux/cartReducer/reducer";

const Card = ({ actualPrice, type, id, image, price, title, discount }) => {
  localStorage.setItem("checkId","false")
  // const [checkId,setCheckId]=useState(false);
  // let checkId=false;
  // let [itemUser,setItemUser]=useState([]);


  let { isAuth, afterLoginUser } = useSelector((state) => state.AuthReducer);
  const {cartItems}=useSelector((state) => state.cartReducer);
  const toast = useToast();
  let el ={id:afterLoginUser.email,product:[{
    actualPrice,
    type,
    image,
    price,
    title,
    discount,
    quantity: 1,
  }]} 
const [checkIdCartItem,setCheckIdCartItem]=useState("false")




  ;
  const dispatch = useDispatch();

  useEffect(()=>{
    axios
    .get(process.env.REACT_APP_HOST+`cart1`)
    .then((res) => {
      res.data.forEach((item)=>{
        if(item.id==afterLoginUser.email){
          setCheckIdCartItem("true")
          dispatch(addToCart(item.product));
        }
      })
      
      // toast({
      //   title: "Added to cart",
      //   description: "You can checkout from Cart",
      //   status: "success",
      //   position: "top",
      //   duration: 1000,
      //   isClosable: true,
      // });
    })
    .catch((err) => {
      console.log(err);
    });
  },[cartItems.length])



  



  const handleClick = () => {
    if(isAuth){
      dispatch(handleAddToCart(cartItems,el,checkIdCartItem));
     
      toast({
        title: "Added to cart",
        description: "You can checkout from Cart",
        status: "success",
        position: "top",
        duration: 1000,
        isClosable: true,
      });

    }else{
      toast({
        title: "Fail !!!",
        description: "You need to login to add to cart",
        status: "error",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    }

  };




  return (
    <Box
      className="product-card"
      // borderRadius={"20px"}
      width={"100%"}
      textAlign="left"
      height={"520px"}
    >
      <Link to={`/${type}/${id}`}>
        <Image borderRadius={"20px"} src={image}></Image>
        <Flex gap={"5px"} textAlign={"center"}>
          <Heading paddingTop={"8px"} size="md">
            ${price}
          </Heading>
          <Text as="del" fontSize={"13px"} paddingTop={"10px"}>
          ${actualPrice}
          </Text>
        </Flex>
        <Text paddingTop={"3px"} fontSize={"14px"}>
          {title}{" "}
        </Text>
      </Link>
      <Button class="add-to-cart-btn" onClick={()=>handleClick()}>
        Add To Cart
      </Button>
    </Box>
  );
};

export default Card;
