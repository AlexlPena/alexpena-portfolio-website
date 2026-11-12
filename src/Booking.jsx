import React from 'react';
import {ArrowUpRight} from 'lucide-react';
import {Wordmark} from './Studio';

const bookingUrl='https://calendar.google.com/calendar/appointments/schedules/AcZssZ1PISlPHGixMokboFj63PqMqDXxgGrKX0_qpmbf4FAvIEAJMZQjoG9_rtjo9Mruhk2lqR-6qmod';

export default function Booking(){
 return <div className="booking-page">
  <header className="booking-header container"><a href="/home" aria-label="Alex Pena home"><Wordmark/></a><a className="text-link" href="/home">Back to the website <ArrowUpRight size={16}/></a></header>
  <main className="booking-main container">
   <div className="booking-intro"><p className="section-kicker">Talk directly with Alex</p><h1>Start with one<br/>better workflow.</h1><p>Bring a repetitive task, a disconnected tool, or a question about AI. We’ll discuss how your team works today and where I might be able to help.</p></div>
   <section className="booking-calendar" aria-labelledby="booking-title"><div className="booking-calendar-heading"><h2 id="booking-title">Book a discovery call</h2><p>Choose an available time below.</p></div><iframe src={`${bookingUrl}?gv=true`} title="Book a discovery call with Alex Pena" width="100%" height="700"/><p className="booking-fallback">Having trouble with the calendar? <a href={bookingUrl} target="_blank" rel="noopener noreferrer">Open the booking page in a new tab <ArrowUpRight size={14}/></a></p></section>
   <p className="booking-email">Prefer to start by email? <a href="mailto:alex@alexpena.dev">alex@alexpena.dev</a></p>
  </main>
 </div>;
}
