export default class MockResponse {
  constructor(ships, status, statusText) {
    this.results = ships;
    this.status = status;
    this.statusText = statusText;
  }

  json() {
    return new Promise(resolve => resolve(this.results));
  }
}