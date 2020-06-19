type Ticket = [string, string];

function findTripRoute(tickets: Ticket[]): string[] {
  if (!tickets.length) {
    return [];
  }

  if (tickets.length === 1) {
    const ticket = tickets[0];
    return ticket[0] === ticket[1] ? [ticket[0]] : ticket;
  }

  const route = new Set<string>();

  const ticketsMap = new Map<string, string>();

  const destinations = new Set<string>();

  tickets.forEach(([from, to]) => {
    if (ticketsMap.has(from)) throw "Unable to find a route";

    if (from !== to) {
      ticketsMap.set(from, to);
      destinations.add(to);
    }
  });

  const departureCountry: string = (() => {
    for (const ticket of ticketsMap) {
      const [from, to] = ticket;
      if (!destinations.has(from)) {
        return from;
      }
    }
    throw "This is a round trip. Unable to find departure country.";
  })();

  let next = departureCountry;

  for (let i = 0; i < destinations.size + 1; i++) {
    if (!next) {
      break;
    }

    route.add(next);

    next = ticketsMap.get(next);
  }

  if (route.size !== destinations.size + 1) {
    throw "Unable to find a route.";
  }

  const result = [...route];

  if (route.has(next)) {
    result.push(next);
  }

  return result;
}

const check = function (input, expected) {
  let actual;
  try {
    actual = findTripRoute(input);
  } catch (e) {
    actual = e.toString();
  }
  if (
    actual.toString().replace(/\s/g, "") ===
    expected.toString().replace(/\s/g, "")
  ) {
    console.log(expected + ": passed");
  } else {
    console.log(expected + ": failed. output: " + actual.toString());
  }
};

check([["JPN", "PHL"], ["BRA", "UAE"], ["USA", "BRA"], ["UAE", "JPN"]], 'USA, BRA, UAE, JPN, PHL');
check([["JPN", "PHL"], ["BRA", "UAE"], ["USA", "BRA"], ["UAE", "JPN"], ["PHL", "USA"]], 'This is a round trip. Unable to find departure country.');
check([['A', 'B'], ['X', 'Z']], 'Unable to find a route.');
check([['A', 'A']], 'A');
check([['A', 'B'], ['B', 'B'], ['B', 'C']], 'A, B, C');
check([['A', 'B'], ['B', 'C'], ['C', 'B']], 'A, B, C, B');

check([["A", "B"],["B", "C"],["C", "B"],["C", "D"],], "Unable to find a route");