import math
import heapq

# test case to be deleated one the parser is done
size = (100, 100)
start = (5, 3)
end = (6, 9)

obstacles = {
    (3, 4), (3, 5), (3, 6), (3, 7), (3, 8),
    (4, 5),
    (5, 5), (5, 7), (5, 9),
    (6, 2), (6, 3), (6, 4), (6, 5), (6, 7),
    (7, 7)
}

def successors(state, visited_nodes, matrix, obstaclestwo):
    (row, col) = state
    (max_row, max_col) = matrix
    succ_states = []
    if row > 1:
        succ_states += [(row-1, col)]
    if col > 1:
        succ_states += [(row, col-1)]
    if row < max_row:
        succ_states += [(row+1, col)]
    if col < max_col:
        succ_states += [(row, col+1)]

    return [s for s in succ_states if s not in visited_nodes if s not in obstaclestwo]

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

def astar_with_path(start, end, matrix, obstacles):
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

if __name__ == "__main__":
    print(astar_with_path(start, end, size, obstacles))
