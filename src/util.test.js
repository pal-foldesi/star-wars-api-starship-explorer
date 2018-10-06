import mockShips from './mocks/mockShips';
import mapShip from './util';

describe('mapShip(ship)', () => {
  it('correctly maps ships', () => {
    const mappedShips = mockShips['results'].map(mapShip);
    const [first, second, third] = mappedShips;

    expect(first).toEqual({
      "name": "Executor",
      "manufacturer": "Kuat Drive Yards, Fondor Shipyards",
      "cost_in_credits": "1143350000",
      "starship_class": "Star dreadnought",
    });

    expect(second).toEqual({
      "name": "Sentinel-class landing craft",
      "manufacturer": "Sienar Fleet Systems, Cyngus Spaceworks",
      "cost_in_credits": "240000",
      "starship_class": "landing craft",
    });

    expect(third).toEqual({
      "name": "Death Star",
      "manufacturer": "Imperial Department of Military Research, Sienar Fleet Systems",
      "cost_in_credits": "1000000000000",
      "starship_class": "Deep Space Mobile Battlestation",
    });
  });
});