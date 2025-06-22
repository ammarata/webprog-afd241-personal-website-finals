import { useState, useEffect } from 'react';
// This import is the first potential point of failure. 
// If supabaseClient.js has an error, `supabase` will be invalid.
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEntries = async () => {
      try {
        setLoading(true);

        // This is the second potential point of failure.
        // If `supabase` is invalid, this line will throw the error you see in the console.
        const { data, error } = await supabase
          .from('guestbook_entries')
          .select('*')
          .order('created_at', { ascending: false });

        // The 'error' object from Supabase will contain details if the request fails.
        if (error) {
          throw error;
        }

        if (data) {
          const formattedData = data.map(entry => ({
              ...entry,
              date: new Date(entry.created_at).toLocaleString()
          }));
          setEntries(formattedData);
        }
      } catch (error) {
        // This 'catch' block will log the detailed error to your browser's console.
        console.error('Error fetching entries:', error.message);
      } finally {
        setLoading(false);
      }
    };

    getEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      try {
        const { data, error } = await supabase
          .from('guestbook_entries')
          .insert([{ name, comment }])
          .select();

        if (error) {
          throw error;
        }
        
        if (data) {
            const newEntry = {
                ...data[0],
                date: new Date(data[0].created_at).toLocaleString()
            };
            setEntries([newEntry, ...entries]);
            setName('');
            setComment('');
        }

      } catch (error) {
        console.error('Error signing the guestbook:', error.message);
      }
    }
  };

  // ... (rest of your return/JSX code is the same)
  // The JSX is unlikely to be the problem unless an object it's trying to render is invalid.
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