import {Flex} from '@chakra-ui/react';
  
const HeroImage = ({children}) => {
    return (
        <Flex
            w={'full'}
            h={'100vh'}
            backgroundImage={
                "linear-gradient(to bottom, rgba(6, 7, 7, 0.8), #420D09), url(/images/movies.jpg)"
            }
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            {children}
        </Flex>
    );
}

export default HeroImage