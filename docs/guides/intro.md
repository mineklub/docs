---
title: Introduktion 
description: Introduktion til MineClub guides.
---

export const Authors = ({children, authors, uuids}) => (
  <div style={{
    borderRadius: '4px',
    padding: '1rem',
    marginBottom: '1rem',
  }}>
    <strong style={{ color: '#e6c07b' }}>{authors.size > 1 ? "Forfattere" : "Forfatter"}</strong>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {authors.map((author, index) => (
        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <img 
            src={`https://crafthead.net/helm/${author.uuid}`} 
            alt={author} 
            style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '0.5rem' }}
          />
          {author.username}
        </li>
      ))}
    </ul>
  </div>
);

# Introduktion
blah blah blah

<Authors 
  authors={[
    {
      username: "Itz_Hoffe",
      uuid: "8b42c9ef-b5ef-482e-bde7-04c7897f5e80"
    }, 
  ]}
>
</Authors>