
import json

from database.db import get_db_connection


# Add only information verified from official sources.
# Keep these lists empty until your teammates provide their research.

SERVICES = []

OFFICES = []

ANNOUNCEMENTS = []


def seed_services(connection):
    inserted = 0

    for service in SERVICES:
        existing = connection.execute(
            """
            SELECT id FROM services
            WHERE name = ? AND department IS ?
            """,
            (service["name"], service.get("department"))
        ).fetchone()

        if existing:
            continue

        connection.execute(
            """
            INSERT INTO services (
                name, category, description, eligibility,
                required_documents, application_steps,
                application_mode, official_url, department,
                source_url, last_verified
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                service["name"],
                service["category"],
                service.get("description"),
                service.get("eligibility"),
                json.dumps(service.get("required_documents", [])),
                json.dumps(service.get("application_steps", [])),
                service.get("application_mode", "Unknown"),
                service.get("official_url"),
                service.get("department"),
                service.get("source_url"),
                service.get("last_verified")
            )
        )

        inserted += 1

    return inserted


def seed_offices(connection):
    inserted = 0

    for office in OFFICES:
        existing = connection.execute(
            """
            SELECT id FROM offices
            WHERE office_name = ? AND taluk = ?
            """,
            (office["office_name"], office["taluk"])
        ).fetchone()

        if existing:
            continue

        connection.execute(
            """
            INSERT INTO offices (
                office_name, taluk, address, contact_number,
                services_handled, official_url, source_url,
                last_verified
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                office["office_name"],
                office["taluk"],
                office.get("address"),
                office.get("contact_number"),
                json.dumps(office.get("services_handled", [])),
                office.get("official_url"),
                office.get("source_url"),
                office.get("last_verified")
            )
        )

        inserted += 1

    return inserted


def seed_announcements(connection):
    inserted = 0

    for announcement in ANNOUNCEMENTS:
        existing = connection.execute(
            """
            SELECT id FROM announcements
            WHERE title = ? AND published_date IS ?
            """,
            (
                announcement["title"],
                announcement.get("published_date")
            )
        ).fetchone()

        if existing:
            continue

        connection.execute(
            """
            INSERT INTO announcements (
                title, description, published_date, deadline,
                official_url, source_url, status, last_verified
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                announcement["title"],
                announcement.get("description"),
                announcement.get("published_date"),
                announcement.get("deadline"),
                announcement.get("official_url"),
                announcement.get("source_url"),
                announcement.get("status", "current"),
                announcement.get("last_verified")
            )
        )

        inserted += 1

    return inserted


def seed_database():
    connection = get_db_connection()

    try:
        services_added = seed_services(connection)
        offices_added = seed_offices(connection)
        announcements_added = seed_announcements(connection)

        connection.commit()

        print("SevaConnect database seeding completed!")
        print("New services:", services_added)
        print("New offices:", offices_added)
        print("New announcements:", announcements_added)

    except Exception:
        connection.rollback()
        raise

    finally:
        connection.close()


if __name__ == "__main__":
    seed_database()
