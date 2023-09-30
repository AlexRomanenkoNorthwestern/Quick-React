import './CourseList.css';
import { Link } from 'react-router-dom';
import { useProfile } from '../utilities/profile';

const Course = ({courseId, course, selectedCourses, unselectableCourses, toggleSelected}) => 
{
    const [profile, profileLoading, profileError] = useProfile();

    if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
    if (profileLoading) return <h1>Loading user profile</h1>;
    if (!profile) return <h1>No profile data</h1>;

    const url = '/' + courseId + '/edit';
    return(
    <div className ="card m-1 p-2" onClick={() => toggleSelected(course)}>
      <div className={`card-body ${selectedCourses.includes(course) ? 'selected' : 'notselected'}
      ${unselectableCourses.includes(course) ? 'unselectable' : ''}`}>
      <div>
        <h4>{course.term}{' CS '}{course.number}
        {
           profile?.isAdmin &&
          <Link to={url} >
            <button style ={{background:'transparent', border:'transparent'}} >
              <i className={'bi-pencil-square'} style = {{color: 'grey', marginleft: '10px'}}/>
            </button>
          </Link>
        }
        </h4>
      </div>
        {course.title}
      </div>
      <div className="card-footer bg-transparent">
        {course.meets} 
        <br></br> 
        <button className={`${'btn btn-primary'} ${unselectableCourses.includes(course) ? 'invisible' : ''}`}>
          <i className={`${selectedCourses.includes(course) ? 'bi bi-x-square-fill' : ''}
          ${unselectableCourses.includes(course) ? 'unselectable' : ''}
          ${!selectedCourses.includes(course) && !unselectableCourses.includes(course) ? 'bi bi-plus-square-fill' : ''}`}>
          </i> &nbsp; {`${selectedCourses.includes(course) ? 'Remove' : ''}`} 
          {`${!selectedCourses.includes(course) && !unselectableCourses.includes(course) ? 'Add' : ''}`}
        </button>
      </div>
    </div>
    );
  };


const CourseList = ({courses, selection, selectedCourses, unselectableCourses, toggleSelected}) => {
  return( 
  <div className="course-list">
    { 
    Object.entries(courses).map(([id, course]) => {
      if (course.term == selection) return( <Course courseId = {id} course = {course} selectedCourses = {selectedCourses} 
      unselectableCourses = {unselectableCourses} toggleSelected = {toggleSelected}/>)})
    }
  </div>
)
};

export default CourseList;
