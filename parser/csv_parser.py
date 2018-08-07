import sys

class Node:
    # webLink -> "hdawuidhaw.com"
    # bio -> "adawoiudoiudb"
    def __init__(self, name, fields):
        self.name = name
        self.fields = fields

    def equals(self, other):
        return self.name == otherObject.name


class Edge:
    def __init__(self, node1, node2):
        self.node1 = node1
        self.node2 = node2

    def equals(self, other):
        return (self.node1 == other.node1 and self.node2 == other.node2) or (self.node1 == other.node2 and self.node2 == other.node1)


def loadData():
    filenames = [arg for arg in sys.argv]
    del filenames[0]

    print(filenames)

        # check validity of data

        # Create edge objects


def formatForCytoscape():
    print("stub")


def generateOutputFile():
    print("stub")


if __name__ == '__main__':
    loadData()
    formatForCytoscape()
    generateOutputFile()
