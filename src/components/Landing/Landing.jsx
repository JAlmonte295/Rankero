import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

// Helper function to generate a consistent color from a string
const getCategoryColor = (category) => {
  if (!category) return '#555';
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 50%, 45%)`;
};

const Landing = ({ ranks }) => {
  // Showcase top 3 ranks by score and creation date
  const trendingRanks = ranks ? [...ranks].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 3) : [];
  const newestRanks = ranks ? [...ranks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3) : [];

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to Rankero!</h1>
        <p>Create, share, and discover ranked lists on any topic you can imagine.</p>
        <div className={styles.ctaButtons}>
          <Link to="/sign-up" className={`${styles.btn} ${styles.btnPrimary}`}>Get Started</Link>
          <Link to="/sign-in" className={`${styles.btn} ${styles.btnSecondary}`}>Sign In</Link>
        </div>
      </section>

      {trendingRanks.length > 0 && (
        <section className={styles.showcase}>
          <h2>🔥 Trending Ranks</h2>
          <div className={styles.ranksContainer}>
            {trendingRanks.map((rank) => (
              <Link to={`/ranks/${rank._id}`} key={rank._id} className={styles.rankCard}>
                <span className={styles.rankCategory} style={{ backgroundColor: getCategoryColor(rank.category) }}>{rank.category}</span>
                <h3 className={styles.rankTitle}>{rank.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {newestRanks.length > 0 && (
        <section className={styles.showcase}>
          <h2>✨ Newest Ranks</h2>
          <div className={styles.ranksContainer}>
            {newestRanks.map((rank) => (
              <Link to={`/ranks/${rank._id}`} key={rank._id} className={styles.rankCard}>
                <span className={styles.rankCategory} style={{ backgroundColor: getCategoryColor(rank.category) }}>{rank.category}</span>
                <h3 className={styles.rankTitle}>{rank.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Landing;
