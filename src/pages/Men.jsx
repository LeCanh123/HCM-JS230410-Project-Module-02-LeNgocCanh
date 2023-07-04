import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
// import { getmens } from "../redux/MenReducer/action";
import { fetchMensData } from "../redux/MenReducer/reducer";


import { Box, Grid, Progress, Spinner, Text } from "@chakra-ui/react";
import Card from "../Components/Card";
import Pagination1 from "../Components/Filter/Pagination1";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";
import Menfilter from "../Components/Filter/Menfilter";

export const Men = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const { men, isLoading, isError, total } = useSelector((store) => {
    return store.MenReducer;
  });

  let Obj = {
    params: {
      category: searchParams.getAll("category"),
      _page: searchParams.get("page"),
      _sort: searchParams.get("order") && "price",
      _order: searchParams.get("order"),
    },
  };

  useEffect(() => {
    dispatch(fetchMensData(Obj));
    console.log(total);
  }, [location.search]);

  return (
    <div>
      <Navbar />
      <Box>
        <Progress
          colorScheme="pink"
          hasStripe
          height="42px"
          value={100}
          isAnimated
        />
        <Text
          color={"white"}
          fontSize={{ base: "80%", sm: "100%", lg: "100%" }}
          position="absolute"
          top={{ base: "117px", sm: "115px", md: "142px", lg: "85px" }}
          left={{ base: "5%", sm: "27%", md: "30%", lg: "40%" }}
        >
          New arrivals in menswear upto 30% off ❤️
        </Text>
      </Box>
      <Menfilter type={"men"} />
      {isLoading ? (
        <Box
          textAlign={"center"}
          width={"100%"}
          height={"400px"}
          paddingTop="150px"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : isError ? (
        "Something went wrong"
      ) : (
        <Grid
          width={"80%"}
          margin={"auto"}
          justifyContent="space-between"
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
            lg: "repeat(4,1fr)",
          }}
          columnGap="20px"
        >
          {men.length > 0 &&
            men.map((el) => {
              return <Card key={el.id} {...el} id={el.id} type={"men"} />;
            })}
        </Grid>
      )}
      <Pagination1 />
      <Box mt={"30px"}>
        <Footer />
      </Box>
    </div>
  );
};
