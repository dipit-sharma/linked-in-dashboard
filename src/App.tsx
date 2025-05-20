import { useMemo, useState } from "react";
import "./App.css";
import FilterBar, { FilterOptions } from "./components/FilterBar";
import PostCard from "./components/PostCard";
import SearchBar from "./components/SearchBar";
import { useFetchPosts } from "./hooks/useFetchPosts";
import { Mock } from "./mockdata";

function App() {
  const { posts, loading, error } = useFetchPosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    showReshared: true,
    showOriginal: true,
    showWithVideo: true,
  });

  const filteredPosts = useMemo(() => {
    posts.sort(
      (a, b) =>
        a.socialActivityCountsInsight.totalReactionCount -
        b.socialActivityCountsInsight.totalReactionCount
    );
    if (searchQuery.trim().length === 0) return posts;
    let filtered = posts;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.author.fullName.toLowerCase().includes(query) ||
          post.author.headline.toLowerCase().includes(query) ||
          post.text.toLowerCase().includes(query) ||
          (post.resharedPost &&
            post.resharedPost.text.toLowerCase().includes(query))
      );
    }

    // Apply type filters
    filtered = filtered.filter((post) => {
      const hasReshared = Boolean(post.resharedPost);
      const hasVideo = hasReshared && Boolean(post.resharedPost?.video);

      // If no filters are selected, show all posts
      if (
        !filters.showReshared &&
        !filters.showOriginal &&
        !filters.showWithVideo
      ) {
        return true;
      }

      // Show post if it matches any of the selected filters
      return (
        (filters.showReshared && hasReshared) ||
        (filters.showOriginal && !hasReshared) ||
        (filters.showWithVideo && hasVideo)
      );
    });

    return filtered;
  }, [searchQuery, filters, posts]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>LinkedIn Posts Dashboard</h1>
        <SearchBar onSearch={setSearchQuery} />
        <FilterBar filters={filters} onFilterChange={setFilters} />
      </header>
      <main className="posts-grid">
        {filteredPosts.map((post: typeof Mock) => (
          <PostCard key={post.urn} post={post} />
        ))}
      </main>
      {error && (
        <div className="no-results">
          <p>{String(error)}</p>
        </div>
      )}
      {loading && (
        <div className="no-results">
          <p>Loading...</p>
        </div>
      )}
      {filteredPosts.length === 0 && (
        <div className="no-results">
          <p>No posts found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default App;
