import { describe, expect, it } from "vitest";
import { filterBooks, type BookFiltersState } from "../App";
import { books } from "../data/books";

const defaultFilters: BookFiltersState = {
  searchTerm: "",
  selectedGenre: "all",
  readingStatus: "all"
};

describe("filterBooks", () => {
  it("matches title and author searches without depending on letter case", () => {
    const lowercaseResults = filterBooks(books, {
      ...defaultFilters,
      searchTerm: "hobbit"
    });
    const uppercaseResults = filterBooks(books, {
      ...defaultFilters,
      searchTerm: "HOBBIT"
    });
    const authorResults = filterBooks(books, {
      ...defaultFilters,
      searchTerm: "TOLKIEN"
    });

    expect(lowercaseResults.map((book) => book.title)).toEqual(["The Hobbit"]);
    expect(uppercaseResults).toEqual(lowercaseResults);
    expect(authorResults.map((book) => book.title)).toEqual(["The Hobbit"]);
  });

  it("filters by genre and reading status together", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      selectedGenre: "Fantasy",
      readingStatus: "unread"
    });

    expect(results.map((book) => book.title)).toEqual(["The Night Circus"]);
  });
});
