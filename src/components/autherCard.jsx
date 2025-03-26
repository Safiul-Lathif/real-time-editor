import { color, height, margin } from '@mui/system';
import React from 'react';

const AuthorCard = ({ authorTitle, authorName, affiliationText }) => {
    return (
        <div style={styles.card}>
            <p style={styles.authorTitle}>{authorTitle}</p>
            <h1 style={styles.authorName}>{authorName}</h1>
            <div style={styles.affiliations}>
                <p style={styles.affiliationTitle}>Affiliations :</p>
                <p style={styles.affiliationText}>
                    {affiliationText}
                </p>
            </div>
        </div>
    );
};

const styles = {
    card: {
        borderRadius: '15px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        background: 'linear-gradient(to bottom,rgba(255,255,255,0.5), rgba(19, 19, 19, 0.9)), url("https://th.bing.com/th/id/OIP.sPv_jW-1DIdN5yEiVnhK-gHaD4?rs=1&pid=ImgDetMain")',
        backgroundSize: 'cover',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderBottom: '2px solid #fff',
        top: 0,
        left: 0,
        zIndex: 100,
        height: 148,
        margin: "15px 0px"
    },
    authorTitle: {
        fontSize: '0.7em',
        fontWeight: 'bold',
    },
    authorName: {
        fontSize: '1.1em',
        fontWeight: 'bold',
        color: 'white'
    },
    affiliations: {
        textAlign: 'start',
    },
    affiliationTitle: {
        fontSize: '0.9em',
        color: 'white'
    },
    affiliationText: {
        fontSize: '0.7em',
        color: 'white'
    },
    authorImage: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
};

export default AuthorCard;