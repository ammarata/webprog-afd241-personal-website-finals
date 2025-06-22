import React, { useState, useEffect } from 'react';
import './App.css'; // We will create this file next

function App() {
    const [entries, setEntries] = useState([]);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    // Fetch guestbook entries
    const fetchEntries = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/guestbook');
            const data = await response.json();
            setEntries(data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    // Fetch entries on component mount
    useEffect(() => {
        fetchEntries();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/guestbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, comment }),
            });

            if (response.ok) {
                setName('');
                setComment('');
                fetchEntries(); // Refresh entries after posting
            }
        } catch (error) {
            console.error('Error submitting entry:', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Guestbook</h1>
            </header>
            <main>
                <section className="section-card">
                    <h2 className="section-title">Sign the Guestbook</h2>
                    <form id="guestbook-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            required
                        />
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Your comment on the site..."
                            required
                        ></textarea>
                        <button type="submit">Sign Guestbook</button>
                    </form>
                </section>
                <section className="section-card">
                    <h2 className="section-title">Entries</h2>
                    <div id="guestbook-entries">
                        {entries.length > 0 ? (
                            entries.map((entry) => (
                                <div key={entry.id} className="guestbook-entry">
                                    <p className="entry-name">{entry.name}</p>
                                    <p>{entry.comment}</p>
                                    <p className="entry-date">{entry.date}</p>
                                </div>
                            ))
                        ) : (
                            <p>No entries yet. Be the first to sign!</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;