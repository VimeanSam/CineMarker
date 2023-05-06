import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  IconButton,
  useColorModeValue,
  Stack,
  Center,
  useBreakpointValue
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'
import VercelLogo from '../public/vercel.svg';

const Nav = ({navItems, path}) =>{
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(path)
  return(
      <>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} as="header" position="fixed" w="100%" color={"white"} padding={"1em"} background={path !== "/" ? "#A52A2A" : "transparent"} zIndex={2}>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={10} alignItems={'center'}>
                <Link href='/' style={{textDecoration: 'none'}}>
                  <svg style={{color: 'white', fontWeight: '600'}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16"> <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" fill="white"></path> </svg>
                </Link>
                {isDesktop && 
                  <>
                  {navItems.map((item, index) => (
                    <Link href={`/${item.toLowerCase()}`} fontWeight={500} _hover={{ textDecoration: 'none', color: '#FFE4E1'}} key={index}>
                      {item}
                    </Link>
                 ))}
                  </>
                }
               
              </Stack>
            </Flex>
            {!isDesktop && 
            //   <Flex alignItems={'center'}>
            //   <Stack direction={'row'} spacing={10}>
             
            //       <HamburgerIcon />

            //   </Stack>
            // </Flex>
              <Menu>
                <MenuButton cursor={'pointer'} minW={0}>
                  <HamburgerIcon fontSize={'1.5em'}/>
                </MenuButton>
                <MenuList>
                  {navItems.map((item, index) => (
                    <Link href={`/${item.toLowerCase()}`} fontWeight={500} _hover={{ textDecoration: 'none'}} key={index}>
                      <MenuItem color={"black"}>
                          {item}
                      </MenuItem>
                    </Link>
                  ))}
              </MenuList>
            </Menu>
            }          
        </Flex>
    </>
  )
}

export default Nav