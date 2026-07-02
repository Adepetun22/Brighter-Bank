type Listener = (count: number) => void;

let count = 0;
const listeners = new Set<Listener>();

function notify() {
  for (const l of listeners) l(count);
}

export const loadingService = {
  start() {
    count += 1;
    notify();
  },
  stop() {
    count = Math.max(0, count - 1);
    notify();
  },
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  getCount() {
    return count;
  },
};
