export const lesson10 = {
  id: 10,
  number: "10",
  title: "10-Data Analysis With Python",
  category: "Data & AI Track",
  description: "Master the Python Data Science stack: NumPy array computing, Pandas DataFrames, Data Wrangling, GroupBy aggregations, and visual storytelling with Matplotlib & Seaborn.",
  duration: "90 mins",
  difficulty: "Intermediate",
  status: "available",
  summary: "Python is the undisputed language of modern Data Science and Machine Learning. In this lesson, you will master the foundational data stack: high-performance N-dimensional array computing with NumPy, tabular data manipulation and cleaning with Pandas, and data visualization using Matplotlib and Seaborn.",
  sections: [
    {
      id: "numpy-fundamentals",
      title: "1. High-Performance Arrays with NumPy",
      content: `**NumPy (Numerical Python)** is the backbone of scientific computing and machine learning in Python. Standard Python lists store pointers to objects, incurring overhead. NumPy stores contiguous homogeneous memory blocks in C, enabling blazing-fast **Vectorization** (executing element-wise math without explicit slow Python loops) and **Broadcasting** (arithmetic between arrays of different compatible shapes).

### Essential Operations:
- **Array Creation**: \`np.array()\`, \`np.zeros()\`, \`np.ones()\`, \`np.arange()\`, \`np.linspace()\`
- **Shape & Reshaping**: \`arr.shape\`, \`arr.reshape(rows, cols)\`
- **Vectorized Math**: \`arr * 2\`, \`arr1 + arr2\`, \`np.mean()\`, \`np.std()\`, \`np.dot()\`
- **Slicing & Boolean Masking**: \`arr[arr > 5]\``,
      codeSnippets: [
        {
          title: "NumPy Array Creation, Broadcasting & Vectorization",
          language: "python",
          code: `import numpy as np

# 1. Array creation & properties
data = [12, 18, 25, 30, 42, 55]
arr = np.array(data)

print("NumPy Array:", arr)
print(f"Shape: {arr.shape} | Data Type: {arr.dtype}")

# 2. Vectorized Operations (No loops required!)
scaled = arr * 1.5 + 10
print("Vectorized result:", scaled)

# 3. 2D Matrix reshaping & matrix multiplication
matrix_a = np.arange(1, 7).reshape(2, 3)
matrix_b = np.ones((3, 2))

print("Matrix A (2x3):\n", matrix_a)
print("Dot Product (2x2):\n", np.dot(matrix_a, matrix_b))

# 4. Boolean indexing / Filtering
evens = arr[arr % 2 == 0]
print("Filtered even numbers:", evens)
print(f"Mean: {arr.mean():.2f} | Std Dev: {arr.std():.2f}")`
        }
      ]
    },
    {
      id: "pandas-dataframes",
      title: "2. Tabular Data with Pandas (Series & DataFrames)",
      content: `**Pandas** provides intuitive, powerful data structures for structured/tabular data:
- **\`pd.Series\`**: A 1-dimensional labeled array.
- **\`pd.DataFrame\`**: A 2-dimensional spreadsheet-like table composed of ordered columns with labeled rows.

### Indexing and Selection:
- **\`.loc[row_label, col_label]\`**: Label-based indexing.
- **\`.iloc[row_idx, col_idx]\`**: Integer position-based indexing.
- **Boolean Filtering**: \`df[df['salary'] > 75000]\``,
      codeSnippets: [
        {
          title: "Pandas DataFrame Creation, Inspection & Indexing",
          language: "python",
          code: `import pandas as pd

# Creating a DataFrame from a dictionary
records = {
    "Employee": ["Aarav", "Neha", "Rohan", "Priya", "Vikram"],
    "Department": ["Engineering", "Product", "Engineering", "Design", "Product"],
    "Experience_Years": [4, 6, 2, 5, 8],
    "Salary": [82000, 95000, 60000, 78000, 115000]
}

df = pd.DataFrame(records)
print("--- Full DataFrame ---")
print(df)

# DataFrame Inspection
print("\n--- Summary Statistics ---")
print(df.describe())

# Selection with loc and iloc
print("\nFirst row via iloc[0]:\n", df.iloc[0])
print("\nEngineering Department records:")
eng_df = df[df["Department"] == "Engineering"]
print(eng_df[["Employee", "Salary"]])`
        }
      ]
    },
    {
      id: "data-wrangling-cleaning",
      title: "3. Data Cleaning, Transformation & GroupBy",
      content: `Real-world datasets are almost always messy, containing missing (\`NaN\`) values, inconsistent column names, or incorrect data types.

### Key Wrangling Steps:
1. **Detecting Missing Data**: \`df.isnull().sum()\`
2. **Handling Missing Values**:
   - Dropping records: \`df.dropna()\`
   - Imputing values: \`df.fillna(df['col'].median())\`
3. **Adding Computed Columns**: \`df['Bonus'] = df['Salary'] * 0.1\`
4. **Aggregation via \`groupby()\`**: The Split-Apply-Combine workflow to group by categorical variables and compute aggregations (\`mean\`, \`sum\`, \`count\`).`,
      codeSnippets: [
        {
          title: "Handling Missing Data and GroupBy Aggregations",
          language: "python",
          code: `import pandas as pd
import numpy as np

# Sample dataset with missing values
raw_data = {
    "City": ["Bangalore", "Mumbai", "Bangalore", "Delhi", "Mumbai", "Delhi"],
    "Store_Type": ["Supermarket", "Mall", "Supermarket", "Boutique", "Mall", "Mall"],
    "Sales_USD": [15400, np.nan, 18900, 9200, 24100, 13500],
    "Customer_Rating": [4.5, 4.2, np.nan, 3.9, 4.8, 4.1]
}

sales_df = pd.DataFrame(raw_data)
print("Missing values count:\n", sales_df.isnull().sum())

# Impute missing Sales with column median and Rating with column mean
sales_df["Sales_USD"] = sales_df["Sales_USD"].fillna(sales_df["Sales_USD"].median())
sales_df["Customer_Rating"] = sales_df["Customer_Rating"].fillna(sales_df["Customer_Rating"].mean().round(1))

print("\n--- Cleaned DataFrame ---")
print(sales_df)

# Split-Apply-Combine with GroupBy
dept_summary = sales_df.groupby("City").agg(
    Total_Sales=("Sales_USD", "sum"),
    Average_Rating=("Customer_Rating", "mean")
).reset_index()

print("\n--- Regional Sales Summary ---")
print(dept_summary)`
        }
      ]
    },
    {
      id: "data-visualization",
      title: "4. Visualization with Matplotlib & Seaborn",
      content: `Visualizing data helps identify patterns, outliers, correlations, and model performance.

- **Matplotlib**: Low-level, granular charting library for line plots, bar charts, scatter plots, and custom layouts.
- **Seaborn**: High-level statistical visualization library built on top of Matplotlib, with beautiful themes, automatic aggregation, and distribution plots (e.g. heatmaps, violin plots, box plots).`,
      codeSnippets: [
        {
          title: "Creating Charts with Matplotlib and Seaborn",
          language: "python",
          code: `import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

# Generate sample dataset
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
product_a_sales = [45, 52, 58, 63, 70, 85]
product_b_sales = [38, 41, 49, 53, 59, 68]

# 1. Matplotlib Line Plot
plt.figure(figsize=(8, 4))
plt.plot(months, product_a_sales, marker="o", color="#3b82f6", label="Product A", linewidth=2)
plt.plot(months, product_b_sales, marker="s", color="#10b981", label="Product B", linewidth=2, linestyle="--")

plt.title("Monthly Revenue Trajectory ($k)")
plt.xlabel("Month")
plt.ylabel("Revenue ($k)")
plt.legend()
plt.grid(True, linestyle=":", alpha=0.6)
plt.tight_layout()
# In a Jupyter notebook or script: plt.show()
print("Matplotlib figure configured successfully.")

# 2. Seaborn Correlation Matrix Heatmap
sample_df = pd.DataFrame({
    "Ad_Spend": [10, 20, 30, 40, 50],
    "Impressions": [100, 250, 320, 480, 620],
    "Conversions": [5, 12, 18, 29, 38]
})

corr = sample_df.corr()
print("\nCorrelation Matrix:\n", corr)

# sns.heatmap(corr, annot=True, cmap="coolwarm")
# plt.title("Feature Correlation Heatmap")`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "Python Data Analysis Pipeline Architecture",
      type: "flowchart",
      chart: `flowchart LR
    A[Raw Data Sources: CSV / Excel / SQL / JSON] --> B[Pandas Ingestion: read_csv / read_sql]
    B --> C[Data Cleaning: Missing NaN, Outliers, Types]
    C --> D[NumPy Vectorized Calculations & Feature Engineering]
    D --> E[GroupBy Aggregation & Metric Summaries]
    E --> F[Visual Storytelling: Matplotlib & Seaborn Charts]
    F --> G[Machine Learning / Business Intelligence]
    
    style B fill:#1e293b,stroke:#3b82f6,color:#fff
    style C fill:#1e293b,stroke:#f59e0b,color:#fff
    style D fill:#1e293b,stroke:#10b981,color:#fff
    style F fill:#1e293b,stroke:#8b5cf6,color:#fff`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "Why are NumPy array computations drastically faster than iterating through standard Python lists?",
      options: [
        "NumPy uses multithreaded cloud servers for every operation",
        "NumPy stores homogeneous data in contiguous C memory blocks and executes vectorized operations without Python interpreter overhead",
        "Python lists always compress data into zip files before reading",
        "NumPy converts all numbers into strings"
      ],
      answer: 1,
      explanation: "NumPy achieves orders-of-magnitude speedups by storing data contiguously in memory and utilizing low-level compiled C routines (SIMD vectorization) that eliminate per-element Python type-checking loops."
    },
    {
      id: "q2",
      question: "In Pandas, what is the key difference between `.loc[]` and `.iloc[]`?",
      options: [
        "`.loc` is label-based indexing, whereas `.iloc` is integer position-based indexing",
        "`.loc` can only read integers, and `.iloc` can only read strings",
        "`.loc` deletes rows, while `.iloc` updates columns",
        "There is no difference; they are exact aliases of each other"
      ],
      answer: 0,
      explanation: "`.loc[]` indexes by explicit index/column labels, while `.iloc[]` indexes by zero-based integer positional coordinates."
    },
    {
      id: "q3",
      question: "Which Pandas method follows the 'Split-Apply-Combine' paradigm to calculate aggregate statistics across categories?",
      options: [
        "df.combine()",
        "df.split()",
        "df.groupby()",
        "df.transform_all()"
      ],
      answer: 2,
      explanation: "`df.groupby('column').agg(...)` splits the dataset into groups, applies aggregation functions (such as sum, mean, or count), and combines the results into a unified summary DataFrame."
    }
  ]
};
