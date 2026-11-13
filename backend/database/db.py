
import sqlite3
from pathlib import Path

# Find the database folder automatically
DATABASE_DIR = Path(__file__).resolve().parent

# Database file location
DATABASE_PATH = DATABASE_DIR / "seva_connect.db"

# SQL schema file location
SCHEMA_PATH = DATABASE_DIR / "schema.sql"


def get_db_connection():
    """Create and return a SQLite database connection."""
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    """Create database tables using schema.sql."""
    connection = get_db_connection()

    try:
        with open(SCHEMA_PATH, "r", encoding="utf-8") as schema_file:
            schema = schema_file.read()

        connection.executescript(schema)
        connection.commit()

        print("SevaConnect database initialized successfully!")

    finally:
        connection.close()
