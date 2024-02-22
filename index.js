class Graph {
    constructor() {
      if (!(this instanceof Graph)) return new Graph() //防止重复创建实例
      this.nodes = [] //图的节点集
      this.edges = [] //图的边集
      this.table = new Map() //节点标识表
    }
    initNodes(vs) {
      for (let id of vs) {
        let v = Node()
        v.id = id
        this.table.set(id, v)
        this.nodes.push(v)
      }
    }
    initEdges(es) {
      for (let r of es) {
        let e = Edge()
        e.u = this.table.get(r.u)
        e.v = this.table.get(r.v)
        e.w = r.w
        this.edges.push(e)
      }
    }
  }
  function Node() {
    if (!(this instanceof Node)) return new Node()
    this.id = null //用来标识节点
    this.data = null //节点数据
  }
  function Edge() {
    if (!(this instanceof Edge)) return new Edge()
    this.u = null
    this.v = null
    this.w = null
  }
  function BellmanFord(nodes, edges, source) {
    let distance = new Map() //用来记录从原节点 source 到某个节点的最短路径估计值
    // 第一步: 初始化图
    for (let v of nodes) {
      distance.set(v, Infinity) // 初始化最短估计距离 默认无穷大
    }
    distance.set(source, 0) // 将源节点的最短路径估计距离 初始化为0
    // 第二步: 重复松弛边
    for (let i = 1, len = nodes.length - 1; i < len; i++) {
      for (let e of edges) {
        if (distance.get(e.u) + e.w < distance.get(e.v)) {
          distance.set(e.v, distance.get(e.u) + e.w)
        }
      }
    }
    // 第三步: 检查是否有负权回路 第三步必须在第二步后面
    for (let e of edges) {
      if (distance.get(e.u) + e.w < distance.get(e.v)) return null //返回null表示包涵负权回路
    }
    return {
      distance: distance
    }
  }
//   const nodes = ['A', 'B', 'C', 'D'] //点
//   const edges = [
//     //边，u表示起始点，v表示终点，w是权值
//     { u: 'A', v: 'B', w: 4 },
//     { u: 'A', v: 'C', w: 3 },
//     { u: 'B', v: 'C', w: -2 },
//     { u: 'B', v: 'D', w: 3 },
//     { u: 'C', v: 'D', w: 3 }
//   ]
//   const g = new Graph()
//   g.initNodes(nodes)
//   g.initEdges(edges)
//   const r = BellmanFord(g.nodes, g.edges, g.nodes[0])
//   console.log(r)