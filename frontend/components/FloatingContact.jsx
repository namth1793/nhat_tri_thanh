'use client';
import { useState } from 'react';

const ZALO_NUMBER = '0xxxxxxxxx'; // Thay số Zalo thật
const WHATSAPP_NUMBER = '84xxxxxxxxx'; // Thay số WhatsApp thật (bỏ số 0 đầu, thêm 84)
const PHONE_NUMBER = '0xxxxxxxxx';

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Contact buttons (show when expanded) */}
      {expanded && (
        <>
          {/* Phone */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-3 bg-white shadow-lg rounded-full pr-4 pl-2 py-2 hover:shadow-xl transition-shadow duration-200 group"
            title="Gọi điện"
          >
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gray-900 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{PHONE_NUMBER}</span>
          </a>

          {/* Zalo */}
          <a
            href={`https://zalo.me/${ZALO_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white shadow-lg rounded-full pr-4 pl-2 py-2 hover:shadow-xl transition-shadow duration-200 group"
            title="Chat Zalo"
          >
            <div className="w-10 h-10 bg-[#0068FF] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm">Z</span>
            </div>
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Chat Zalo</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white shadow-lg rounded-full pr-4 pl-2 py-2 hover:shadow-xl transition-shadow duration-200 group"
            title="Chat WhatsApp"
          >
            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">WhatsApp</span>
          </a>
        </>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-all duration-200 hover:shadow-xl"
        title="Liên hệ"
      >
        {expanded ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Pulse ring when collapsed */}
      {!expanded && (
        <span className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-primary opacity-30 animate-ping pointer-events-none" />
      )}
    </div>
  );
}
