/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── shared design tokens ─── */
const BTN_PRIMARY =
  'w-full py-4.5 px-6 rounded-2xl bg-[#f25c88] hover:bg-[#e04a76] active:scale-[0.98] text-white font-bold text-base tracking-wide shadow-[0_8px_24px_rgba(242,92,136,0.2)] hover:shadow-[0_12px_28px_rgba(242,92,136,0.3)] transition-all duration-300 cursor-pointer select-none';

/* ─── Elegant Minimal Progress Line ─── */
function StepBar({ step }) {
  return (
    <div className="w-full py-6 select-none flex flex-col gap-2">
      <div className="flex justify-between items-center text-xs font-semibold text-gray-400 tracking-wider uppercase">
        <span>Planning Progress</span>
        <span className="text-pink-500 font-bold">Step {step} of 4</span>
      </div>
      <div className="w-full h-1 bg-pink-100/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#f25c88] rounded-full"
          initial={{ width: '25%' }}
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/* ─── Inline toast-style validation message ─── */
function Toast({ msg, onDismiss }) {
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(onDismiss, 2800);
    return () => clearTimeout(t);
  }, [msg, onDismiss]);

  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.95 }}
          className="flex items-center gap-3 bg-pink-50/80 border border-pink-100 text-pink-700 text-xs font-semibold rounded-xl px-4 py-3.5 w-full shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 animate-ping" />
          <span className="leading-relaxed">{msg}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Polaroid sticker for summary (Mature version) ─── */
function Polaroid() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: 1, rotate: 12 }}
      transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.35 }}
      className="absolute -top-12 -right-2 w-[76px] h-[92px] bg-white shadow-[0_6px_22px_rgba(0,0,0,0.08)] p-2 rounded-md z-20 select-none border border-gray-100"
    >
      <div className="w-full h-[62px] rounded bg-rose-50/50 border border-rose-100/50 flex items-center justify-center">
        <span className="text-pink-400 text-lg">♥</span>
      </div>
      <div className="flex justify-center pt-1.5">
        <div className="w-8 h-0.5 bg-gray-200 rounded" />
      </div>
    </motion.div>
  );
}

/* ─── PAGE-LEVEL WRAPPER ─── */
function Page({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`w-full flex flex-col items-center gap-8 md:gap-10 px-1 sm:px-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── White card container ─── */
function Card({ children, className = '', dotted = false }) {
  return (
    <div
      className={`w-full bg-white rounded-[32px] shadow-[0_12px_45px_rgba(242,92,136,0.05)] p-6 sm:p-10 ${
        dotted ? 'border-[3px] border-dashed border-pink-100' : 'border border-pink-50'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Beautiful Floating Hearts Background ─── */
function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate a beautiful, randomized array of floating hearts
    const heartItems = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // horizontal start position (0 - 100% of viewport width)
      size: Math.random() * 24 + 12, // size between 12px and 36px
      delay: Math.random() * 8, // staggered entrance
      duration: Math.random() * 6 + 8, // float speed (8s to 14s)
      opacity: Math.random() * 0.3 + 0.1, // opacity (0.1 to 0.4)
    }));
    setHearts(heartItems);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            opacity: 0,
            x: `${heart.x}vw`,
            y: '105vh',
            scale: 0.6,
            rotate: Math.random() * 30 - 15,
          }}
          animate={{
            opacity: [0, heart.opacity, heart.opacity, 0],
            y: '-10vh',
            scale: [0.6, 1.1, 0.9, 0.7],
            x: [
              `${heart.x}vw`,
              `${heart.x + (Math.random() * 8 - 4)}vw`,
              `${heart.x + (Math.random() * 16 - 8)}vw`,
            ],
            rotate: [Math.random() * 30 - 15, Math.random() * 60 - 30, Math.random() * 90 - 45],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute text-rose-300"
          style={{ fontSize: heart.size }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function DatePlanner({ onBack }) {
  const [scene, setScene] = useState('invite'); // invite | success | when | food | done
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [food1, setFood1] = useState('');
  const [food2, setFood2] = useState('');
  const [food3, setFood3] = useState('');
  const [noPos, setNoPos] = useState({ x: 0, y: 0, out: false });
  const [toast, setToast] = useState('');

  /* ── time slot options ── */
  const TIME_OPTS = [
    { value: '5:00 PM', label: '5:00 PM', sub: 'Early dinner at a quiet place' },
    { value: '6:00 PM', label: '6:00 PM', sub: 'Perfect golden hour timing' },
    { value: '7:00 PM', label: '7:00 PM', sub: 'Prime time for good conversations' },
    { value: '8:00 PM', label: '8:00 PM', sub: 'Late dinner & cozy atmosphere' },
    { value: '9:00 PM', label: '9:00 PM', sub: 'Late night dessert or coffee' },
  ];

  /* ── elusive No button ── */
  function runAway() {
    const bw = 110, bh = 52;
    setNoPos({
      x: Math.random() * (window.innerWidth  - bw - 48) + 24,
      y: Math.random() * (window.innerHeight - bh - 48) + 24,
      out: true,
    });
  }

  /* ── date shortcut handler ── */
  const selectShortcutDate = (type) => {
    const today = new Date();
    if (type === 'today') {
      setDate(today.toISOString().split('T')[0]);
    } else if (type === 'tomorrow') {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      setDate(tomorrow.toISOString().split('T')[0]);
    } else if (type === 'weekend') {
      const result = new Date(today);
      const dayOfWeek = today.getDay();
      const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
      const addDays = daysUntilSaturday === 0 ? 7 : daysUntilSaturday;
      result.setDate(today.getDate() + addDays);
      setDate(result.toISOString().split('T')[0]);
    }
  };

  /* ── comfort foods as array helper ── */
  const comfortFoods = [food1, food2, food3].filter(Boolean);

  /* ── date formatter ── */
  function formatDate(str) {
    if (!str) return '—';
    const d = new Date(str + 'T12:00:00');
    const day = d.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31 ? 'st' :
      day === 2 || day === 22               ? 'nd' :
      day === 3 || day === 23               ? 'rd' : 'th';
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
             .replace(`${day}`, `${day}${suffix}`);
  }

  const STEP_FOR_SCENE = { success: 1, when: 2, food: 3, done: 4 };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto py-8 md:py-16"
      style={{
        background: 'linear-gradient(180deg, #fff5f8 0%, #ffffff 100%)',
        fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
      }}
    >
      <FloatingHearts />

      {/* Back to Portfolio — top-left, only on invite */}
      <AnimatePresence>
        {scene === 'invite' && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onClick={onBack}
            className="fixed top-5 left-5 z-50 flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur border border-pink-100/50 text-xs font-semibold text-pink-500 hover:bg-pink-50 shadow-sm transition-all duration-200 cursor-pointer"
          >
            ← Portfolio
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main outer card positioning container */}
      <div className="relative z-10 w-full max-w-md px-6 sm:px-8 flex flex-col items-center justify-center min-h-[85vh] md:min-h-[70vh]">
        
        {/* Step bar — appears on steps 1-4 */}
        {scene !== 'invite' && (
          <div className="w-full max-w-sm mb-4">
            <StepBar step={STEP_FOR_SCENE[scene] ?? 1} />
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ══════════ INVITE ══════════ */}
          {scene === 'invite' && (
            <Page key="invite" className="justify-center py-6 md:py-8">
              {/* Envelope image */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-48 h-48 sm:w-52 sm:h-52 select-none pointer-events-none drop-shadow-lg"
              >
                <img src="/cute-heart-envelope.png" alt="Invitation envelope" className="w-full h-full object-contain" />
              </motion.div>

              {/* Headline with mobile scaling and graceful word wrap */}
              <div className="text-center space-y-3 px-2 sm:px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#e83e70] leading-tight tracking-tight break-words">
                  Shinta, will you go on a date with me?
                </h1>
              </div>

              {/* YES / NO buttons */}
              <div className="flex flex-col items-center gap-4 w-full mt-4 max-w-xs sm:max-w-sm">
                {/* YES */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setScene('success')}
                  className="w-full py-4.5 rounded-2xl bg-[#f25c88] hover:bg-[#e04a76] active:scale-[0.97] text-white font-bold text-lg shadow-[0_8px_28px_rgba(242,92,136,0.30)] transition-all duration-200 cursor-pointer select-none"
                >
                  Yes
                </motion.button>

                {/* NO — elusive */}
                <button
                  onMouseEnter={runAway}
                  onTouchStart={runAway}
                  onClick={runAway}
                  style={
                    noPos.out
                      ? { position: 'fixed', left: noPos.x, top: noPos.y, zIndex: 999, transition: 'left .12s, top .12s' }
                      : {}
                  }
                  className="w-full py-4.5 rounded-2xl border-2 border-pink-200 bg-pink-50/50 text-pink-600 font-bold text-lg hover:bg-pink-100/50 transition-all duration-200 cursor-pointer select-none shadow-sm"
                >
                  No
                </button>
              </div>
            </Page>
          )}

          {/* ══════════ SUCCESS ══════════ */}
          {scene === 'success' && (
            <Page key="success" className="text-center py-8">
              {/* Elegant Heart Vector or minimal representation */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-pink-500 text-7xl select-none py-6"
              >
                ♥
              </motion.div>

              <div className="space-y-4 my-2 px-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#e83e70] tracking-tight break-words">
                  I'm so glad you said yes.
                </h1>
                <p className="text-sm sm:text-base font-semibold text-pink-500">
                  I can't wait to plan this with you.
                </p>
              </div>

              <div className="w-full max-w-xs sm:max-w-sm mt-8">
                <button
                  onClick={() => setScene('when')}
                  className={BTN_PRIMARY}
                >
                  Let's plan it →
                </button>
              </div>
            </Page>
          )}

          {/* ══════════ WHEN ══════════ */}
          {scene === 'when' && (
            <Page key="when" className="w-full max-w-sm">
              <div className="text-center space-y-2">
                <h1 className="text-2.5xl sm:text-3xl font-black text-[#e83e70] leading-tight break-words px-2">
                  When are you free?
                </h1>
              </div>

              <Card className="space-y-6">
                {/* Date picker */}
                <div className="space-y-3">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Pick a Day
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-pink-100 focus:border-[#f25c88] focus:outline-none bg-pink-50/20 text-pink-900 font-semibold text-sm transition-colors duration-200 cursor-pointer"
                  />
                  
                  {/* Date Shortcut Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1.5 justify-center sm:justify-start">
                    {[
                      { type: 'today', label: 'Today' },
                      { type: 'tomorrow', label: 'Tomorrow' },
                      { type: 'weekend', label: 'This Weekend' }
                    ].map((btn) => (
                      <button
                        key={btn.type}
                        type="button"
                        onClick={() => selectShortcutDate(btn.type)}
                        className="px-3.5 py-2 text-xs font-bold rounded-lg border-2 border-pink-100 hover:border-pink-300 hover:bg-pink-50 text-pink-600 bg-white transition-all duration-200 cursor-pointer"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom time-slot picker */}
                <div className="space-y-3">
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Select a Time
                  </label>
                  <div className="flex flex-col gap-2.5">
                    {TIME_OPTS.map((opt) => {
                      const active = timeSlot === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setTimeSlot(opt.value)}
                          className={`w-full flex items-center justify-between px-4.5 py-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${
                            active
                              ? 'border-[#f25c88] bg-pink-50/50 shadow-sm scale-[1.01]'
                              : 'border-pink-50 bg-white hover:border-pink-200 hover:bg-pink-50/20'
                          }`}
                        >
                          <div>
                            <span className={`block text-sm font-bold ${active ? 'text-[#e83e70]' : 'text-pink-900'}`}>
                              {opt.label}
                            </span>
                            <span className={`block text-xs mt-0.5 ${active ? 'text-pink-500 font-medium' : 'text-gray-400'} leading-tight pr-2`}>
                              {opt.sub}
                            </span>
                          </div>
                          {active && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-pink-500 text-sm font-bold shrink-0"
                            >
                              ✓
                            </motion.span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Validation toast */}
                <Toast msg={toast} onDismiss={() => setToast('')} />

                {/* CTA */}
                <button
                  onClick={() => {
                    if (!date)     return setToast('Please pick a date first.');
                    if (!timeSlot) return setToast('Please choose a time slot.');
                    setScene('food');
                  }}
                  className={BTN_PRIMARY}
                >
                  Next step →
                </button>
              </Card>
            </Page>
          )}

          {/* ══════════ FOOD ══════════ */}
          {scene === 'food' && (
            <Page key="food" className="w-full max-w-sm">
              <div className="text-center space-y-2 px-2">
                <h1 className="text-2.5xl sm:text-3xl font-black text-[#e83e70] leading-tight break-words">
                  What's your comfort food?
                </h1>
                <p className="text-xs font-semibold text-gray-400 tracking-wide uppercase">
                  Tell me your top 3 so I know where to take you
                </p>
              </div>

              <Card className="space-y-6">
                {[
                  { val: food1, set: setFood1, placeholder: 'e.g. Sushi, Pasta, Ramen...', num: 1 },
                  { val: food2, set: setFood2, placeholder: 'e.g. Steak, Tacos, Pizza...', num: 2 },
                  { val: food3, set: setFood3, placeholder: 'e.g. Ice Cream, Croissants...', num: 3 },
                ].map((field) => (
                  <div key={field.num} className="space-y-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      Choice #{field.num}
                    </label>
                    <input
                      type="text"
                      value={field.val}
                      onChange={(e) => field.set(e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-4 rounded-xl border-2 border-pink-100 focus:border-[#f25c88] focus:outline-none bg-pink-50/20 text-pink-900 font-semibold text-sm transition-colors duration-200 placeholder:text-pink-300"
                    />
                  </div>
                ))}

                {/* Validation toast */}
                <Toast msg={toast} onDismiss={() => setToast('')} />

                <button
                  onClick={() => {
                    if (!food1) return setToast('Please share at least one of your comfort foods.');
                    setScene('done');
                  }}
                  className={BTN_PRIMARY}
                >
                  Finish →
                </button>
              </Card>
            </Page>
          )}

          {/* ══════════ DONE ══════════ */}
          {scene === 'done' && (
            <Page key="done" className="w-full max-w-sm">
              <Card dotted className="relative space-y-6">
                {/* Polaroid sticker */}
                <Polaroid />

                {/* Header copy */}
                <div className="space-y-3 pr-14">
                  <h1 className="text-3xl sm:text-4xl font-black text-[#e83e70] leading-tight break-words">
                    It's a date!
                  </h1>
                  <p className="text-sm font-bold text-pink-900 leading-relaxed break-words">
                    See you at {timeSlot}. I'll make sure everything is ready.
                  </p>
                  <p className="text-xs text-gray-500 font-medium italic leading-relaxed pt-2 border-t border-pink-50">
                    p.s. anyone could just send a normal text, but this website was made specifically and just for you, Shinta.
                  </p>
                </div>

                {/* Summary rows */}
                <div className="border-t border-pink-100 pt-5 space-y-5">
                  <div className="flex gap-4.5 items-start">
                    <span className="text-pink-500 text-lg leading-none shrink-0 pt-0.5">📅</span>
                    <div>
                      <span className="block text-[10px] font-extrabold text-gray-300 uppercase tracking-widest">WHEN</span>
                      <span className="block text-sm font-bold text-pink-900 leading-tight">{formatDate(date)}</span>
                      <span className="block text-xs font-semibold text-pink-400 mt-0.5">at {timeSlot}</span>
                    </div>
                  </div>

                  <div className="flex gap-4.5 items-start">
                    <span className="text-pink-500 text-lg leading-none shrink-0 pt-0.5">🍲</span>
                    <div>
                      <span className="block text-[10px] font-extrabold text-gray-300 uppercase tracking-widest">COMFORT FOOD</span>
                      <span className="block text-sm font-bold text-pink-900 leading-snug break-all">{comfortFoods.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Page>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
