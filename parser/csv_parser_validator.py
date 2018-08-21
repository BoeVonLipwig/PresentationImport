from csv_parser_file_functions import *

def validate_data(specialNodes,normalNodes,modifierNodes, numberOfSpecialNodes,lastDetailsFieldIndex,specialFN,nodesFN,viewsFN,specialNames):
    if not check_case1(specialNodes,normalNodes,lastDetailsFieldIndex,numberOfSpecialNodes,nodesFN):
        print("case1 failed")
        return False

    if not check_case2(specialNodes,normalNodes,specialNames):
        print("case2 failed")
        return False

    if not check_case3(normalNodes,modifierNodes):
        print("case3 failed")
        return False

    # if not check_case4(specialNodes,normalNodes,modifierNodes):
    #     print("case4 failed")
    #     return False

    if not check_case5(normalNodes,modifierNodes):
        print("case5 failed")
        return False

    # passes all cases. meaning data is valid
    print("valid data")
    return True


# check if nodes.csv has same amount special node columns as number of special node files
# node.csv should always have "lastDetailsFieldIndex" amount of fields reserved for name and details
def check_case1(specialNodes,normalNodes, lastDetailsFieldIndex, numberOfSpecialNodes,nodesFN):
    # get path details to open file
    nodesFileName = nodesFN[0]
    path = 'data/nodes/'

    # get fields names inside nodes.csv
    metaData = fetch_metadata(nodesFileName,path)

    # trim off name and details to see the left over fields
    trimPoint = 3 + lastDetailsFieldIndex   # plus three because of names, roles, and collab field
    specialNodeColumns = metaData[trimPoint:]

    # check if tripoint is less than 1, meaning it is definitely incorrect
    if(trimPoint < 1):
        return False

    # check if left over fields are equivalent to number of special nodes
    if len(specialNodeColumns) == numberOfSpecialNodes:
        return True

    # failed use case 1
    return False



# check if special node values in node.csv is a valid entry in special nodes
def check_case2(specialNodes,normalNodes,specialNames):

    # go through every normal node
    for nodeNode in normalNodes:
        # use this boolean to determine if node contains any of the special node values
        match = False

        # go through every specialNode
        for specialNode in specialNodes:

            # go through every special node column in normal node
            for specialColumnName in specialNames:

                # if we find a match in the node's special node column, it is a valid node entry in nodes.csv
                if specialNode.name in nodeNode.fields[specialColumnName]:
                    match = True

        # if no match, failed use case 2
        if not match:
            return False

    # never found a miss-match
    return True



# check if all names of nodes and roles are unique
def check_case3(normalNodes,modifierNodes):

    # check if normal nodes does not have unique names
    if not contains_unique_names(normalNodes):
        return False

    # check if role nodes does not have unique names
    if not contains_unique_names(modifierNodes):
        return False

    # both names of nodes and role a unique, pass
    return True



# check if all files have correct schema. so they should right number of columns and column names
def check_case4(specialNodes,normalNodes,modifierNodes):
    return False


# check if roles column values in node.csv matches in roles.csv
def check_case5(normalNodes,modifierNodes):

    # go through every normal node
    for nodeNode in normalNodes:
        # use this boolean to determine if node contains any of the special node values
        match = False

        # go through every specialNode
        for modNode in modifierNodes:
            # if we find a match in the node's special node column, it is a valid node entry in nodes.csv
            if modNode.name == nodeNode.fields["role"]:

                match = True

        # if no match, failed use case 2
        if not match:
            return False

    # never found a miss-match
    return True



# gets the metadata of the file
def fetch_metadata(filename,path):
    return extractFileIntoList(filename,path)[1]



def contains_unique_names(nodesList):
    # store a names list to keep track of names we have already processed
    names = list()

    # go through every normal node1
    for node in nodesList:

        # Found a non unique name, fail case 3
        if node.name in names:
            return False

        # add unique name to names list
        names.append(node.name)

    # this nodes list from a file contains unique values, pass case 3
    return True
