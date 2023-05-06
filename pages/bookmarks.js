import Head from "next/head"
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
import { useState, useEffect } from "react";
import Card from "../components/Card";


const bookmarks = () =>{
    const [bookmarks, setBookmarks] = useState([]);
    const[bookmarksMap, setBookmarkMap] = useState({});

    useEffect(()=> {
        if(localStorage.getItem('my_bookmarks')) {
            const saved = JSON.parse(localStorage.getItem('my_bookmarks'))
            setBookmarks([...Object.keys(saved)])
            setBookmarkMap(saved)
        }
    }, [])

    const remove = (e, obj) =>{
        e.preventDefault();
        e.stopPropagation();  
        const my_bookmarks = JSON.parse(localStorage.getItem('my_bookmarks')) || {}
        console.log(my_bookmarks)
        console.log("removing", obj._id)
        if(my_bookmarks[obj._id]){
            delete my_bookmarks[obj._id]
            setBookmarkMap(my_bookmarks)
            localStorage.setItem('my_bookmarks', JSON.stringify(my_bookmarks))
            const idx = bookmarks.indexOf(obj._id)
            if(idx > -1){
                let updated = bookmarks
                delete updated[idx]
                setBookmarks(updated)
            }
        }
    }

    return(
        <>
            <Head>
                <title>My Bookmarks</title>
            </Head>
            <Stack w={'full'}  px={4} py={"4em"}>
            <Text fontWeight={700} lineHeight={1.2} fontSize={useBreakpointValue({ base: '1xl', md: '2xl' })}>
                My Bookmarks
            </Text>
            <SimpleGrid minChildWidth="300px" spacing="10" minH="full" gridTemplateColumns={"repeat(auto-fit, minmax(300px, 0.1fr))"} justifyContent={useBreakpointValue({ base: 'center', md: 'flex-start' })}>
            {bookmarks.map((film_id, index) => (
                <Link href={`/movie/${bookmarksMap[film_id]._id}`} style={{textDecoration: 'none'}} key={index}>
                <Card
                    _id={bookmarksMap[film_id]._id}
                    name={bookmarksMap[film_id].name}
                    poster={bookmarksMap[film_id].poster}
                    year={bookmarksMap[film_id].year}
                    type={"bookmark"}
                    remove={remove}
                    watched={bookmarksMap[film_id].watched}
                />
                </Link>
            ))}
            </SimpleGrid>
        </Stack>
        </>
    )
}

export default bookmarks