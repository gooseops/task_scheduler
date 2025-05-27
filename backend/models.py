from db import get_db_connection

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            count INT DEFAULT 0
        )
    """)
    conn.commit()
    conn.close()

init_db()
