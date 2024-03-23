import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred, deleteAppointment} = props
  const {id, title, date, isStarred} = appointmentDetails
  const formattedDate = format(new Date(date), 'MMMM d, yyyy, EEEE')

  const onDeleteAppointment = () => {
    deleteAppointment(id)
  }

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onclickStarredIcon = () => {
    toggleIsStarred(id)
  }

  return (
    <li>
      <div className="bg-containerr">
        <div className="card2">
          <div>
            <p className="heading">{title}</p>
            <p> {formattedDate} </p>
          </div>
          <div className="image-container">
            <button
              type="button"
              data-testid="star"
              onClick={onclickStarredIcon}
              className="star-button"
            >
              <img src={starImgUrl} className="star-image" alt="star" />
            </button>
            <button
              className="delete-button"
              type="button"
              onClick={onDeleteAppointment}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/delete-img.png"
                alt="cross"
                className="delete-img"
              />
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default AppointmentItem
