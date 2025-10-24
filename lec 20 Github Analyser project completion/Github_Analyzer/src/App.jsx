import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [repoName, setRepoName] = useState("");
  const [repoDescription, setRepoDescription] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Dark mode toggle
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username) return setError("Please enter a GitHub username.");
    setLoading(true);
    setError(null);
    setProfile(null);
    setRepos([]);

    try {
      const headers = token ? { Authorization: `token ${token}` } : {};
      const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
      if (!userRes.ok) throw new Error("User not found");
      const userData = await userRes.json();
      setProfile(userData);

      const repoRes = await fetch(`https://api.github.com/users/${username}/repos`, { headers });
      const repoData = await repoRes.json();
      setRepos(repoData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 
  const handleCreateRepo = async (e) => {
  e.preventDefault();

  if (!token) return setError("⚠️ Please enter your GitHub Personal Access Token.");
  if (!repoName) return setError("⚠️ Repository name cannot be empty.");

  try {
    setLoading(true);
    setError(null);

    console.log("Sending request to create repo:", repoName);

    const res = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token.trim()}`,
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: repoName.trim(),
        description: repoDescription.trim(),
        private: false,
      }),
    });

    const data = await res.json();
    console.log("Response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to create repository.");
    }

    alert(`✅ Repository created successfully: ${data.html_url}`);
    setRepoName("");
    setRepoDescription("");
  } catch (err) {
    setError(`❌ ${err.message}`);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="container">
      {/* 🌙 Dark Mode Button */}
      <div className="toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞" : "🌙"}
      </div>

      <header className="header">
        <h1>🐙 GitHub Analyzer</h1>
        <p>Analyze profiles, explore repos, and create your own instantly.</p>
      </header>

      <form onSubmit={handleSearch} className="form">
        <input
          type="text"
          placeholder="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="GitHub Personal Access Token (optional)"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button type="submit">🔍 Search</button>
      </form>

      {error && <div className="error">❌ {error}</div>}
      {loading && <div className="loading">⏳ Loading...</div>}

      {profile && (
        <section className="profile">
          <img src={profile.avatar_url} alt="avatar" />
          <div>
            <h2>{profile.name || profile.login}</h2>
            <p>@{profile.login}</p>
            <p>{profile.bio}</p>
            <a href={profile.html_url} target="_blank" rel="noreferrer">
              View on GitHub →
            </a>
          </div>
        </section>
      )}

      {repos.length > 0 && (
        <section className="repos">
          <h3> Repositories ({repos.length})</h3>
          <ul>
            {repos.slice(0, 10).map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
                <p>{repo.description}</p>
                <small>
                  ⭐ {repo.stargazers_count} | Forks: {repo.forks_count}
                </small>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="create-repo">
        <h3> Create a New Repository</h3>
        <input
          type="text"
          placeholder="Repository name"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />
        <textarea
          placeholder="Repository description"
          value={repoDescription}
          onChange={(e) => setRepoDescription(e.target.value)}
        ></textarea>
        <button onClick={handleCreateRepo}> Create Repository</button>
      </section>
    </div>
  );
}
