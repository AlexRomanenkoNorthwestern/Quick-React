import Terms from './TermConstants';
import './TermSelector.css'

const TermButton = ({term, selection, setSelection}) => (
  <div>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label className="btn btn-primary term-button" htmlFor={term}>
    { term }
    </label>
  </div>
);

const TermSelector = ({selection, setSelection}) => (
  <div className="text-center">
    <div className="btn-group">
    { 
      Terms.map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
    </div>
  </div>
);

export default TermSelector;
