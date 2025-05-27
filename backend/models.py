import time
from db import get_db_connection
import mysql.connector

def wait_for_db(retries=10, delay=2):
    for i in range(retries):
        try:
            conn = get_db_connection()
            conn.close()
            print("✅ Connected to the database.")
            return
        except mysql.connector.Error as e:
            print(f"⏳ DB not ready yet ({i + 1}/{retries}): {e}")
            time.sleep(delay)
    raise Exception("❌ Could not connect to DB after retries.")

wait_for_db()

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
    print("✅ Database initialized.")

init_db()
