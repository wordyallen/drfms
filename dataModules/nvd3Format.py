def nvd3Format(array):
    values = []
    for i in range(len(array)):
        doc = {'x': i, 'y': array[i]}
        values.append(doc)
    return values
