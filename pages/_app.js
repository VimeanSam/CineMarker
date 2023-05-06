import '@/styles/globals.css'
import Layout from '../components/Layout'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.900',
      },
      h1: {
        fontSize: '4xl',
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '2xl',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: 'lg'
      },
      h4: {
        fontSize: 'md'
      }
    }
  }
})

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
