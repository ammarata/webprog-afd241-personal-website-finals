import { useState, useEffect } from 'react';
import './App.css';

const fetchEntries = async () => {
  return [
  ];
};

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEntries = async () => {
      const initialEntries = await fetchEntries();
      setEntries(initialEntries);
      setLoading(false);
    };

    getEntries();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      const newEntry = {
        id: entries.length + 1,
        name,
        comment,
        date: new Date().toLocaleString(),
      };
      setEntries([newEntry, ...entries]);
      setName('');
      setComment('');
    }
  };

  return (
    <div className="container">
      <header className="guestbook-header">
        <h1>Guestbook</h1>
        <p>Leave a comment and sign the guestbook!</p>
      </header>

      <main>
        <section className="section-card">
          <h2 className="section-title">Sign the Guestbook</h2>
          <form id="guestbook-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="guestbook-name">Name</label>
              <input
                type="text"
                id="guestbook-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="guestbook-comment">Comment</label>
              <textarea
                id="guestbook-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your comment..."
                required
              ></textarea>
            </div>
            <button type="submit">Sign Guestbook</button>
          </form>
        </section>

        <section className="section-card">
          <h2 className="section-title">Entries</h2>
          <div id="guestbook-entries-list">
            {loading ? (
              <p>Loading entries...</p>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className="guestbook-entry">
                  <p className="entry-comment">"{entry.comment}"</p>
                  <div className="entry-footer">
                    <p className="entry-name">
                      <strong>- {entry.name}</strong>
                    </p>
                    <p className="entry-date">{entry.date}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;