
from flask import Blueprint, jsonify, request

from database.db import get_db_connection


announcements_bp = Blueprint("announcements", __name__)


@announcements_bp.route("/api/announcements", methods=["GET"])
def get_announcements():

    status = request.args.get("status", "").strip().lower()

    if status and status not in ("current", "expired"):
        return jsonify({
            "success": False,
            "data": None,
            "message": "Invalid status. Use current or expired."
        }), 400

    query = "SELECT * FROM announcements WHERE 1=1"
    parameters = []

    if status:
        query += " AND status = ?"
        parameters.append(status)

    query += " ORDER BY published_date DESC"

    connection = get_db_connection()

    try:
        rows = connection.execute(query, parameters).fetchall()

        announcements = [dict(row) for row in rows]

        return jsonify({
            "success": True,
            "data": announcements,
            "message": "Announcements retrieved successfully"
        }), 200

    finally:
        connection.close()
