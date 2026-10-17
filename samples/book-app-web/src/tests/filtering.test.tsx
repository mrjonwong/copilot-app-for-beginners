import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App, { filterBooks, type BookFiltersState } from "../App";
import { books } from "../data/books";

const defaultFilters: BookFiltersState = {
  searchTerm: "",
  selectedGenre: "all",
  readingStatus: "all"
};

describe("filterBooks", () => {
  it("matches title and author searches without depending on letter case", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      searchTerm: "hobbit"
    });

    expect(results.map((book) => book.title)).toEqual(["The Hobbit"]);
  });

  it("filters by genre and reading status together", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      selectedGenre: "Fantasy",
      readingStatus: "unread"
    });

    expect(results.map((book) => book.title)).toEqual(["The Night Circus"]);
  });

  it("shows guidance for changing the search term, genre, or reading status when there are no matches", () => {
    render(<App />);

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "zzzz-no-match" }
    });

    expect(
      screen.getByText("Try a different search term, genre, or reading status.")
    ).toBeTruthy();
  });
});
