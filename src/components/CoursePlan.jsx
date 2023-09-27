const CoursePlan = ({selected}) => (
  <div className="course-plan">
    {
      selected.length === 0
      ? <h2>
          No courses are selected. To view a course plan, 
          please select courses by clicking on a course.
        </h2>
      : selected.map(course => (
          <div>
            CS {course.number}: {course.title}, {course.meets}
          </div>
        ))
    }
  </div>
);

export default CoursePlan;