import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Import the Supabase client
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  // No longer need the old fetchEntries function

  useEffect(() => {
    // Define an async function to get entries from Supabase
    const getEntries = async () => {
      try {
        setLoading(true);
        // Select all entries from the 'guestbook_entries' table, ordered by creation date
        const { data, error } = await supabase
          .from('guestbook_entries')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          // The date from Supabase is a string, so we'll format it
          const formattedData = data.map(entry => ({
              ...entry,
              date: new Date(entry.created_at).toLocaleString()
          }));
          setEntries(formattedData);
        }
      } catch (error) {
        console.error('Error fetching entries:', error.message);
      } finally {
        setLoading(false);
      }
    };

    getEntries();
  }, []); // The empty dependency array ensures this runs only once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      try {
        // Insert a new row into the 'guestbook_entries' table
        const { data, error } = await supabase
          .from('guestbook_entries')
          .insert([{ name, comment }])
          .select(); // .select() returns the inserted data

        if (error) {
          throw error;
        }
        
        if (data) {
            // Add the new entry to the top of the list in the UI
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