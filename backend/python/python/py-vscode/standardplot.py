import numpy as np
import matplotlib
# Resolve issue betweeb matplotlib and virtual environment
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt

x = np.linspace(0, 20, 100)
plt.plot(x, np.sin(x))
plt.show()