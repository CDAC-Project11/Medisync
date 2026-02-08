import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import '../../styles/patient/appointment.css';

const Appointment = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timeSlots = [
    "9:00 AM", "9:15 AM", "9:30 AM", "9:45 AM",
    "10:00 AM", "10:15 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "4:00 PM", "4:30 PM", "5:00 PM"
  ];

  const showError = (msg) => {
    setErrorMessage(msg);
    setSuccessMessage('');
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setErrorMessage('');
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1
    ));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1
    ));
  };

  const generateCalendar = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendar = [];
    let week = [];

    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }

      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);

      week.push({
        day,
        date,
        isPast: date < today
      });
    }

    while (week.length < 7) {
      week.push(null);
    }
    calendar.push(week);

    return calendar;
  };

  const handleDateClick = (dateObj) => {
    if (!dateObj.isPast) {
      setSelectedDate(dateObj.date);
    }
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const convertTo24Hour = (time) => {
    const [hourMin, period] = time.split(" ");
    let [hour, minute] = hourMin.split(":").map(Number);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    //changed
return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;return `${String(hour).padStart(2, "0")}:${minute}:00`;
  };

  const handleBookAppointment = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) return showError("Please login again.");
    if (!selectedDate) return showError("Please select date.");
    if (!selectedTime) return showError("Please select time.");
    if (symptoms.trim().length < 5) return showError("Symptoms too short.");

    try {
      const response = await fetch(
        "http://localhost:8082/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            appointmentDate: selectedDate.toISOString().split("T")[0],
            appointmentTime: convertTo24Hour(selectedTime),
            reason: symptoms,
            doctorId: 1
          })
        }
      );

      if (!response.ok) throw new Error();

      showSuccess("Appointment booked successfully!");
      setSymptoms("");
      setSelectedDate(null);
      setSelectedTime(null);

    } catch {
      showError("Failed to book appointment.");
    }
  };

  const calendar = generateCalendar();
  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();

  return (
    <>
      <Navbar />

      <div className="appointment-page">
        <div className="page-overlay"></div>

        <div className="page-content">
          <div className="container">
            <div className="appointment-grid">

              {/* Doctor Card */}
              <div className="doctor-section">
                <div className="glass-card doctor-card">
                  <div className="doctor-info-wrapper">
                    <img
                      src="https://dratdoorstep.com/wp-content/uploads/2025/07/Dr-at-door-homepage-banner-dr-image.png"
                      alt="Doctor"
                      className="doctor-img"
                    />

                    <div className="doctor-details">
                      <h4 className="doctor-name">Dr. Sachin Raundal</h4>
                      <p className="doctor-specialty">Physician</p>
                      <p className="doctor-experience">30+ Years Experience</p>
                      <p className="doctor-qualification">MBBS</p>

                      <hr className="divider" />

                      <p className="info-text"><b>Languages:</b> English, Hindi, Marathi</p>
                      <p className="info-text"><b>Timings:</b> 9:00 AM – 5:30 PM (Mon–Sat)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Section */}
              <div className="booking-section">
                <div className="glass-card booking-card">

                  <h4 className="booking-title">Book Appointment</h4>
                  <p className="clinic-info">Ekvira Clinic, Nashik</p>

                  {errorMessage && <div className="error-box">{errorMessage}</div>}
                  {successMessage && <div className="success-box">{successMessage}</div>}

                  <div className="calendar">
                    <div className="calendar-header">
                      <button onClick={handlePrevMonth} className="month-nav-btn">◀</button>
                      <h6 className="calendar-title">{monthName} {year}</h6>
                      <button onClick={handleNextMonth} className="month-nav-btn">▶</button>
                    </div>

                    <table className="calendar-table">
                      <thead>
                        <tr>
                          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                            <th key={d}>{d}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {calendar.map((week, i) => (
                          <tr key={i}>
                            {week.map((dateObj, j) => (
                              <td
                                key={j}
                                onClick={() => dateObj && handleDateClick(dateObj)}
                                className={`calendar-date
                                  ${!dateObj ? 'empty-date' : ''}
                                  ${dateObj?.isPast ? 'past-date' : ''}
                                  ${selectedDate && dateObj &&
                                  selectedDate.getTime() === dateObj.date.getTime()
                                    ? 'active-date' : ''}`}
                              >
                                {dateObj?.day || ''}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="section-label">Select Time</p>
                  <div className="time-slots">
                    {timeSlots.map(time => (
                      <div
                        key={time}
                        onClick={() => handleTimeClick(time)}
                        className={`time-btn ${selectedTime === time ? 'active' : ''}`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>

                  <p className="section-label">Symptoms</p>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="symptoms-input"
                    rows="3"
                    placeholder="Explain your symptoms..."
                  />

                  <button onClick={handleBookAppointment} className="book-btn">
                    BOOK APPOINTMENT →
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
