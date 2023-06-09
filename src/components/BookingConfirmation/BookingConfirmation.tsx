import {useNavigate} from 'react-router-dom';
import {useConfirmationReducer} from '../../store';
import './styles.css';

function BookingConfirmation() {
  const navigate = useNavigate();

  const {state, actions} = useConfirmationReducer();

  const onChangeClick = () => {
    actions.setConfirmation(null);
    navigate('/booking');
  };

  return (
    <section id="booking-confirmation">
      <div className="booking-confirmation-section">
        {state.confirmation ? (
          <div>
            <h1>Booking Confirmed</h1>
            <div>
              <h3>Date</h3>
              <span>{state.confirmation.date}</span>
            </div>
            <div>
              <h3>Time</h3>
              <span>{state.confirmation.time}</span>
            </div>
            <div>
              <h3>Number of Guests</h3>
              <span>{state.confirmation.numberOfGuests}</span>
            </div>
            <div>
              <h3>Occasion</h3>
              <span>{state.confirmation.occasion}</span>
            </div>
            <button
              onClick={onChangeClick}
              className="main-button change-confirmation">
              Change
            </button>
          </div>
        ) : (
          <div id="no-booking">
            <h1>No Booking Confirmed at the Moment</h1>
            <button
              onClick={() => {
                navigate('/booking');
              }}
              className="main-button change-confirmation">
              Reserve a table
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default BookingConfirmation;
