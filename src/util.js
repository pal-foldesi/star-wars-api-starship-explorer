/**
  * Maps a ship to its name, manufacturer, cost and starship class.
  * @param ship The ship to be mapped.  
  */
export default function mapShip(ship) {
  const { name, manufacturer, cost_in_credits, starship_class } = ship;
  return Object.assign(
    {
      name,
      manufacturer,
      cost_in_credits,
      starship_class
    },
    {}
  );
}