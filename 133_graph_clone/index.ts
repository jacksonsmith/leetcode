// resolution graph problem
// https://leetcode.com/problems/clone-graph/submissions/

/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     neighbors: Node[]
 *     constructor(val?: number, neighbors?: Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 */

 function cloneGraph(node: Node | null): Node | null {
    if (!node) {
        return node
    }
    
    if (!node.neighbors || node.neighbors.length === 0) {
        return new Node(node?.val, node?.neighbors)
    }
    
	let nodes = bfs(node)
    let nodesUpdated = bfsUpdate(node, nodes)
    
    let result = nodesUpdated.filter(item => item != null)
    
    return result[0]
};



function bfs(node: Node): Node[] {
    let queue: [Node] = [node]
    let visited = [node.val]
    let nodes = Array(100).fill(null)

    while (queue.length > 0) {
        let current = queue.shift()
        
        let newCurrentNode = copyNode(current)
        nodes[current.val] = newCurrentNode
        
        for (let visiting of current.neighbors) {
            if (!visited.includes(visiting.val)) {
                visited.push(visiting.val)
                queue.push(visiting)
            }
        }
    }
    
    return nodes
}

function copyNode(node: Node): Node {
    let newVal = node.val
    let neighbors = []
    
    return new Node(newVal, neighbors)
}

function bfsUpdate(node: Node, nodes: Node[]): Node[] {
    let queue: [Node] = [node]
    let visited = [node.val]

    while (queue.length > 0) {
        let current = queue.shift()
        
        for (let visiting of current.neighbors) {
            nodes[current.val].neighbors.push(nodes[visiting.val])
            
            if (!visited.includes(visiting.val)) {
                visited.push(visiting.val)
                queue.push(visiting)
            }
        }
    }
    
    return nodes
}