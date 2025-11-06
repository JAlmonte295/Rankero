import { Link } from "react-router-dom";


const RankList = (props) => {
    return (
        <main>
            {props.ranks.map((rank) => (
                <Link key={rank._id} to={`/ranks/${rank._id}`}>
                    <article>
                        <header>
                            <h2>{rank.category}</h2>
                            <h2>{rank.title}</h2>
                            <h2>{rank.description}</h2>
                            <p>
                                {'by ' + rank.author.username}
                            </p>
                        </header>
                        <ul>
                            {rank.list.map(item => (
                                <li key={item._id}>{item.itemName}</li>
                            ))}
                        </ul>
                    </article>
                    </Link>
            ))}
        </main>
    )
    };
  
  export default RankList;