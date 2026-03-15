"use client";

import { useReducer } from "react";
import Link from "next/link";
import Card from "./Card";
import { VENUES } from "@/data/venues";

function createInitialRatings(): Map<string, number> {
  const m = new Map<string, number>();
  VENUES.forEach((v) => m.set(v.name, 0));
  return m;
}

type State = {
  cardRatings: Map<string, number>;
  listRatings: Map<string, number>;
};

type Action =
  | { type: "SET_RATING"; venue: string; value: number }
  | { type: "REMOVE_FROM_LIST"; venue: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_RATING": {
      const nextCard = new Map(state.cardRatings);
      const nextList = new Map(state.listRatings);
      nextCard.set(action.venue, action.value);
      nextList.set(action.venue, action.value);
      return { cardRatings: nextCard, listRatings: nextList };
    }
    case "REMOVE_FROM_LIST": {
      const nextList = new Map(state.listRatings);
      nextList.delete(action.venue);
      return { ...state, listRatings: nextList };
    }
    default: {
      const _: never = action;
      return state;
    }
  }
}

const initialState: State = {
  cardRatings: createInitialRatings(),
  listRatings: createInitialRatings(),
};

export default function CardPanel() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRatingChange = (venue: string) => (value: number | null) => {
    dispatch({ type: "SET_RATING", venue, value: value ?? 0 });
  };

  const handleRemoveFromList = (venue: string) => () => {
    dispatch({ type: "REMOVE_FROM_LIST", venue });
  };

  return (
    <>
      <section className="flex flex-wrap gap-6 justify-center p-8">
        {VENUES.map((venue) => (
          <Link key={venue.vid} href={`/venue/${venue.vid}`}>
            <Card
              venueName={venue.name}
              imgSrc={venue.imgSrc}
              rating={state.cardRatings.get(venue.name) ?? 0}
              onRatingChange={handleRatingChange(venue.name)}
            />
          </Link>
        ))}
      </section>
      <div className="px-8 pb-8">
        <ul className="list-none space-y-2">
          {Array.from(state.listRatings.entries()).map(([venue, rating]) => (
            <li key={venue}>
              <button
                type="button"
                onClick={handleRemoveFromList(venue)}
                className="text-left w-full px-4 py-2 rounded hover:bg-neutral-100"
                data-testid={venue}
              >
                {venue} Rating : {rating}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
