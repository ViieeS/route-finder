type Ticket = [string, string];

function findTripRoute(tickets: Ticket[]): string[] {
  
  const route: string[] = [];

  const ticketsMap = new Map<string, string>();

  const destinations = new Set<string>();

  tickets.forEach(([from, to]) => {
    ticketsMap.set(from, to);
    destinations.add(to);
  });

  const departureCountry: string = (() => {
     for(const ticket of ticketsMap) {
        const [from] = ticket;
        if(!destinations.has(from)){
          return  from;
        }
    }
    throw 'This is a round trip. Unable to find departure country.';
  })();

  let next = departureCountry;

  while (next) {
    route.push(next);
    next = ticketsMap.get(next);
  }

  return route;
}

const route = findTripRoute([["JPN", "PHL"], ["BRA", "UAE"], ["USA", "BRA"], ["UAE", "JPN"]]);

console.log(route.join(', '));