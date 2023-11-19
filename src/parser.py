
def get_start_end(grid):
    return tuple((item['row'], item['col']) for item in grid if item['isBlue'])

def get_obstacles(grid):
    return {(item['row'], item['col']) for item in grid if item['isRed']}

def get_grid_size(grid):
    return (max((item['row'] for item in grid), default=-1) + 1,
            max((item['col'] for item in grid), default=-1) + 1) if grid else (0, 0)

def parse_grid(grid):
    start, end = get_start_end(grid)[0], get_start_end(grid)[1]
    size = get_grid_size(grid)
    obstacles = get_obstacles(grid)

    return start, end, size, obstacles

