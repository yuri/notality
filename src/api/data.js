import fetch from 'isomorphic-fetch';
import Rx from 'rx';

const ENDPOINT = 'http://localhost:3000/api/notes';

// Fetching is simple.
export function fetchData() {
  return fetch(ENDPOINT)
    .then(response => response.json());
}

// For saving we need to debounce, to avoid sending several requests at once.
const updateSubject = new Rx.Subject();

export function saveData(data) {
  updateSubject.onNext(data);
}

function actuallySave(data) {
  return fetch(ENDPOINT, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

updateSubject.debounce(2000).subscribe(actuallySave);
