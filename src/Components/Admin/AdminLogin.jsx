import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");
  const toast = useToast();

  const navigate = useNavigate();
  const onCLickSubmit = (e) => {
    e.preventDefault();
    let obj = {
      email,
      password,
    };
console.log(obj);
    axios
      .get(process.env.REACT_APP_HOST+`adminLogin`)
      .then((res) => {
        // console.log(res.data.token)
        setToken(res.data.token);
        setIsAuth(true);
        console.log(res.data[0]);
        if(res.data[0].email==email&&res.data[0].password==password){
          toast({
            title: "Login Successfully.",
            description: "We're redirecting you to the admin page",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
  
          setEmail("");
          setPassword("");
          navigate("/admin");


        }else{
          setToken("");
          setIsAuth(false);
          toast({
            title: "Check your Credentials!!.",
            description: "Please enter your correct details",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          //   console.log(error)
          setEmail("");
          setPassword("");



        }
        
      })
      .catch((error) => {
        setToken("");
        setIsAuth(false);
        toast({
          title: "Check your Credentials!!.",
          description: "Please enter your correct details",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        //   console.log(error)
        setEmail("");
        setPassword("");
      });
  };

  console.log(isAuth);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to go to the Admin's page<Link color={"blue.400"}></Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onCLickSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
