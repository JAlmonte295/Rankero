import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = ({ ranks }) => {
  // Let's take the top 3 ranks to showcase
  const showcasedRanks = ranks ? ranks.slice(0, 3) : [];

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to Rankero!</h1>
        <p>Create, share, and discover ranked lists on any topic you can imagine.</p>
        <div className={styles.ctaButtons}>
          <Link to="/sign-up" className={styles.signUp}>Get Started</Link>
          <Link to="/sign-in" className={styles.signIn}>Sign In</Link>
        </div>
      </section>

      {showcasedRanks.length > 0 && (
        <section className={styles.showcase}>
          <h2>See What's Trending</h2>
          <div className={styles.ranksContainer}>
            {showcasedRanks.map((rank) => (
              <Link to={`/ranks/${rank._id}`} key={rank._id} className={styles.rankCard}>
                <h3>{rank.title}</h3>
                <p>Category: {rank.category}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Landing;
