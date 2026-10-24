import React from 'react';
import { GoldDivider, CornerFlourish } from './OrnateFrame';
import { Phone, MessageCircle, Heart, Sparkles } from 'lucide-react';

export const FamilyBlessingsSection: React.FC = () => {
  const blessingsList = [
    'Mrs. Rekha & Maj. Gen S.C. Meston',
    'Dr. Mrs. Rashmi & Mr. Joseph Minj',
    'Mrs. Dorthi Suman',
    'Mrs. Sunita & Late Mr. Herold Shah',
    'Mrs. Anjali Shabnam & Late Mr. Jerold Shah',
    'Ms. Reena Shah & Ms. Edna Shah',
  ];

  const welcomingList = [
    'Mrs. Ekta & Lt. Col Shikhar Meston',
    'Mrs. Sunila & Mr. Anurag Minj',
    'Dr. Mrs. Palak & Lt. Col. Kshitij Meston',
    'Mrs. Shireen & Mr. Sumeet Lader',
    'Ms. Sheryl Shah',
  ];

  return (
    <section className="relative my-8 px-4" id="blessings">
      <div className="max-w-sm mx-auto space-y-6">
        {/* ================= BLESSINGS OF OUR FAMILIES ================= */}
        <div className="relative p-5 rounded-2xl bg-gradient-to-b from-white via-[#faf6ee] to-[#f5ecdd] border border-[#c5a059]/40 shadow-md text-center">
          <CornerFlourish position="top-left" size={32} />
          <CornerFlourish position="top-right" size={32} />

          <div className="flex items-center justify-center gap-1.5 mb-1 text-[#8c6b2b]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-cinzel text-[10px] tracking-[0.26em] uppercase font-bold">
              With Warm Affection
            </span>
          </div>

          <h3 className="font-cormorant font-bold text-2xl sm:text-3xl text-gold-foil">
            Blessings of Our Families
          </h3>

          <GoldDivider className="my-3 opacity-60" />

          <div className="space-y-2 pt-1">
            {blessingsList.map((person, index) => (
              <p
                key={index}
                className="font-cormorant text-sm sm:text-base text-[#382b17] leading-tight font-medium"
              >
                {person}
              </p>
            ))}
          </div>
        </div>

        {/* ================= READY TO WELCOME YOU ================= */}
        <div className="relative p-5 rounded-2xl bg-gradient-to-b from-white via-[#faf6ee] to-[#f5ecdd] border border-[#c5a059]/40 shadow-md text-center">
          <CornerFlourish position="bottom-left" size={32} />
          <CornerFlourish position="bottom-right" size={32} />

          <div className="flex items-center justify-center gap-1.5 mb-1 text-[#8c6b2b]">
            <Heart className="w-3.5 h-3.5 fill-[#8c6b2b]/20" />
            <span className="font-cinzel text-[10px] tracking-[0.26em] uppercase font-bold">
              Awaiting Your Grace
            </span>
          </div>

          <h3 className="font-cormorant font-bold text-2xl sm:text-3xl text-gold-foil">
            Ready to Welcome You
          </h3>

          <GoldDivider className="my-3 opacity-60" />

          <div className="space-y-2 pt-1">
            {welcomingList.map((person, index) => (
              <p
                key={index}
                className="font-cormorant text-sm sm:text-base text-[#382b17] leading-tight font-medium"
              >
                {person}
              </p>
            ))}
          </div>
        </div>

        {/* ================= CONTACT & DIRECT ACTIONS ================= */}
        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[#271f14] via-[#1d170f] to-[#14100b] border-2 border-[#c5a059] shadow-xl text-center text-[#fcf8ef]">
          <span className="font-cinzel text-[10px] tracking-[0.28em] text-[#d4af37] uppercase font-bold block mb-1">
            Cordially Invites
          </span>

          <h4 className="font-cormorant italic text-xl text-gold-foil">
            For any queries, please contact...
          </h4>

          <p className="font-cinzel text-base text-[#fbf5b7] font-bold tracking-wider mt-1.5">
            Srishti Selot
          </p>

          <p className="font-mono text-xs text-[#dcd1bb] tracking-widest mt-1">
            +91 7974698059 &nbsp;·&nbsp; +91 8319746160
          </p>

          {/* Action buttons: Call and WhatsApp */}
          <div className="mt-4 pt-3 border-t border-[#c5a059]/30 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+917974698059"
                className="min-h-[44px] px-3 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#241906] font-cinzel text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 7974698059</span>
              </a>

              <a
                href="tel:+918319746160"
                className="min-h-[44px] px-3 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#241906] font-cinzel text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 8319746160</span>
              </a>
            </div>

            <a
              href="https://wa.me/917974698059?text=Hello%20Srishti,%20connecting%20regarding%20the%20wedding%20celebrations%20of%20Samarthya%20%26%20Nikita!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Srishti</span>
            </a>
          </div>

          <p className="font-cormorant italic text-xs text-[#a8977c] mt-3">
            Please feel free to connect for venue directions, stay assistance &amp; queries
          </p>
        </div>
      </div>
    </section>
  );
};
