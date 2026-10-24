import { WeddingEvent } from '../types/wedding';

/**
 * Generates an .ics file download for a wedding event or all events
 */
export function downloadIcsFile(event: WeddingEvent) {
  const formatDate = (iso: string) => {
    return iso.replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Samarthya & Nikita Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}-2026@samarthya-nikita-wedding.in`,
    `DTSTAMP:${formatDate(new Date().toISOString())}`,
    `DTSTART:${formatDate(event.isoDateStart)}`,
    `DTEND:${formatDate(event.isoDateEnd)}`,
    `SUMMARY:Samarthya & Nikita Wedding - ${event.title}`,
    `DESCRIPTION:${event.title} - Celebrations of the Holy Matrimony of Samarthya Solomon Selot & Nikita Martin.\\nTime: ${event.time}\\nVenue: ${event.venue}`,
    `LOCATION:${event.venue}, ${event.venueAddress}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${event.id}-samarthya-nikita-wedding.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Builds Google Calendar web URL for 1-tap addition
 */
export function getGoogleCalendarUrl(event: WeddingEvent): string {
  const formatGDate = (iso: string) => {
    return iso.replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const start = formatGDate(event.isoDateStart);
  const end = formatGDate(event.isoDateEnd);
  const title = encodeURIComponent(`Samarthya & Nikita: ${event.title}`);
  const details = encodeURIComponent(
    `Solemnization of Holy Matrimony of Samarthya Solomon Selot & Nikita Martin.\nTime: ${event.time}\nVenue: ${event.venue}\nAddress: ${event.venueAddress}`
  );
  const location = encodeURIComponent(`${event.venue}, ${event.venueAddress}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}
