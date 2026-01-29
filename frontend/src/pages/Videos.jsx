import { useState, useEffect } from 'react';
import api from '../utils/api';
import VideoCard from '../components/VideoCard';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    page: 1
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/videos/categories');
      setCategories(response.data.data.categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category !== 'all') params.append('category', filters.category);
      params.append('page', filters.page);
      params.append('limit', 9);

      const response = await api.get(`/videos?${params.toString()}`);
      setVideos(response.data.data.videos);
      setPagination(response.data.data.pagination);
      setError('');
    } catch (err) {
      setError('Failed to fetch videos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });
  };

  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={styles.container}>
      <div className="container">
        <div style={styles.header}>
          <h1 style={styles.title}>VIDEO LIBRARY</h1>
          <p style={styles.subtitle}>Browse our collection of educational content</p>
        </div>

        <div style={styles.filters}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              className="input-field"
              placeholder="Search videos..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              style={styles.searchInput}
            />
            <button type="submit" className="btn btn-secondary" style={styles.searchBtn}>
              SEARCH
            </button>
          </form>

          <div style={styles.categoryFilters}>
            <button
              className={filters.category === 'all' ? 'btn' : 'btn btn-accent'}
              onClick={() => handleCategoryChange('all')}
              style={styles.categoryBtn}
            >
              ALL
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={filters.category === cat ? 'btn' : 'btn btn-accent'}
                onClick={() => handleCategoryChange(cat)}
                style={styles.categoryBtn}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-spinner"></div>
        ) : videos.length === 0 ? (
          <div style={styles.noResults}>
            <h2 style={styles.noResultsTitle}>NO VIDEOS FOUND</h2>
            <p style={styles.noResultsText}>Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-3">
              {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>

            {pagination.pages > 1 && (
              <div style={styles.pagination}>
                <button
                  className="btn btn-accent"
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page === 1}
                  style={styles.paginationBtn}
                >
                  ← PREVIOUS
                </button>
                <span style={styles.pageInfo}>
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  className="btn btn-accent"
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page === pagination.pages}
                  style={styles.paginationBtn}
                >
                  NEXT →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    padding: '40px 0'
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px'
  },
  title: {
    fontSize: '48px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  subtitle: {
    fontSize: '18px',
    color: 'var(--color-text)'
  },
  filters: {
    marginBottom: '40px'
  },
  searchForm: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  searchInput: {
    flex: 1,
    minWidth: '250px'
  },
  searchBtn: {
    margin: 0
  },
  categoryFilters: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  categoryBtn: {
    margin: 0
  },
  noResults: {
    textAlign: 'center',
    padding: '80px 20px',
    backgroundColor: 'var(--color-white)',
    border: 'var(--border)',
    boxShadow: 'var(--shadow)'
  },
  noResultsTitle: {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '12px',
    textTransform: 'uppercase'
  },
  noResultsText: {
    fontSize: '16px',
    color: 'var(--color-text)'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '48px',
    flexWrap: 'wrap'
  },
  paginationBtn: {
    margin: 0
  },
  pageInfo: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text)',
    padding: '12px 24px',
    backgroundColor: 'var(--color-white)',
    border: 'var(--border)',
    boxShadow: 'var(--shadow)'
  }
};

export default Videos;
