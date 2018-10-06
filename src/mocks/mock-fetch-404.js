import MockResponse from './MockResponse';

export default function fetch(url) {
  return new Promise((resolve) => {
    process.nextTick(
      () => resolve(new MockResponse(undefined, 404, 'Not found'))
    );
  });
}