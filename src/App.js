import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Month from './Components/Month';

class App extends Component {

  state = {
    currentDay: null,
    selectedDay: null,
    currentMonth: null,
    currentYear: null,
    daysInMonth: null,
    firstDay: null,
    lastMonthDays: null,
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'november', 'December']
  }

  componentDidMount(){

    // Get the current day and month when app starts.
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    this.getCurrentCalendarData(currentMonth, currentYear, true);
  }

  getCurrentCalendarData = (currentMonth, currentYear, initial) => {

    // Determine the first day of the current month of the calendar, the number of days in the month,
    // and the number of days last month.
    const firstDay = (new Date(currentYear, currentMonth)).getDay();
    const daysInMonth = 32 - (new Date(currentYear, currentMonth, 32).getDate());
    const lastMonthDays = 32 - (new Date(currentYear, currentMonth-1, 32).getDate());

    // Store all data in component state.
    this.setState({
      currentDay: currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? new Date().getDate() : null,
      selectedDay: initial ? new Date().getDate() : null,
      daysInMonth: daysInMonth,
      firstDay: firstDay,
      currentMonth: currentMonth,
      currentYear: currentYear,
      lastMonthDays: lastMonthDays
    });
  }

  // Change to new month.
  onChangeMonth = (direction) => {

    const { currentYear, currentMonth } = this.state;

    let newYear = currentYear;
    let newMonth = currentMonth;

    // Determing if what year and month should be displayed next.
    if(direction === 'next'){
      newYear = (currentMonth === 11) ? newYear + 1 : newYear;
      newMonth = (currentMonth + 1) % 12;
    }
    else {
      newYear = (currentMonth === 0) ? newYear - 1 : newYear;
      newMonth = (currentMonth === 0) ? 11 : newMonth - 1;
    }

    this.getCurrentCalendarData(newMonth, newYear)
  }

  onSelectDay = (day) => {
    // Update selected day.
    console.log(this.state.months[this.state.currentMonth], day, this.state.currentYear);
    this.setState({ selectedDay: day })
  }

  render(){

    const { currentDay, selectedDay, currentMonth,
      currentYear, daysInMonth, firstDay, months, lastMonthDays } = this.state;

    return (
      <div className="App">
        <Header
          month={months[currentMonth]}
          year={currentYear}
          onChangeMonth={this.onChangeMonth}
        />
        <Month
          currentDay={currentDay}
          selectedDay={selectedDay}
          daysInMonth={daysInMonth}
          firstDay={firstDay}
          lastMonthDays={lastMonthDays}
          onSelectDay={this.onSelectDay}
        />
      </div>
    );
  }
}

export default App;
