import React, { useState } from 'react';

function ExpandableGrid({ items }) {
    const [expandedItemId, setExpandedItemId] = useState(null);

    const handleItemClick = (itemId) => {
        setExpandedItemId(expandedItemId === itemId ? null : itemId); // Toggle expansion
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {items.map((item) => (
                <div
                    key={item.id}
                    style={{ border: '1px solid #ccc', padding: '10px', cursor: 'pointer' }}
                    onClick={() => handleItemClick(item.id)}
                >
                    <h3>{item.title}</h3>
                    {expandedItemId === item.id && <p>{item.content}</p>}
                </div>
            ))}
        </div>
    );
}

// Example data
const gridItems = [
    { id: 1, title: 'Item 1', content: 'Content for Item 1' },
    { id: 2, title: 'Item 2', content: 'Content for Item 2' },
    { id: 3, title: 'Item 3', content: 'Content for Item 3' },
    { id: 4, title: 'Item 4', content: 'Content for Item 4' },
    { id: 5, title: 'Item 5', content: 'Content for Item 5' },
];

function App() {
    return <ExpandableGrid items={gridItems} />;
}

export default App;