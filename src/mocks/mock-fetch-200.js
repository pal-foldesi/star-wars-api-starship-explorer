import MockResponse from './MockResponse';
import ships from './mockShips';

export default function fetch(url) {
  return new Promise((resolve) => {
    process.nextTick(
      () => resolve(new MockResponse(ships, 200))
      );
  });
}