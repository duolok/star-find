import math
import heapq

def initialize_costs(size, start):
    costs = [[math.inf] * size[1] for i in range(size[0])]
    (x, y) = start
    costs[x-1][y-1] = 0
    return costs

def distance_heuristic(node, goal):
    (x, y) = node
    (u, v) = goal
    return math.sqrt(abs(x - u) ** 2 + abs(y - v) ** 2)

def successors(state, visited_nodes, obstacles, size):
    (row, col) = state
    (max_row, max_col) = size
    succ_states = []
    if row > 1:
        succ_states += [(row-1, col)]
    if col > 1:
        succ_states += [(row, col-1)]
    if row < max_row:
        succ_states += [(row+1, col)]
    if col < max_col:
        succ_states += [(row, col+1)]
    return [s for s in succ_states if s not in visited_nodes if s not in obstacles]

def astar(coordinates, size, obstacles):
    start, end = coordinates[0], coordinates[1]
    frontier = []
    internal = set()
    heapq.heappush(frontier, (0, start))
    costs = initialize_costs(size, start)

    def get_distance_from_start(node):
        return costs[node[0] -  1][node[1] - 1]

    def set_distance_from_start(node, new_distance):
        costs[node[0] - 1][node[1] - 1] = new_distance

    def get_shortest_path(end_node):
        path = [end_node]
        distance = get_distance_from_start(end_node)
        while distance > 0:
            for neighbor in successors(node, internal, size, obstacles):
                new_distance = get_distance_from_start(node) + 1
                if new_distance < distance:
                    path += [neighbor]
                    distance = new_distance
                    break
        return path

    while len(frontier) > 0:
        (priority, node) = heapq.heappop(frontier)
        if node == end:
            return get_shortest_path(end)
        internal.add(node) 
        successor_nodes = successors(node, internal, obstacles, size)
        for s in successor_nodes:
            new_distance = get_distance_from_start(node) + 1
            if new_distance < get_distance_from_start(s):
                set_distance_from_start(s, new_distance)
                frontier = [n for n in frontier if s != n[1]]
                heapq.heappush(frontier, (new_distance + distance_heuristic(s, end), s))
