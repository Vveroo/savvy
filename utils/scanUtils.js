import AsyncStorage from '@react-native-async-storage/async-storage';

export function getShift(date = new Date()) {
  const h = date.getHours();
  if (h >= 8 && h < 12) return 'Matutino';
  if (h >= 13 && h < 18) return 'Vespertino';
  if (h >= 18 && h< 22) 'Noturno';
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

function weekStartForDate(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diffToMonday = ((day + 6) % 7);
  const monday = new Date(date);
  monday.setDate(date.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().slice(0, 10);
}

export function aggregateByWeekAndShift(events = []) {
  const result = {};
  events.forEach((ev) => {
    const ts = new Date(ev.timestamp);
    const day = ts.getDay();
    if (day < 1 || day > 4) return;

    const week = weekStartForDate(ts);
    if (!result[week]) result[week] = { Matutino: 0, Vespertino: 0, Noturno: 0, total: 0 };
    const shift = ev.shift || getShift(ts);
    if (!result[week][shift]) result[week][shift] = 0;
    result[week][shift] += 1;
    result[week].total += 1;
  });

  const weeks = Object.keys(result).sort((a, b) => (a < b ? 1 : -1));
  const out = weeks.map((w) => ({ week: w, ...result[w] }));
  return out;
}
