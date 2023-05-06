import {
    Box,
    Button,
    Center,
    Heading,
    HStack,
    Flex,
    Image,
    Tag,
    Text,
    Stack,
    Spacer,
    useBreakpointValue
  } from '@chakra-ui/react';

import { CheckIcon } from '@chakra-ui/icons'

export default function Card({ poster, name, year, _id, type="search", bookmarks=[], bookmark, remove, watched=false}) {
    return (
        
        <Stack py={4}>
           <Box w="300px" rounded="20px" overflow="hidden" bg={"white"} shadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}>
            {/* <Image
                h="337px"
                w="full"
                borderTopRadius="12px"
                mb="10px"
                src={poster}
                alt="poster"
                fontSize="16px"
                objectFit="cover"
            /> */}
            <Flex    
                w={'full'}
                h={'337px'}
                backgroundImage={poster}
                borderTopRadius="12px"
                mb="10px"
                backgroundSize={'cover'}
                backgroundPosition={'center center'}
                alignItems={'flex-end'}
                justifyContent={'flex-end'}
            >
                {watched &&
                    <Box w={'full'}>
                        <Flex background={'rgba(0, 0, 0, 0.5)'}>
                            <Text fontSize={'md'} fontWeight={'bold'} color="lightgray" mx={2}>
                                <CheckIcon />
                            </Text>
                            <Text fontSize={'md'} color="lightgray" fontWeight={'bold'} mx={2}>
                                Watched
                            </Text>
                        </Flex>
                    </Box>
                }
                
            </Flex>
            <Heading as="h2" fontWeight="bold" fontSize="16px" px={3} isTruncated>
                {name}
            </Heading>
            <HStack mt={1} px={3}>
                <Text fontSize={"md"}>{year}</Text>
            </HStack>

            {type==="search" &&
                <Center my='4'>
                    <Button colorScheme="orange" _hover={{background: "#420D09", color: "white"}} variant="outline" onClick={(e)=>{bookmark(e, {poster: poster, name: name, year: year, _id: _id})}} isDisabled={bookmarks.includes(_id)? true : false}>{bookmarks.includes(_id)? "bookmarked" : "bookmark"}</Button>
                </Center>
            }

            {type==="bookmark" &&
                <Center my='4'>
                    <Button colorScheme="red" _hover={{background: "#420D09", color: "white"}} variant="outline" onClick={(e)=>{remove(e, {poster: poster, name: name, year: year, _id: _id})}}>Remove</Button>
                </Center>
            }
            
            </Box>
        </Stack>
      );
}
