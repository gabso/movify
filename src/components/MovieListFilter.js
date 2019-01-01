import React from 'react';
import { connect } from 'react-redux';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { setTextFilter, sortByDate, setStartDate, setEndDate } from '../actions/filters';


export class MovieListFilters extends React.Component {
  state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onstartDateChange = (dates) =>{

    if (!dates){
      this.props.setStartDate();
      this.props.setEndDate();
      return;
    }

    this.props.setStartDate(dates[0]);
    this.props.setEndDate(dates[1]);
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
  };
  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Search movies"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
          <DateRangePicker className="date-picker" maxDetail="decade"
          onChange={this.onstartDateChange}
          value={[this.props.filters.startDate,this.props.filters.endDate]}  />
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieListFilters);
