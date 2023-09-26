import Banner from "./components/Banner";
import TermPage from "./components/TermSelector";
import CourseList from "./components/CourseList";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';

const Main = () => {
  // Fetch Data
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (error) return <h1>Error loading data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading data...</h1>;
  if (!data) return <h1>Data not found</h1>;

  return ( 
  <div className="container">
      <Banner title = {data.title}/>
      <TermPage courses = {data.courses}/>
  </div>
  )
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <Main />
  </QueryClientProvider>
);
export default App;
