import numpy as np
from datetime import datetime

from sklearn.metrics import mean_squared_error, r2_score
import scipy.stats as stats


def calculate_prediction_intervals(Set, y_model, dynamic, confidence_level, y_fit_original_size=[]):
    if len(y_fit_original_size) == 0:
        y_fit_original_size = y_model
    
    alpha = 1-confidence_level
    
    y = []
    x = []
    for pair in Set:
        x.append(pair[0])
        y.append(pair[1])

    if dynamic:
        #let's try to model the error as a set of data, and use that to create dynamic confidence intervals
        standard_errors = []
        for i in range(len(y)):

            standard_errors.append([x[i], std_err(y[i], y_model[i])])

        polynomial_degree = 4
        std_error_curve = fit_curve(standard_errors, polynomial_degree, linspace="default")

        prediction_intervals = []

        for i in range(len(y)):
            
            critical_value = stats.t.ppf(1 - alpha/2, df=len(y_model)-1)
            print("crit", critical_value)
            print("std_err", std_error_curve[i])
            print("y-model", y_model[i])
            lower_bound = y_model[i] - (critical_value * std_error_curve[i])
            upper_bound = y_model[i] + (critical_value * std_error_curve[i])
            prediction_intervals.append((lower_bound, upper_bound))
        return prediction_intervals

        #lower_bound = y_model + std_error_curve
        #upper_bound = y_model + std_error_curve
        #return lower_bound, upper_bound
    
    else:
        #use the mean of the entire errors to model the confidenc intervals statically
        # assume size of y_model = size of x


        mse = mean_squared_error(y, y_fit_original_size)

        # Calculate the standard error
        standard_error = np.sqrt(mse)
        # Assuming 95% confidence level (alpha = 0.05)
        
        
        prediction_intervals = []

        for i in range(len(y_model)):
        
            critical_value = stats.t.ppf(1 - alpha/2, df=len(y_model)-1)
            lower_bound = y_model[i] - (critical_value * standard_error)
            upper_bound = y_model[i] + (critical_value * standard_error)
            prediction_intervals.append((lower_bound, upper_bound))
        return prediction_intervals


# for individual points
def std_err(y1, y2):
    return np.sqrt(np.square((y1-y2)/2))


def fit_curve(Set, degree, linspace="default"):
    y = []
    x = []
    output = []

    for pair in Set:
        if type(pair[0]) == datetime:
            x.append(int(pair[0].timestamp()))
        else:
            x.append(pair[0])
        y.append(pair[1])
    # Fit a polynomial of specified degree
    coeffs = np.polyfit(x, y, degree)
    if type(linspace) == str:
        linspace = x
    # Generate y values based on the fitted polynomial
    y_fit = np.polyval(coeffs, linspace)

    for i in range(len(linspace)):
        output.append([linspace[i], y_fit[i]])
    
    return output, linspace, y_fit