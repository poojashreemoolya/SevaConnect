
import json

from flask import Blueprint, jsonify, request

from database.db import get_db_connection


offices_bp = Blueprint("offices", __name__)


def convert_office(row):
    """Convert database row into API-friendly dictionary."""
    office = dict(row)

    office["services_handled"] = json.loads(
        office["services_handled"] or "[]"
    )

    return office


# GET all offices with optional taluk and search filters
@offices_bp.route("/api/offices", methods=["GET"])
def get_offices():
    taluk = request.args.get("taluk", "").strip()
    search = request.args.get("search", "").strip()

    query = "SELECT * FROM offices WHERE 1=1"
    parameters = []

    if taluk:
        query += " AND taluk = ?"
        parameters.append(taluk)

    if search:
        query += " AND office_name LIKE ?"
        parameters.append(f"%{search}%")

    query += " ORDER BY taluk, office_name"

    connection = get_db_connection()

    try:
        rows = connection.execute(query, parameters).fetchall()
        offices = [convert_office(row) for row in rows]

        return jsonify({
            "success": True,
            "data": offices,
            "message": "Offices retrieved successfully"
        }), 200

    finally:
        connection.close()
