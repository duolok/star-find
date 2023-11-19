from astar import astar
from parser import parse_grid

def execute(grid):
    return astar(*parse_grid(grid))
