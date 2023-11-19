import math
import heapq

def successors(state, visited_nodes, matrix, obstacles):
    max_row, max_col = matrix
    r, c = state
    valid_states = [(r - 1, c), (r, c - 1), (r + 1, c), (r, c + 1)]

    def is_valid_state(r, c):
        return 1 <= r <= max_row and 1 <= c <= max_col and (r, c) not in visited_nodes and (r, c) not in obstacles

    return [(r, c) for r, c in valid_states if is_valid_state(r, c)]

def initialize_costs(matrix, start):
    (h, w) = matrix
    costs = [[math.inf] * w for i in range(h)]
    (x, y) = start
    costs[x-1][y-1] = 0
    return costs

def heuristic(node, goal):
    (x, y) = node
    (u, v) = goal
    return math.sqrt(abs(x-u) ** 2 + abs(y - v) ** 2)

def astar(start, end, matrix, obstacles):
    frontier = []
    internal = set()
    heapq.heappush(frontier, (0, start))
    costs = initialize_costs(matrix, start)

    def get_distance_from_start(node):
        return costs[node[0]-1][node[1]-1]
    
    def set_distance_from_start(node, new_distance):
        costs[node[0]-1][node[1]-1] = new_distance

    def get_shortest_path(end_node):
        path = [end_node]
        distance = get_distance_from_start(end_node)
        while distance > 0:
            for neighbor in successors(path[-1], [], matrix, obstacles):
                new_distance = get_distance_from_start(neighbor)
                if new_distance < distance:
                    path += [neighbor]
                    distance = new_distance
                    break
        return path

    steps = 0
    while len(frontier) > 0:
        steps += 1
        (priority, node) = heapq.heappop(frontier)
        if node == end:
            return get_shortest_path(end) 
        internal.add(node)
        successor_nodes = successors(node, internal, matrix, obstacles)
        for s in successor_nodes:
            new_distance = get_distance_from_start(node) + 1
            if new_distance < get_distance_from_start(s):
                set_distance_from_start(s, new_distance)
                frontier = [n for n in frontier if s != n[1]]
                heapq.heappush(frontier, (new_distance + heuristic(s, end), s))
