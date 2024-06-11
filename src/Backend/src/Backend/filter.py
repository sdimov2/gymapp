

def filter_helper(input, method, criteria, index):
    #print(criteria)
    #print(input)
    output = []
    if method == "string":
        for entry in input:
            for name in criteria:
                if type(entry[index]) != str and type(entry[index]) != None:
                    continue
                #skips non-strings
                if entry[index] == name:
                    output.append(entry)
                else:
                    continue
    elif method == "numerical":
        #make error case when prompted with ranges that overlap
        for entry in input:
            for range in criteria:
                #print(entry)
                if type(entry[index]) == str:
                    if index == 2 and entry[index] == "workout" or entry[index] == "":
                        continue
                    else:
                        entry[index] = float(entry[index])
                if entry[index] >= range[0] and entry[index] <= range[1]:
                    output.append(entry)
                else:
                    continue
    elif method == "variants":
        for entry in input:
            for lists in criteria:
                for name in lists:
                    if entry[index] == name:
                        output.append(entry)
                    else:
                        continue
                    
    else: 
        output = input
        print("error in filter function, no filter applied. criteria: " + criteria)
        
    return output


def filter_entries(input, criteria_type, criteria):
    #input is a table of data, 2D array
    #criteria type is what you are discriminating against
    #the criteria parameter itself is expected to be a list of ranges, so a list of a list being a 2D array as well.

    match criteria_type:
        case 'users':
            output = filter_helper(input, "string", criteria, 1)
        case 'time_ranges':
            output = filter_helper(input, "numerical", criteria, 0)
        #note that this uses the same row of data for bodyweight
        case 'workout':
            output = filter_helper(input, "string", criteria, 2)
        case 'body_weight_ranges':
            output = filter_helper(input, "numerical", criteria, 2)
        case 'activities':
            output = filter_helper(input, "string", criteria, 3)
        case 'variants':
            output = filter_helper(input, "variants", criteria, 4) # ideally you want to make another method for this filter
        case 'resistance_types':
            output = filter_helper(input, "string", criteria, 5)
        case 'set_n_ranges':
            output = filter_helper(input, "numerical", criteria, index=6)
        case 'rep_ranges':
            output = filter_helper(input, "numerical", criteria, 8)
        case 'weight_ranges':
            output = filter_helper(input, "numerical", criteria, 7)
        case _:
            print("no filter criteria recognized!")

    return output