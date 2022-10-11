// let code problem
// https://leetcode.com/problems/find-if-path-exists-in-graph/


function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    let adjList = buildAdjList(n, edges)
    
    if (adjList[source]?.includes(destination))
        return true
    
    return dfs(source, destination, adjList)
};

function buildAdjList(nodesSize: number, input: number[][]): Object {
    let adjList = {}
        
    for (let i = 0; i < input.length; i++) {
        let firstNode = input[i][0]
        let secondNode = input[i][1]
        
        if (!adjList[firstNode]) {
            adjList[firstNode] = []
        }
        
        if (!adjList[secondNode]) {
            adjList[secondNode] = []
        }
        
        adjList[firstNode].push(secondNode)
        adjList[secondNode].push(firstNode)
    }
    
    return adjList
}


function dfs(source: number, destination: number, adjList: Object): boolean {
    let stack = [source]
    let visited = []
    
    while (stack.length > 0) {
        let visiting = stack.pop()
        visited.push(visiting)
        
        if (visiting === destination) {
            return true
        }
        
        for (let neighbors of adjList[visiting]) {
            if (!visited.includes(neighbors))
                stack.push(neighbors)
        }
    }
    
    return false
}