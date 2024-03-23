import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

const initialAppointmentList = []

class Appointments extends Component {
  state = {
    appointmentList: initialAppointmentList,
    title: '',
    date: '',
    showStarred: false, // New state variable
  }

  componentDidMount() {
    // Retrieve state from localStorage when the component mounts
    const storedState = localStorage.getItem('appointmentsState')
    if (storedState) {
      this.setState(JSON.parse(storedState))
    }
  }

  componentDidUpdate() {
    // Store state in localStorage whenever it changes
    localStorage.setItem('appointmentsState', JSON.stringify(this.state))
  }

  onclickAddButton = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  deleteAppointment = id => {
    const {appointmentList} = this.state
    const filteredAppointmentList = appointmentList.filter(
      each => each.id !== id,
    )
    this.setState({
      appointmentList: filteredAppointmentList,
    })
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onToggleStarred = () => {
    this.setState(prevState => ({
      showStarred: !prevState.showStarred,
    }))
  }

  render() {
    const {appointmentList, title, date, showStarred} = this.state
    const displayedAppointments = showStarred
      ? appointmentList.filter(appointment => appointment.isStarred)
      : appointmentList

    return (
      <div className="bg-container">
        <div className="card">
          <h1>Add Appointment</h1>
          <div className="flex">
            <div>
              <form className="appointment-form-container">
                <label htmlFor="title" className="label-title">
                  TITLE
                </label>
                <input
                  onChange={this.onChangeTitle}
                  className="input"
                  id="title"
                  placeholder="Title"
                  value={title}
                />
                <label htmlFor="date" className="label-title">
                  DATE
                </label>
                <input
                  onChange={this.onChangeDate}
                  type="date"
                  className="input"
                  id="date"
                  placeholder="dd/mm/yyyy"
                  value={date}
                />
                <button
                  onClick={this.onclickAddButton}
                  type="button"
                  className="button"
                >
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>

          <hr className="hr" />

          <div className="apointmentss-contianer">
            <div>
              <h1 className="head">Appointments</h1>
            </div>
            <div>
              <button
                onClick={this.onToggleStarred}
                className="button2"
                type="button"
              >
                Starred
              </button>
            </div>
          </div>

          <ul className="us">
            {displayedAppointments.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
                deleteAppointment={this.deleteAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
