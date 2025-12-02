import AsyncStorage from '@react-native-async-storage/async-storage';

// Define default shift boundaries (24h). Modify as needed.
export function getShift(date = new Date()) {
  const h = date.getHours();
  // Matutino: 06:00-13:59, Vespertino: 14:00-21:59, Noturno: 22:00-05:59
  if (h >= 6 && h < 14) return 'Matutino';
  if (h >= 14 && h < 22) return 'Vespertino';
  return 'Noturno';
}

export async function addScanEvent(data) {
  try {
    const now = new Date();
    const event = {
      id: `${now.getTime()}-${Math.floor(Math.random() * 10000)}`,
      data,
      timestamp: now.toISOString(),
      shift: getShift(now),
    };

    const raw = await AsyncStorage.getItem('scanEvents');
    const arr = raw ? JSON.parse(raw) : [];
    arr.push(event);
    await AsyncStorage.setItem('scanEvents', JSON.stringify(arr));
    return event;
  } catch (e) {
    console.warn('Erro ao gravar scanEvent:', e);
    throw e;
  }
}

export async function getScanEvents() {
  try {
    const raw = await AsyncStorage.getItem('scanEvents');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Erro ao ler scanEvents:', e);
    return [];
  }
}

// weekStart: Monday of that week, formatted YYYY-MM-DD
function weekStartForDate(d) {
  const date = new Date(d);
  const day = date.getDay(); // 0 Sun ... 1 Mon
  const diffToMonday = ((day + 6) % 7); // 0 if Monday, 6 if Sunday
  const monday = new Date(date);
  monday.setDate(date.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().slice(0, 10);
}

export function aggregateByWeekAndShift(events = []) {
  // Filter events that fall between Monday-Thursday only
  const result = {};
  events.forEach((ev) => {
    const ts = new Date(ev.timestamp);
    const day = ts.getDay();
    // day: 0 Sun,1 Mon,2 Tue,3 Wed,4 Thu,5 Fri,6 Sat
    if (day < 1 || day > 4) return; // skip if not Mon-Thu

    const week = weekStartForDate(ts);
    if (!result[week]) result[week] = { Matutino: 0, Vespertino: 0, Noturno: 0, total: 0 };
    const shift = ev.shift || getShift(ts);
    if (!result[week][shift]) result[week][shift] = 0;
    result[week][shift] += 1;
    result[week].total += 1;
  });

  // return sorted weeks (descending)
  const weeks = Object.keys(result).sort((a, b) => (a < b ? 1 : -1));
  const out = weeks.map((w) => ({ week: w, ...result[w] }));
  return out;
}
