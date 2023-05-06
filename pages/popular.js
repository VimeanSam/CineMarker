import { server } from '../config'
import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
    InputGroup,
    Input,
    InputRightElement,
    HStack,
    Container,
    SimpleGrid,
    Box,
    Link
  } from '@chakra-ui/react';
import { useRouter } from "next/router";
import Card from "../components/Card";
import Head from "next/head"
import { useState, useEffect } from "react";

const axios = require('axios');

const popular = ({ movies }) => {
    console.log(movies)
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(()=> {
        if(localStorage.getItem('my_bookmarks')) {
            const saved = JSON.parse(localStorage.getItem('my_bookmarks'))
            setBookmarks([...Object.keys(saved)])
        }
    }, [])

    const bookmark = (e, obj) =>{
        e.preventDefault();
        e.stopPropagation();        
        const my_bookmarks = JSON.parse(localStorage.getItem('my_bookmarks')) || {}
        console.log(my_bookmarks)
        console.log("bookmarking", obj._id)
        if(!my_bookmarks[obj._id]){
            my_bookmarks[obj._id] = {_id: obj._id, poster: obj.poster, year: obj.year, name: obj.name, reviews: [], watched: false}
            localStorage.setItem('my_bookmarks', JSON.stringify(my_bookmarks))
            setBookmarks([...bookmarks, obj._id])
        }
        
    }

    return (
        <>
         <Head>
            <title>Popular</title>
        </Head>
        <Stack w={'full'}  px={4} py={"4em"}>
            <Text fontWeight={700} lineHeight={1.2} fontSize={useBreakpointValue({ base: '1xl', md: '2xl' })}>
                Popular movies
            </Text>
            <SimpleGrid minChildWidth="300px" spacing="10" minH="full" gridTemplateColumns={"repeat(auto-fit, minmax(300px, 0.1fr))"} justifyContent={useBreakpointValue({ base: 'center', md: 'flex-start' })}>
            {movies.map((film, index) => (
                <Link href={`/movie/${film._id}`} style={{textDecoration: 'none'}} key={index}>
                    <Card
                    _id={film._id}
                    name={film.name}
                    poster={film.poster}
                    year={film.year}
                    type={"search"}
                    bookmarks={bookmarks}
                    bookmark={bookmark}
                />
                </Link>
                
            ))}
            </SimpleGrid>
        </Stack>
        </>
       
    )
}

export const getServerSideProps = async (context) => {
    const res = await fetch(`${server}/api/movies/popular`)

    const movies = await res.json()
  
    return {
      props: {
        movies,
      },
    }
}

export default popular