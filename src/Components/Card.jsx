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
import React, { useState } from "react";
import { Link, json } from "react-router-dom";
import axios from "axios";
import { useDispatch ,useSelector} from "react-redux";
import { addToCart } from "../redux/cartReducer/reducer";

const Card = ({ actualPrice, type, id, image, price, title, discount }) => {
  // const [checkId,setCheckId]=useState(false);
  localStorage.setItem("checkId",false)
  // let checkId=false;
  // let [itemUser,setItemUser]=useState([]);
  localStorage.setItem("itemUser",JSON.stringify([]))
  let { isAuth, afterLoginUser } = useSelector((state) => state.AuthReducer);
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





  ;
  console.log(el);
  const dispatch = useDispatch();
  const handleClick = () => {
    if(isAuth){

      // axios
      // .get(process.env.REACT_APP_HOST+`cart`)
      // .then((res) => {
      //   console.log(res.data);
      //   toast({
      //     title: "Added to cart",
      //     description: "You can checkout from Cart",
      //     status: "success",
      //     position: "top",
      //     duration: 1000,
      //     isClosable: true,
      //   });
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
      axios
      .get(process.env.REACT_APP_HOST+`cart1`)
      .then((res) => {
    res.data.forEach((item,ind)=>{
      if(item.id==afterLoginUser.email){
        // checkId=item.id;
        // setCheckId(item.id)
        localStorage.setItem("checkId",item.id)
        // console.log(res.data[ind].product);
    
        localStorage.setItem("itemUser",JSON.stringify(res.data[ind]))
      }
    })
      })
      .catch((err) => {
        console.log(err);
      });










if(localStorage.getItem("checkId")!="false"){
  console.log(localStorage.getItem("checkId"));
  let a=JSON.parse(localStorage.getItem("itemUser"))
  console.log(a);
  let b= {
    "id": a.id,
    "product": [...a.product,el.product[0]
      ]
    }
  






    // setCheckId(false)
  // const itemUser1={...JSON.parse(localStorage.getItem("itemUser")),...el.product[0]};
  // console.log(itemUser1);
  axios
  .put(process.env.REACT_APP_HOST+`cart1/`+`${localStorage.getItem("checkId")}`, b)
  .then((res) => {
    dispatch(addToCart(res.data));
    toast({
      title: "Added to cart",
      description: "You can checkout from Cart",
      status: "success",
      position: "top",
      duration: 1000,
      isClosable: true,
    });
  })
  .catch((err) => {
    console.log(err);
  });




}else{
  console.log("ddang chayj else",el);
  axios
  .post(process.env.REACT_APP_HOST+`cart1`, el)
  .then((res) => {
    dispatch(addToCart(res.data));
    toast({
      title: "Added to cart",
      description: "You can checkout from Cart",
      status: "success",
      position: "top",
      duration: 1000,
      isClosable: true,
    });
  })
  .catch((err) => {
    console.log(err);
  });


}










    }else{
      toast({
        title: "You need to login to add to cart",
        description: "...",
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
