import csv
import json
import sys
import csv_parser_validator
from os import listdir
from os.path import isfile, join


ID = 1

class Node:
    # webLink -> "hdawuidhaw.com"
    # bio -> "adawoiudoiudb"
    def __init__(self, id, name, fields):
        self.id = id
        self.name = name.strip()
        self.fields = fields
        self.formatFields()

    def formatFields(self):
        fieldNo = 0
        for k,v in self.fields.items():
            newV = v.strip()
            if fieldNo > 7:
                if newV == '':
                    newV = list()
                else:
                    newV = v.split(",")
                    newV = map(str.strip, newV)
                    self.fields[k] = newV
            else:
                setattr(self, k, newV)
            self.fields[k] = newV
            fieldNo += 1

    def equals(self, other):
        return self.name == other.name

    def __repr__(self):
        return "Node ID: %d \nName: %s\nFields: %s\n\n" % (self.id,self.name,self.fields)


class Edge:
    def __init__(self, id, node1, node2, type):
        self.id = id
        self.node1 = node1
        self.node2 = node2
        self.type = type.strip()

    def __eq__(self, other):
        return (self.node1 == other.node1 and self.node2 == other.node2) or (self.node1 == other.node2 and self.node2 == other.node1)

    def __repr__(self):
        return "Edge ID: %d\nNode1: %s\nNode2: %s\nType: %s\n\n" % (self.id,self.node1,self.node2,self.type)

class Key:
    def __init__(self, name):
        self.id = '%s-key' % (name)
        self.name = name
        self.type = "key"


def getFileNames():
    specialFiles = getFileNamesFromDirectory("data/specialNodes")
    nodeFiles = getFileNamesFromDirectory("data/nodes")
    views = getFileNamesFromDirectory("data")
    return specialFiles,nodeFiles,views


def extractFileIntoList(file,path):
    with open(path+file,'r') as f:
        reader = csv.reader(f)
        instances = list(reader)
    return instances[1:], instances[0]


def createKeysList(specialNodesNames,modifierNodes):
    keys = list()
    for n in specialNodesNames:
        keys.append(Key(n))
    for n in modifierNodes:
        keys.append(Key(n.name))

    return keys


def createNodesFromFile(file,path):
    nodes = list()
    global ID
    instances,metaData = extractFileIntoList(file,path)
    for i in instances:
        name = i[0]
        fields = dict(zip(metaData[1:], i[1:]))
        nodes.append(Node(ID,name,fields))
        ID+=1

    return nodes


def createNodes(fn,path):
    # check if we have more than one file
    nodes = list()
    for file in fn:
        nodes.extend(createNodesFromFile(file,path))

    return nodes


def createSpecialEdges(specialNodes,normalNodes,specialTypes):
    edges = list()
    global ID

    specialIdMap = {}
    for specialNode in specialNodes:
        specialIdMap[specialNode.name] = specialNode.id

    for node in normalNodes:
        for specialType in specialTypes:
            for sNodeName in node.fields[specialType]:
                specialNodeID = specialIdMap[sNodeName]
                edges.append(Edge(ID,specialNodeID,node.id,specialType))
                ID+=1
    return edges


def createNormalEdges(normalNodes):
    edges = list()
    global ID

    nodeIdMap = {}
    for node in normalNodes:
        nodeIdMap[node.name] = node.id

    for node in normalNodes:
        for collaborator in node.fields['collaborators']:
            colNodeId = nodeIdMap[collaborator]
            newEdge = Edge(ID,node.id,colNodeId,"collab")
            if newEdge not in edges:
                edges.append(newEdge)
                ID+=1
    return edges


def createEdges(specialNodes,normalNodes,specialTypes):
    edges = list()
    global ID
    # check againt special node and normal nodes
    specialEdges = createSpecialEdges(specialNodes,normalNodes,specialTypes)
    edges.extend(specialEdges)

    # check against normal node to normal node
    normalEdges = createNormalEdges(normalNodes)
    edges.extend(normalEdges)

    return edges


def loadData():
    # create nodes
    allNodes = list()
    specialFN,nodesFN,viewsFN = getFileNames()
    specialNodes = createNodes(specialFN,'data/specialNodes/')
    normalNodes = createNodes([nodesFN[0]],'data/nodes/')
    modifierNodes = createNodes([nodesFN[1]],'data/nodes/')
    allNodes.extend(specialNodes)
    allNodes.extend(normalNodes)

    # trim .csv
    specialNames = [".".join(f.split(".")[:-1]).lower() for f in specialFN]

    # create list of keys
    keys = createKeysList(specialNames,modifierNodes)

    # check validity of data
    validate_data(specialNodes,normalNodes,modifierNodes)

    # Create edge objects
    edges = createEdges(specialNodes,normalNodes,specialNames)

    # Remove 'fields' dict from nodeSize
    [delattr(node, 'fields') for node in allNodes]

    return allNodes,edges,keys


def formatForCytoscape(nodes, edges, keyList):

    data = []

    #keyBorder
    data.append({'group': "nodes", 'data': {'id': "keyBorder", 'type': 'border'}})

    #keyTitle
    data.append({'group': "nodes", 'data': {'id': "titleKey", 'name': "NODE TYPE", 'type': 'key'}})

    #keys
    for key in keyList:
        data.append({'group': "nodes", 'data': key.__dict__, 'selectable': False, 'grabbable': False})

    #nodes
    for node in nodes:
        data.append({'group': "nodes", 'data': node.__dict__})

    #edges
    for edge in edges:
        data.append({'group': "edges", 'data': edge.__dict__})

    return json.dumps(data, separators=(',', ':'))

def generateOutputFile(elements):
    path = './output.json'
    jsonFile = open(path, 'w+')
    jsonFile.write(elements)
    jsonFile.close()


def getFileNamesFromDirectory(dir):
    onlyfiles = [f for f in listdir(dir) if isfile(join(dir, f))]
    return onlyfiles


if __name__ == '__main__':
    nodes, edges, keys = loadData()

    elements = formatForCytoscape(nodes, edges, keys)

    generateOutputFile(elements)
