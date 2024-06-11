def pareto(data):
    x = []
    y = []
    z = []
    for element in data:
        x.append(element[0])
        y.append(element[1])
        z.append(element[0]*element[1])

    output = set(find_maxes(data, 1)).union(find_maxes(data, 0))
    output = find_maxes(output, 1)

    return output
#pareto-like max values for each bench
def unique_in_set(x, set):
    if len(set) > 0:
        for element in set:
            if x == element:
                if type(x) != type(element):
                    print("types do not match")
                return False
        return True
    else: 
        return True
    
    #probably should have used sets tbh
def make_unique(set, respect):
    #assumes 1d
    # need to unpack
    unpacked = []
    
    for element in set:
        unpacked.append(element[respect])
    
    unique_set = []
    for element in set:
        if unique_in_set(element[respect], unique_set):
            unique_set.append(element[respect])  
    return unique_set

def find_maxes(data, respect):
    # assumes 2d respect is which coordinate of the pair with respect to
    # set(x, y): 
    # maxes with respect to y would be finding unique values in y
    # then finding the max values of x for each y
    # given a rep range, find the largest weight for it
    maxes = set()
    #make the set of the other var unique
    unique_split_set = set()
    for element in data:
        unique_split_set.add(element[respect^1])
    
    # stopped using below because i discovered sets
    #unique_split = make_unique(data, respect ^ 1)
    for unique in unique_split_set:
        max = 0
        for element in data:
            if element[respect ^ 1] == unique:
                if element[respect] > max:
                    max = element[respect]
        if respect == 0:
            maxes.add((max, unique))
        else:
            maxes.add((unique, max))
    return maxes