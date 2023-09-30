import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import CoursePage from './CoursePage';
import CourseEditor from "../CourseEditor";

const CourseFormForUrl = ({courses}) => {
    const { id } = useParams();
    return <div className = "container"><CourseEditor id={id} course={courses[id]} /></div>;
  };

const Dispatcher = ({courses}) => {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <div className = "container">
          <CoursePage courses = {courses}/>
        </div>} 
      />
      <Route path="/:id/edit" element={
        <CourseFormForUrl courses={courses} />}
      />
    </Routes>
  </BrowserRouter>
  );
};

export default Dispatcher;