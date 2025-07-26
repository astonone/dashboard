import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(weekday);
dayjs.extend(isoWeek);

export default function CalendarWidget() {
  const today = dayjs();
  const startOfMonth = today.startOf('month');
  const endOfMonth = today.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const days: dayjs.Dayjs[] = [];
  let current = startDate;

  while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
    days.push(current);
    current = current.add(1, 'day');
  }

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-md rounded-lg p-4 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2 text-center drop-shadow">{today.format('MMMM YYYY')}</h2>

      <div className="grid grid-cols-7 text-center text-sm font-medium mb-1">
        {weekDays.map((d) => (
          <div key={d} className="text-white/80">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {days.map((date, idx) => {
          const isToday = date.isSame(today, 'day');
          const isCurrentMonth = date.month() === today.month();

          return (
            <div
              key={idx}
              className={`flex items-center justify-center h-8 rounded ${
                isToday ? 'bg-white text-black font-bold' : isCurrentMonth ? 'text-white' : 'text-white/40'
              }`}
            >
              {date.date()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
