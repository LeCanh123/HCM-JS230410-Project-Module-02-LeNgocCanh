import React, { useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Flex,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Text,
  Heading,
  Image,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToCart1,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  handleRemove
} from "../redux/cartReducer/reducer";
import axios from "axios";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";

export const Cart = () => {
  let { isAuth, afterLoginUser } = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => {
    return store.cartReducer
  })
  const cartItems1=useSelector((store) => {
    return store.cartReducer
  })






  console.log(cartItems);
  let saved = 0;
  const getData = () => {
    axios
      .get(process.env.REACT_APP_HOST+`cart1`)
      .then((res) => {
        // dispatch(addToCart1(res.data));
        res.data.forEach(element => {
          if(element.id==afterLoginUser.email){
            dispatch(addToCart(element.product));
          }
        });;
      })
      .catch((err) => {
        console.log(err);
      });
  };




  const handleDelete = (e) => {
    dispatch(handleRemove(cartItems,e,afterLoginUser.email));
    
    setTimeout(()=>{
      getData();
    },1)
    toast({
      title: "Removed from cart",
      description: "Deleted from Cart",
      status: "success",
      position: "top",
      duration: 1000,
      isClosable: true,
    });

  };

  const handleINC = (id, VAL) => {
    let newCartItem=cartItems.map((item,ind)=>{
if(ind!=VAL){
  return item
}else{
  return {...item,quantity:item.quantity+1}
}
    })
    axios
      .put(process.env.REACT_APP_HOST+`cart1/`+afterLoginUser.email, {
       id:afterLoginUser.email,product:[...newCartItem]
      })
      .then((res) => {
        dispatch(incrementQuantity(res.data));
        // getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDEC = (id, VAL) => {
    let newCartItem=cartItems.map((item,ind)=>{
if(ind!=VAL){
  return item
}else{
  return {...item,quantity:item.quantity-1}
}
    })
    axios
      .put(process.env.REACT_APP_HOST+`cart1/`+afterLoginUser.email, {
       id:afterLoginUser.email,product:[...newCartItem]
      })
      .then((res) => {
        dispatch(incrementQuantity(res.data));
        // getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, e) => total + e.price * e.quantity, 0);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    isAuth?
    <>
      <Navbar />
      <Box width="100%">
        <Text
          fontSize={"24px"}
          textAlign={"left"}
          fontWeight={300}
          borderBottom={"1px solid #e8e8e8"}
          pb={"6px"}
        >
          YOUR BASKET
        </Text>
        <TableContainer width="99%">
          <Table variant="simple">
            <Thead width="99%">
              <Tr
                bg={"#555555"}
                color={"white"}
                justifyContent={"space-between"}
              >
                <Th color={"white"}>ITEM DESCRIPTION</Th>
                <Th color={"white"}>UNIT PRICE</Th>
                <Th color={"white"}>QUANTITY</Th>
                <Th color={"white"}>SUBTOTAL</Th>
                <Th color={"#555555"}>......</Th>
                <Th color={"black"} bg={"#c6cc74"}>
                  Saving
                </Th>
              </Tr>
            </Thead>

            {cartItems.length === 0 ? (
              <Heading
                padding={"100px"}
                alignItems={"center"}
                margin={"auto"}
                textAlign={"center"}
              >
                Your Basket Is Empty
              </Heading>
            ) : (
              <Tbody>
                {cartItems?.map((e,ins) => {
                  {
                    saved =
                      saved +
                      (Math.floor(e.price) -
                        Math.floor(e.price - (10 * e.price) / 100)) *
                        e.quantity;
                  }
                  return (
                    <Tr
                      key={e.id}
                      fontSize={"12px"}
                      justifyContent={"space-between"}
                    >
                      <Td fontSize={"12px"}>
                        {" "}
                        <Image
                          width={"100px"}
                          height={"100px"}
                          src={e.image}
                          alt="Dan Abramov"
                        />
                        {e.brand}
                        <br></br>
                        {e.title}
                      </Td>
                      <Td>
                        <Text>Original Price</Text>
                        <span textDecoration={"line-through"}>
                          $ {Math.floor(e.price)}
                        </span>
                        <br></br>
                        <Text>Discounted Price</Text>
                        $ {Math.floor(e.price - (10 * e.price) / 100)}
                        <br></br>
                      </Td>
                      <Td>
                        <Button
                          isDisabled={e.quantity === 1}
                          variant={"outline"}
                          m={"2px"}
                          onClick={() => handleDEC(e.id, ins)}
                        >
                          -
                        </Button>
                        <Button variant={"outline"} m={"2px"}>
                          {e.quantity}
                        </Button>
                        <Button
                          variant={"outline"}
                          m={"2px"}
                          onClick={() => handleINC(e.id,ins)}
                        >
                          +
                        </Button>
                      </Td>
                      <Td>
                        ${" "}
                        {Math.floor(e.price - (10 * e.price) / 100) *
                          e.quantity}
                      </Td>
                      <Td>
                        <CloseIcon onClick={() => handleDelete(e)} />
                      </Td>
                      <Td>
                        {" "}
                        ${" "}
                        {Math.floor(
                          e.price - Math.floor(e.price - (10 * e.price) / 100)
                        ) * e.quantity}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            )}
          </Table>
        </TableContainer>
        <Flex justifyContent={"space-between"} mt={8}>
          {/* <Box width={"45%"}>
              <Button variant={"outline"} float={"left"} onClick={handleEmpty}>
                Empty Basket
              </Button>
            </Box> */}
          <Box width={"45%"} border="1px solid #e8e8e8 ">
            <Flex
              justifyContent={"space-between"}
              p="1rem"
              textAlign={"left"}
              fontSize="14px"
              fontWeight={400}
            >
              <Box>
                <Text>SubTotal</Text>
                <Text>Delivery Charges</Text>
              </Box>
              <Box>
                <Text>$ {getTotalPrice() - saved}</Text>
                <Text>***</Text>
              </Box>
              <Box borderLeft={"1px solid #e8e8e8"} color="red" pl="2px">
                <Text>You saved!</Text>
                <Text>$ {Math.floor(saved)}</Text>
              </Box>
            </Flex>
            <Flex
              textAlign={"left"}
              border={"1px solid #e8e8e8"}
              padding="2rem"
              justify={"space-around"}
            >
              <Heading as={"h6"} fontWeight="250">
                TOTAL{" "}
              </Heading>
              <Heading as={"h6"} fontWeight="250">
                {" "}
                $ {getTotalPrice() - saved}
              </Heading>
            </Flex>
            <Box float={"right"}>
              <Button
                variant={"outline"}
                onClick={() => {
                  if (cartItems.length !== 0) {
                    navigate("/checkout");
                  } else {
                    toast({
                      title: "Cart is Empty.",
                      description: "Please add some products.",
                      status: "error",
                      duration: 2000,
                      isClosable: true,
                      position: "top",
                    });
                    navigate("/");
                  }
                }}
              >
                {" "}
                CheckOut
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
    :
    <>
    <Navbar />
    <Box width="100%">
      <Text
        fontSize={"24px"}
        textAlign={"left"}
        fontWeight={300}
        borderBottom={"1px solid #e8e8e8"}
        pb={"6px"}
      >
      Login To View Cart
      </Text>
      </Box>
      </>
  );
};
