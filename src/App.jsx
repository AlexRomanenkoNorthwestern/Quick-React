import Banner from './components/Banner';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useJsonQuery } from './utilities/fetch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dispatcher from './components/Dispatcher';

const Main = () => {
  const [data, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");

  if (error) return <h1>Error loading data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div style={{background:'whitesmoke'}}>
      <div className = "container-fluid" style={{background:"linear-gradient(#dce8f6, #dce8f6)" }}>
        <Banner title = {data.title}/>
      </div>
      <Dispatcher courses = {data.courses}/>
    </div>
  );
}

const App = () => {
  const queryClient = new QueryClient();
  return(
    <QueryClientProvider client={queryClient}>
        <Main/>
    </QueryClientProvider>
  )
};

export default App;
