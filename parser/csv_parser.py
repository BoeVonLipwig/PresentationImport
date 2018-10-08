import csv
import json
import os
from os import listdir
from os.path import isfile, join, isdir


ID = 1


class Node:
    def __init__(self, id, name, type, year, fields):
        self.id = id
        self.name = name.strip()
        self.type = type.strip()
        self.year = year
        self.fields = fields
        self.formatFields()

    def formatFields(self):
        fieldNo = 0
        for k, v in self.fields.items():
            newV = v.strip()
            if fieldNo > 7:
                if newV == '':
                    newV = list()
                else:
                    newV = v.split(",")
                    newV = list(map(str.strip, newV))
                    self.fields[k] = newV
            else:
                setattr(self, k, newV)
            self.fields[k] = newV
            fieldNo += 1

    def replaceConnections(self, newNode):
        self.fields = newNode.fields

    def addYear(self, year):
        self.year = self.year + ',' + str(year)

    def __eq__(self, other):
        return self.name == other.name

    def __repr__(self):
        return """Node ID: %d \n
                  Name: %s\n
                  Fields: %s\n\n""" % (self.id, self.name, self.fields)


class Edge:
    def __init__(self, id, node1, node2, type, year):
        self.id = id
        self.source = node1
        self.target = node2
        self.type = type.strip()
        self.year = year

    def addYear(self, year):
        self.year = self.year + ',' + str(year)

    def __eq__(self, other):
        return ((self.source == other.source and self.target == other.target) or
                (self.source == other.target and self.target == other.source))

    def __repr__(self):
        return """Edge ID: %d, Node1: %s, Node2: %s, Type: %s,
            Year: %s\n""" % (self.id, self.source, self.target, self.type, self.year)


class Key:
    def __init__(self, name):
        self.id = '%s-key' % (name)
        self.name = name
        self.type = "key"
        self.role = name.lower()


def getFileNamesFromDirectory(dir):
    onlyfiles = [f for f in listdir(dir) if isfile(join(dir, f))]
    return onlyfiles


def getFileNames(dir):
    specialFiles = getFileNamesFromDirectory(join(dir, "specialNodes"))
    nodeFiles = getFileNamesFromDirectory(join(dir, "nodes"))
    nodeFiles = [fileName for fileName in nodeFiles if fileName != 'roles.csv']
    return specialFiles, nodeFiles


def extractFileIntoList(file, path):
    with open(join(path, file), 'r') as f:
        reader = csv.reader(f)
        instances = list(reader)
    return instances[1:], instances[0]


def createKeysList(specialNodesNames, modifierNodes):
    keys = list()
    for n in specialNodesNames:
        keys.append(Key(n))
    for n in modifierNodes:
        keys.append(Key(n.name))

    return keys


def createNormalEdges(allEdges, normalNodes, year):
    global ID
    edges = list()

    nodeIdMap = {}
    for node in normalNodes:
        nodeIdMap[node.name] = node.id

    for node in normalNodes:
        for collaborator in node.fields['collaborators']:
            colNodeId = nodeIdMap[collaborator]
            edge = Edge(ID, node.id, colNodeId, "collab", year)
            ID += 1
            if edge in allEdges:
                existingEdge = allEdges[allEdges.index(edge)]
                existingEdge.addYear(year)
            elif edge not in edges:
                edges.append(edge)

    allEdges.extend(edges)


def createSpecialEdges(allEdges, specialNodes, node, year):
    global ID

    for specialNode in specialNodes:
        specialType = specialNode.type
        specialNodeID = specialNode.id
        for sNodeName in node.fields[specialType]:
            if sNodeName == specialNode.name:
                edge = Edge(ID, specialNodeID, node.id, specialType, year)
                ID += 1
                if edge in allEdges:
                    existingEdge = allEdges[allEdges.index(edge)]
                    existingEdge.addYear(year)
                else:
                    allEdges.append(edge)


def createNodesFromFile(allNodes, allEdges, specialNodes, year, file, path):
    nodes = list()
    global ID
    instances, metaData = extractFileIntoList(file, path)
    for i in instances:
        name = i[0]
        type = file[:-4].lower()
        fields = dict(zip(metaData[1:], i[1:]))
        node = Node(ID, name, type, year, fields)
        ID += 1
        if node in allNodes:
            existingNode = allNodes[allNodes.index(node)]
            existingNode.addYear(year)
            nodes.append(existingNode)
            existingNode.replaceConnections(node)
            node = existingNode
        else:
            nodes.append(node)
            allNodes.append(node)
        createSpecialEdges(allEdges, specialNodes, node, year)

    return nodes


def createSpecialNodesFromFile(allNodes, year, file, path):
    nodes = list()
    global ID
    instances, metaData = extractFileIntoList(file, path)
    for i in instances:
        name = i[0]
        type = file[:-4].lower()
        fields = dict(zip(metaData[1:], i[1:]))
        node = Node(ID, name, type, year, fields)
        ID += 1
        if node in allNodes:
            existingNode = allNodes[allNodes.index(node)]
            existingNode.addYear(year)
            nodes.append(existingNode)
        else:
            nodes.append(node)
            allNodes.append(node)

    return nodes


def createNodes(allNodes, allEdges, specialNodes, year, fileNames, path):
    # check if we have more than one file
    nodes = list()
    for file in fileNames:
        nodes.extend(createNodesFromFile(allNodes, allEdges, specialNodes, year, file, path))
    return nodes


def createSpecialNodes(allNodes, year, specialFiles, path):
    # check if we have more than one file
    nodes = list()
    for file in specialFiles:
        nodes.extend(createSpecialNodesFromFile(allNodes, year, file, path))

    return nodes


def loadData(dir):
    allNodes = list()
    allEdges = list()

    years = [f for f in listdir(dir) if isdir(join(dir, f))]
    specialFileNames, nodesFileNames = getFileNames(join(dir, years[0]))

    modifierNodes = createNodes(allNodes, list(), list(), years[0], ['roles.csv'], join(dir, years[0], 'nodes'))

    # trim .csv
    specialNames = [".".join(f.split(".")[:-1]).lower() for f in specialFileNames]

    # create list of keys
    keys = createKeysList(specialNames, modifierNodes)

    for year in years:
        # Create node objects
        specialNodes = createSpecialNodes(allNodes, year, specialFileNames, join(dir, year, 'specialNodes'))
        normalNodes = createNodes(allNodes, allEdges, specialNodes, year, [nodesFileNames[0]], join(dir, year, 'nodes'))
        for node in normalNodes:
            node.role = node.role.lower()

        # Create edge objects
        createNormalEdges(allEdges, normalNodes, year)

    # Remove 'fields' dict from nodeSize
    [delattr(node, 'fields') for node in allNodes]

    return allNodes, allEdges, keys


def formatForCytoscape(nodes, edges, keyList):

    data = []

    # keyBorder
    data.append({'group': "nodes",
                 'data': {'id': "keyBorder", 'type': 'border'}})

    # keyTitle
    data.append({'group': "nodes",
                 'data': {'id': "titleKey", 'name': "NODE TYPE",
                          'type': 'key'}})

    # keys
    for key in keyList:
        data.append({'group': "nodes", 'data': key.__dict__,
                     'selectable': False, 'grabbable': False})

    # nodes
    for node in nodes:
        data.append({'group': "nodes", 'data': node.__dict__})

    # edges
    for edge in edges:
        data.append({'group': "edges", 'data': edge.__dict__})

    return json.dumps(data, separators=(',', ':'))


def generateOutputFile(elements):
    if not os.path.exists('./output'):
        os.makedirs('./output')
    path = './output/output.json'
    jsonFile = open(path, 'w+')
    jsonFile.write(elements)
    jsonFile.close()


if __name__ == '__main__':
    nodes, edges, keys = loadData('data')

    elements = formatForCytoscape(nodes, edges, keys)

    generateOutputFile(elements)
