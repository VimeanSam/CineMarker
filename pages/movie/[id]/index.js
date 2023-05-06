import { server } from '../../../config'
import {
    Box,
    Button,
    Flex,
    Img,
    Spacer,
    Text,
    useBreakpointValue,
    Stack,
    Tag,
    Center,
    Card,
    CardBody,
    Textarea
  } from '@chakra-ui/react'

import { useRouter } from "next/router";
import ReactStars from 'react-stars'
import Head from "next/head"
import { useState, useEffect, useRef} from "react";

const axios = require('axios');

const Movie = ({ result }) => {
    const router = useRouter()
    const { id } = router.query
    const movie = result.Response === "True"? result : {}
    const [bookmarks, setBookmarks] = useState([]);
    const [review, setReview] = useState("");
    const [myReviews, setmyReviews] = useState([]);
    const [watch, setWatched] = useState(false);
    const [rating, setRating] = useState(0);
    const [err, setErr] = useState("");
    const ratingRef = useRef()

    useEffect(()=> {
        if(localStorage.getItem('my_bookmarks')) {
            const saved = JSON.parse(localStorage.getItem('my_bookmarks'))
            setBookmarks([...Object.keys(saved)])
            if(saved[id]){
                setmyReviews(saved[id].reviews)
                setWatched(saved[id].watched)
            }
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

    const remove = (e, obj) =>{
        e.preventDefault();
        e.stopPropagation();  
        const my_bookmarks = JSON.parse(localStorage.getItem('my_bookmarks')) || {}
        console.log(my_bookmarks)
        console.log("removing", obj._id)
        if(my_bookmarks[obj._id]){
            delete my_bookmarks[obj._id]
            localStorage.setItem('my_bookmarks', JSON.stringify(my_bookmarks))
            const idx = bookmarks.indexOf(obj._id)
            if(idx > -1){
                let updated = bookmarks
                delete updated[idx]
                setBookmarks(updated)
                router.push('/bookmarks')
            }
        }
    }

    const submitReview = () =>{
        setErr("")
        const star = rating
        if(star > 0 && review.trim() !== ""){
            console.log("STAR", star)
            console.log("REVIEW", review)
            const my_bookmarks = JSON.parse(localStorage.getItem('my_bookmarks')) || {}
            if(my_bookmarks[id]){
                setmyReviews([...myReviews, {star: star, review: review}])
                my_bookmarks[id].reviews = [...myReviews, {star: star, review: review}]
                localStorage.setItem('my_bookmarks', JSON.stringify(my_bookmarks))
                setReview("")
                setRating(0)
            }
        }else{
            setErr("Inputs cannot be empty")
        }
    }

    const mark_as_watched = () =>{
        const my_bookmarks = JSON.parse(localStorage.getItem('my_bookmarks')) || {}
        if(my_bookmarks[id]){
            my_bookmarks[id].watched = true
            localStorage.setItem('my_bookmarks', JSON.stringify(my_bookmarks))
            setWatched(true)
        }
    }

    const ratingChanged = (newRating) => {
        setRating(newRating)
    }

    return (
        <>
         <Head>
            <title>{id}</title>
        </Head>
        {Object.keys(movie).length > 0? 
            <>
                <Flex
            w="full"
            px={useBreakpointValue({ base: 6, md: 15})}
            pt={'4em'}
            justifyContent="space-between"
            flexDirection={useBreakpointValue({ base: 'column', md: 'row'})}
        >
            <Box mr={useBreakpointValue({ base: 0, md: 6})} w={useBreakpointValue({ base: 'full', md: '60%'})}>
                <Text
                    fontSize={useBreakpointValue({ base: '3xl', md: '4xl'})}
                    fontWeight="bold"
                    mt={3}
                >
                    {result.Title}
                </Text>

                {result.Rated !== "N/A" &&
                    <Tag variant='outline'>
                        {result.Rated}
                    </Tag>
                }
                
                {result.Plot !== "N/A" &&
                    <Text mb="6" fontSize={'lg'} opacity={0.7}>
                      {result.Plot}
                    </Text>
                }

                {result.Released !== "N/A" &&
                    <Flex mb="2" >
                        <Text mr={3} fontSize={'md'} fontWeight={'bold'}>
                            Released: 
                        </Text>
                        <Text fontSize={'md'} opacity={0.7}>
                            {result.Released}
                        </Text>
                    </Flex>
                }

                {result.Runtime !== "N/A" &&
                    <Flex mb="2" >
                        <Text mr={3} fontSize={'md'} fontWeight={'bold'}>
                            Duration: 
                        </Text>
                        <Text fontSize={'md'} opacity={0.7}>
                            {result.Runtime}
                        </Text>
                    </Flex>
                }

                {result.Genre !== "N/A" &&
                    <Flex mb="2" >
                        <Text mr={3} fontSize={'md'} fontWeight={'bold'}>
                            Genre: 
                        </Text>
                        <Text fontSize={'md'} opacity={0.7}>
                            {result.Genre}
                        </Text>
                    </Flex>
                }

                {result.imdbRating !== "N/A" &&
                    <Flex mb="6" >
                        <Text mr={3} fontSize={'md'} fontWeight={'bold'}>
                            imdbRating: 
                        </Text>
                        <Text fontSize={'md'} color="orange" fontWeight={'bold'}>
                            {result.imdbRating}
                        </Text>
                    </Flex>
                }
            </Box>
            <Spacer />
                <Flex
                    w={useBreakpointValue({ base: 'full', md: '40%'})}
                    alignItems="center"
                    justifyContent="center"
                    flexDirection={'column'}
                >
                <Img src={result.Poster} alt="Chakra UI" />
                    <Center my='4'>
                        {bookmarks.includes(id)?
                            <>
                                <Button mr={2} colorScheme="red" _hover={{background: "#420D09", color: "white"}} variant="outline" onClick={(e)=>{remove(e, {poster: result.Poster, name: result.Title, year: result.Year, _id: id})}}>Remove</Button>
                                <Button colorScheme="green" _hover={{background: "green", color: "white"}} variant="outline" isDisabled={watch} onClick={mark_as_watched}>{watch? "Watched": "Mark as watched"}</Button>
                            </>
                           
                        :
                            <Button colorScheme="orange" _hover={{background: "#420D09", color: "white"}} variant="outline" onClick={(e)=>{bookmark(e, {poster: result.Poster, name: result.Title, year: result.Year, _id: id})}}>Bookmark</Button>
                        }
                        
                    </Center>
            </Flex>
        </Flex>
        <Stack px={useBreakpointValue({ base: 6, md: 15})} w={useBreakpointValue({ base: 'full', md: '60%'})}>
            <Text
                fontSize={useBreakpointValue({ base: 'lg', md: '2xl'})}
                fontWeight="bold"
                mt={3}
            >
                My reviews
            </Text>
            {err.trim() !== "" &&
                <Text fontSize={'md'} color={'red'}>{err}</Text>
            }
            <Textarea placeholder='How you feel about this movie' resize={'none'} onChange={(e) => setReview(e.target.value)} value={review}/>
            <ReactStars
                count={5}
                size={24}
                color2={'#ffd700'} 
                value={rating}
                half={false}
                onChange={ratingChanged}
            />

            <Box my={6}>
                <Button my={6} colorScheme="orange" _hover={{background: "#420D09", color: "white"}} variant="outline" w={'6em'} onClick={submitReview}>Submit</Button>
            </Box>
            <Box my={6}>
                {myReviews.map((rev, index) => (
                    <Box key={index} py={2}>
                        <Card>
                            <CardBody>
                                <Text fontSize={'md'}>{rev.review}</Text>
                                    <Box pb={4}>
                                    <ReactStars
                                        count={5}
                                        size={18}
                                        color2={'#ffd700'} 
                                        value={rev.star}
                                        edit={false}
                                    />
                                    </Box>
                            </CardBody>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Stack>
            </>
        :
        <Stack px={useBreakpointValue({ base: 6, md: 15})} pt={'4em'}>
            <Text fontWeight={700} lineHeight={1.2} fontSize={useBreakpointValue({ base: '1xl', md: '2xl' })}>
                cannot find movie
            </Text>
        </Stack>
        }
        </>
       
    )
}

export const getServerSideProps = async (context) => {
    const res = await fetch(`${server}/api/movies/byID/${context.params.id}`)

    const result = await res.json()
  
    return {
      props: {
        result,
      },
    }
}


export default Movie