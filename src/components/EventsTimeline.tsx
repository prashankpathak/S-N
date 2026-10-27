import React, { useState } from 'react';
import { WeddingEvent } from '../types/wedding';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendar';
import { GoldDivider } from './OrnateFrame';
import { Calendar, MapPin, Clock, ExternalLink, Download, Check } from 'lucide-react';

const weddingEventsData: WeddingEvent[] = [
  {
    id: 'event-prayer-mehendi',
    number: '01',
    title: 'Prayer Meeting & Mehendi Celebration',
    subTitle: 'Blessings & Henna Night',
    date: 'Thursday, 11th November, 2026',
    time: '6:30 PM onwards',
    isoDateStart: '2026-11-11T18:30:00+05:30',
    isoDateEnd: '2026-11-11T22:30:00+05:30',
    venue: '63, Johnson Compound',
    venueAddress: 'Narmada Rd, Jabalpur (M.P.)',
    googleMapsUrl: 'https://maps.google.com/?q=Johnson+Compound+Narmada+Rd+Jabalpur',
    note: 'Join us for thanksgiving prayers followed by traditional Mehendi and tea.',
  },
  {
    id: 'event-haldi',
    number: '02',
    title: 'Haldi Ceremony',
    subTitle: 'Auspicious Turmeric Rituals',
    date: 'Thursday, 12th November, 2026',
    time: '11:00 AM onwards',
    isoDateStart: '2026-11-12T11:00:00+05:30',
    isoDateEnd: '2026-11-12T14:30:00+05:30',
    venue: 'West Elizey, Shawn Elizey',
    venueAddress: 'Jabalpur, Madhya Pradesh',
    googleMapsUrl: 'https://maps.google.com/?q=Shawn+Elizey+Jabalpur',
  },
  {
    id: 'event-sangeet',
    number: '03',
    title: 'Sangeet Night',
    subTitle: 'Music, Dance & Joyous Beats',
    date: 'Thursday, 12th November, 2026',
    time: '7:30 PM onwards',
    isoDateStart: '2026-11-12T19:30:00+05:30',
    isoDateEnd: '2026-11-12T23:59:00+05:30',
    venue: 'East Elizey, Shawn Elizey',
    venueAddress: 'Jabalpur, Madhya Pradesh',
    googleMapsUrl: 'https://maps.google.com/?q=Shawn+Elizey+Jabalpur',
  },
  {
    id: 'event-matrimony',
    number: '04',
    title: 'Holy Matrimony (The Wedding)',
    subTitle: 'The Sacred Covenant of Marriage',
    date: 'Friday, 13th November, 2026',
    time: 'As the clock strikes 4:00 PM IST',
    isoDateStart: '2026-11-13T16:00:00+05:30',
    isoDateEnd: '2026-11-13T18:30:00+05:30',
    venue: 'Disciples Church of Christ, CNI',
    venueAddress: 'Nagrath Chowk, Jabalpur (M.P.)',
    googleMapsUrl: 'https://maps.google.com/?q=Disciples+Church+of+Christ+Nagrath+Chowk+Jabalpur',
    note: 'Please arrive by 3:45 PM to be comfortably seated for the bridal procession.',
  },
  {
    id: 'event-reception',
    number: '05',
    title: 'Wedding Reception',
    subTitle: 'Dinner, Toasts & Celebrations',
    date: 'Friday, 13th November, 2026',
    time: '7:30 PM onwards',
    isoDateStart: '2026-11-13T19:30:00+05:30',
    isoDateEnd: '2026-11-13T23:30:00+05:30',
    venue: 'Shawn Elizey',
    venueAddress: 'Jabalpur, Madhya Pradesh',
    googleMapsUrl: 'https://maps.google.com/?q=Shawn+Elizey+Jabalpur',
    note: 'Followed by sumptuous banquet feast and cake-cutting celebration.',
  },
];

export const EventsTimeline: React.FC = () => {
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);

  const handleDownloadAllIcs = () => {
    weddingEventsData.forEach((ev, idx) => {
      setTimeout(() => {
        downloadIcsFile(ev);
      }, idx * 250);
    });
  };

  return (
    <section className="relative my-8 px-4" id="itinerary">
      <div className="text-center max-w-sm mx-auto mb-6">
        <span className="font-cinzel text-[10px] tracking-[0.28em] text-[#8c6b2b] uppercase font-bold">
          Celebration Timeline
        </span>
        <h3 className="font-cormorant font-bold text-3xl sm:text-4xl text-gold-foil mt-1">
          Events &amp; Itinerary
        </h3>
        <p className="font-cormorant italic text-sm text-[#5a4830] mt-1">
          Each sacred moment marked with joy, music, and divine blessings
        </p>
      </div>

      {/* Event Cards */}
      <div className="space-y-6 max-w-sm mx-auto">
        {weddingEventsData.map((event) => (
          <div
            key={event.id}
            className="relative rounded-2xl p-5 bg-gradient-to-b from-[#ffffff] via-[#fffdf9] to-[#faf5eb] border border-[#c5a059]/40 shadow-md transition-all duration-300 hover:shadow-lg"
          >
            {/* Top Row: Event Number & Title */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-cinzel text-[10px] tracking-[0.22em] text-[#8c6b2b] uppercase font-bold block">
                  Event {event.number}
                </span>
                <h4 className="font-cormorant font-bold text-xl sm:text-2xl text-[#2d2215] leading-tight mt-0.5">
                  {event.title}
                </h4>
                {event.subTitle && (
                  <p className="font-cormorant italic text-xs text-[#705a39]">
                    {event.subTitle}
                  </p>
                )}
              </div>
              <div className="w-8 h-8 rounded-full border border-[#c5a059]/50 flex items-center justify-center shrink-0 bg-[#faf4e6] text-[#8c6b2b] font-cinzel font-bold text-xs shadow-inner">
                {event.number}
              </div>
            </div>

            <GoldDivider className="my-3 opacity-50" />

            {/* Date & Time */}
            <div className="space-y-1.5 text-xs text-[#3f3120]">
              <div className="flex items-center gap-2 font-medium">
                <Calendar className="w-4 h-4 text-[#8c6b2b] shrink-0" />
                <span className="font-serif">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8c6b2b] shrink-0" />
                <span className="font-cinzel text-[11px] font-semibold text-[#8c6b2b]">
                  {event.time}
                </span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-[#8c6b2b] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-medium text-[#291f13] block">
                    {event.venue}
                  </strong>
                  <span className="text-[11px] text-[#6b563b] leading-relaxed block">
                    {event.venueAddress}
                  </span>
                </div>
              </div>
            </div>

            {/* Optional Note */}
            {event.note && (
              <p className="font-cormorant italic text-xs text-[#6e5836] bg-[#fbf8f0] p-2.5 rounded-lg border border-[#e8dcbe] mt-3">
                &ldquo;{event.note}&rdquo;
              </p>
            )}

            {/* Action Bar: Google Maps & Add to Calendar */}
            <div className="mt-4 pt-3 border-t border-[#e8dcbe] flex items-center justify-between gap-2">
              <a
                href={event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[40px] px-3 py-1.5 rounded-lg border border-[#c5a059]/60 bg-gradient-to-r from-[#faf6ec] to-[#f4ebe0] hover:bg-[#ebdcc0] text-[#41311b] font-cinzel text-[10px] font-semibold tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <MapPin className="w-3.5 h-3.5 text-[#8c6b2b]" />
                <span>View Map</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={getGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[40px] px-3 py-1.5 rounded-lg border border-[#c5a059]/60 bg-gradient-to-r from-[#faf6ec] to-[#f4ebe0] hover:bg-[#ebdcc0] text-[#41311b] font-cinzel text-[10px] font-semibold tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                title="Add to Google Calendar"
              >
                <Calendar className="w-3.5 h-3.5 text-[#8c6b2b]" />
                <span>Google Cal</span>
              </a>

              <button
                onClick={() => {
                  downloadIcsFile(event);
                  setCopiedEventId(event.id);
                  setTimeout(() => setCopiedEventId(null), 2000);
                }}
                className="min-h-[40px] px-2.5 py-1.5 rounded-lg border border-[#c5a059]/40 bg-white hover:bg-[#fbf7ee] text-[#41311b] flex items-center justify-center active:scale-95 transition-transform"
                title="Download .ics file for Apple / Outlook Calendar"
                aria-label={`Download .ics file for ${event.title}`}
              >
                {copiedEventId === event.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Download className="w-3.5 h-3.5 text-[#8c6b2b]" />
                )}
              </button>
            </div>
          </div>
        ))}

        {/* Master Add-All-Events button */}
        <div className="pt-2 text-center">
          <button
            onClick={handleDownloadAllIcs}
            className="w-full py-2.5 px-4 rounded-xl border border-[#c5a059] bg-[#fffdfa] hover:bg-[#fcf8ef] text-[#42321c] font-cinzel text-xs font-semibold tracking-wider shadow-sm flex items-center justify-center gap-2 active:scale-98 transition-transform"
          >
            <Download className="w-4 h-4 text-[#8c6b2b]" />
            <span>Download All 5 Events (.ics Calendar)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
