import { useState } from 'react';
import CourseList from './CourseList';
import TermSelector from './TermSelector';
import Terms from './TermConstants';
import Modal from './Modal';
import CoursePlan from './CoursePlan';

const CoursePage = ({courses}) => {
    // Term Selection
    const [buttonSelection, setSelection] = useState(() => Terms[0]);
    
    // Course Selection
    const [selectedCourses, setSelectedCourses] = useState([]);
    const toggleSelected = (item) => setSelectedCourses(
        selectedCourses.includes(item)
        ? selectedCourses.filter(x => x !== item)
        : [...selectedCourses, item]
      );

    // Pop Up
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    return (
      <div>
        <button className="btn btn-outline-dark" 
          onClick={openModal}>Course Plan
        </button>
        <Modal open={open} close={closeModal}>
          <CoursePlan selected={selectedCourses} />
        </Modal>
        <TermSelector selection={buttonSelection} setSelection={setSelection} />
        <CourseList selection={buttonSelection} 
                    courses={courses} 
                    selectedCourses={selectedCourses}
                    toggleSelected={toggleSelected}/>
      </div>
    );
  };  

  export default CoursePage;
