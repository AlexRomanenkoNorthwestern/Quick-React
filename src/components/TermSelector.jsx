import { useState } from 'react';
import CourseList from './CourseList';

const terms = ['Fall', 'Winter', 'Spring'];

const TermButton = ({term, selection, setSelection}) => (
  <div>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
    { term }
    </label>
  </div>
);

const TermSelector = ({selection, setSelection}) => (
  <div class="text-center">
    <div className="btn-group">
    { 
      terms.map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
    </div>
  </div>
);

const TermPage = ({courses}) => {
  const [buttonSelection, setSelection] = useState(() => terms[0]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const toggleSelected = (item) => setSelectedCourses(
    selectedCourses.includes(item)
    ? selectedCourses.filter(x => x !== item)
    : [...selectedCourses, item]
  );

  return (
    <div>
      <TermSelector selection={buttonSelection} setSelection={setSelection} />
      <CourseList selection={buttonSelection} 
                  courses={courses} 
                  selectedCourses={selectedCourses}
                  toggleSelected={toggleSelected}
      />
    </div>
  );
}  

export default TermPage;
