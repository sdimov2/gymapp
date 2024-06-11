from flask import jsonify

from Backend.filter import filter_entries
from Backend.get_data import get_data_from_entries
from info import global_data


def ProcessData(selected):

    data = selected

    return data