
def validate_data(specialNodes,normalNodes,modifierNodes):
    check_case1(specialNodes,normalNodes)
    check_case2(specialNodes,normalNodes)
    check_case3(normalNodes,modifierNodes)
    check_case4(specialNodes,normalNodes,modifierNodes)
    check_case5(normalNodes,modifierNodes)

# check if nodes.csv has same amount special node columns as number of special node files
def check_case1(specialNodes,normalNodes):


# check if special node values in node.csv is a valid entry in special nodes
def check_case2(specialNodes,normalNodes):


# check if all names of nodes and roles are unique
def check_case3(normalNodes,modifierNodes):


# check if all files have correct schema. so they should right number of columns and column names
def check_case4(specialNodes,normalNodes,modifierNodes):


# check if roles column values in node.csv matches in roles.csv
def check_case5(normalNodes,modifierNodes):
