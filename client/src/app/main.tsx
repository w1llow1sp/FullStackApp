import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import {App} from "./App.tsx";
import {ApolloClient, InMemoryCache,ApolloProvider} from '@apollo/client'


const client = new ApolloClient({
    uri: import.meta.env.VITE_API_URL,
    cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
  </StrictMode>,
)
