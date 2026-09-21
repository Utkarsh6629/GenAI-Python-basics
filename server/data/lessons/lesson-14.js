export const lesson14 = {
  id: 14,
  number: "14",
  title: "14-Streamlit",
  category: "Web & AI Track",
  description: "Build interactive Data Science, Machine Learning, and GenAI Web Applications purely in Python: Reactive Execution Model, UI Widgets, File Uploaders, and Real-Time ML Dashboards.",
  duration: "45 mins",
  difficulty: "Intermediate",
  status: "available",
  summary: "Streamlit transforms Python data scripts into shareable web applications in minutes without writing HTML, CSS, or JavaScript. It has become the primary prototyping standard in AI, Data Science, and LLM engineering. This lesson explores the reactive rerun architecture, input widgets (sliders, text inputs, dropdowns, file uploaders), layout structuring (sidebars and columns), and building interactive ML predictor dashboards.",
  sections: [
    {
      id: "streamlit-architecture-basics",
      title: "1. Streamlit Reactive Execution Architecture",
      content: `### How Streamlit Works
Unlike traditional web frameworks (where you manage event listeners, DOM state, and callbacks), Streamlit operates on a **Reactive Rerun Execution Model**:
- When a user interacts with a widget (e.g. adjusts a slider or types in a text box), Streamlit **reruns the entire Python script from top to bottom**.
- Streamlit caches heavy data operations using **\`@st.cache_data\`** so re-runs remain instantaneous.
- Primitives like **\`st.title()\`**, **\`st.header()\`**, **\`st.write()\`**, and **\`st.metric()\`** render styled UI elements automatically.`,
      codeSnippets: [
        {
          title: "Core Streamlit App Primitives & State",
          language: "python",
          code: `import streamlit as st
import pandas as pd
import numpy as np

# Application Titles & Hero Content
st.title("🚀 AI & Data Science Web Dashboard")
st.header("Real-Time Python Analytics")
st.markdown("""
Streamlit lets you turn **data analysis scripts** into interactive applications without frontend code.
""")

# Rendering Metrics
col1, col2, col3 = st.columns(3)
col1.metric("Active Models", "12", "+2")
col2.metric("Inference Latency", "42ms", "-8ms")
col3.metric("System Uptime", "99.98%", "Stable")

# Rendering DataFrames directly
df = pd.DataFrame({
    "Category": ["NLP", "Computer Vision", "Audio", "Generative AI"],
    "Deployments": [45, 30, 18, 62],
    "Accuracy": [0.94, 0.91, 0.88, 0.97]
})

st.subheader("Model Deployment Summary")
st.dataframe(df, use_container_width=True)`
        }
      ]
    },
    {
      id: "interactive-widgets",
      title: "2. Interactive Widgets & User Input Handling",
      content: `Streamlit widgets seamlessly capture user inputs and return standard Python data types:
- **\`st.text_input(label)\`**: Returns input string.
- **\`st.slider(label, min, max, default)\`**: Returns int or float.
- **\`st.selectbox(label, options)\`**: Returns selected option.
- **\`st.multiselect(label, options)\`**: Returns list of selected options.
- **\`st.checkbox(label)\`**: Returns boolean.
- **\`st.button(label)\`**: Returns \`True\` on the rerun triggered by click.`,
      codeSnippets: [
        {
          title: "Comprehensive Widget Showcase",
          language: "python",
          code: `import streamlit as st

st.title("Interactive Configuration Playground")

# User inputs
user_name = st.text_input("Enter your name:", value="Utkarsh")
user_age = st.slider("Select your experience (years):", min_value=0, max_value=40, value=5)

frameworks = ["PyTorch", "TensorFlow", "Scikit-Learn", "HuggingFace", "LangChain"]
favorite = st.selectbox("Preferred AI Framework:", frameworks)

selected_tools = st.multiselect("Active Tooling:", ["Docker", "Kubernetes", "Git", "FastAPI"], default=["Git", "Docker"])

# Reactive Conditional Output
if st.button("Generate Developer Profile"):
    st.success(f"Profile generated for **{user_name}**!")
    st.info(f"- Experience: {user_age} years\\n- Primary Framework: {favorite}\\n- Toolstack: {', '.join(selected_tools)}")`
        }
      ]
    },
    {
      id: "file-uploads-and-charts",
      title: "3. CSV File Uploading & Interactive Charts",
      content: `Streamlit makes reading datasets from user machines effortless with **\`st.file_uploader()\`**.

### Native Charting:
- **\`st.line_chart(df)\`**: Renders responsive line charts.
- **\`st.bar_chart(df)\`**: Renders interactive bar charts.
- **\`st.pyplot(fig)\`**: Embeds any custom Matplotlib/Seaborn visualization.`,
      codeSnippets: [
        {
          title: "Dynamic CSV Uploader and Charting Pipeline",
          language: "python",
          code: `import streamlit as st
import pandas as pd
import numpy as np

st.subheader("📁 CSV Dataset Visualizer")

uploaded_file = st.file_uploader("Upload a CSV file for instant analysis", type=["csv"])

if uploaded_file is not None:
    # Read the uploaded byte stream into pandas
    df = pd.read_csv(uploaded_file)
    st.write("### Dataset Preview", df.head(10))
    st.write(f"Shape: {df.shape[0]} rows, {df.shape[1]} columns")
    
    # Auto-plot numeric columns
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    if numeric_cols:
        selected_col = st.selectbox("Select numeric feature to chart:", numeric_cols)
        st.line_chart(df[selected_col])
else:
    # Demonstration fallback data
    st.info("No file uploaded yet. Showing synthetic timeseries trend:")
    synthetic_data = pd.DataFrame(
        np.random.randn(20, 3),
        columns=["API Latency (ms)", "CPU Usage (%)", "RAM Usage (%)"]
    )
    st.line_chart(synthetic_data)`
        }
      ]
    },
    {
      id: "ml-dashboard-prototype",
      title: "4. Prototyping an Interactive ML Predictor",
      content: `In production AI workflows, engineers deploy Streamlit apps to allow non-technical stakeholders, clinical researchers, or product managers to test trained Machine Learning models via interactive sliders.

### UI Structuring:
- **\`st.sidebar\`**: Houses input controls and configuration parameters cleanly in a collapsible left sidebar.
- **\`st.columns()\`**: Splits the canvas into responsive side-by-side grids.`,
      codeSnippets: [
        {
          title: "Interactive ML Iris Classifier Dashboard",
          language: "python",
          code: `import streamlit as st
import numpy as np
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier

# Configure App Title and Layout
st.set_page_config(page_title="Iris AI Classifier", layout="wide")
st.title("🌸 Interactive Machine Learning Classifier")

# Cache model training so it only executes once
@st.cache_resource
def train_model():
    iris = load_iris()
    model = RandomForestClassifier(n_estimators=50, random_state=42)
    model.fit(iris.data, iris.target)
    return model, iris.target_names, iris.feature_names

model, target_names, feature_names = train_model()

# Sidebar Input Sliders
st.sidebar.header("Input Feature Measurements (cm)")
sepal_length = st.sidebar.slider("Sepal Length", 4.0, 8.0, 5.4, 0.1)
sepal_width = st.sidebar.slider("Sepal Width", 2.0, 4.5, 3.4, 0.1)
petal_length = st.sidebar.slider("Petal Length", 1.0, 7.0, 1.5, 0.1)
petal_width = st.sidebar.slider("Petal Width", 0.1, 2.5, 0.2, 0.1)

# Model Inference
user_input = np.array([[sepal_length, sepal_width, petal_length, petal_width]])
prediction = model.predict(user_input)[0]
probabilities = model.predict_proba(user_input)[0]

# Display Results
col1, col2 = st.columns(2)

with col1:
    st.subheader("Model Prediction")
    predicted_species = target_names[prediction].capitalize()
    st.success(f"Predicted Class: **{predicted_species}**")
    st.metric("Confidence", f"{probabilities[prediction]*100:.1f}%")

with col2:
    st.subheader("Prediction Probabilities")
    prob_df = {name.capitalize(): f"{prob*100:.1f}%" for name, prob in zip(target_names, probabilities)}
    st.json(prob_df)`
        }
      ]
    }
  ],
  diagrams: [
    {
      title: "Streamlit Reactive Execution Model",
      type: "flowchart",
      chart: `flowchart TD
    A[User Adjusts Widget: Slider / Selectbox] --> B[Browser Sends Event to Streamlit Server]
    B --> C[Streamlit Triggers Full Script Rerun Top-to-Bottom]
    C --> D{@st.cache_data / cache_resource?}
    D -->|Cached| E[Reuse Memory Cache Instantly]
    D -->|Uncached| F[Execute Code / Train Model / Load File]
    E --> G[Generate Updated UI Virtual DOM]
    F --> G
    G --> H[Streamlit Client Updates Browser Elements Dynamically]`
    }
  ],
  quizzes: [
    {
      id: "q1",
      question: "What happens in a Streamlit application whenever a user changes a widget value (such as sliding a slider)?",
      options: [
        "Nothing happens until the user presses an explicit HTML submit button",
        "Streamlit reruns the entire Python script from top to bottom with the updated widget state",
        "The web browser reloads the entire HTML page from scratch",
        "The Python process crashes and restarts"
      ],
      answer: 1,
      explanation: "Streamlit's reactive model automatically re-executes the Python script from top to bottom whenever any widget value changes, recomputing downstream values dynamically."
    },
    {
      id: "q2",
      question: "Which decorator should you use to prevent computationally expensive operations (like model training or large SQL queries) from rerunning on every user interaction?",
      options: [
        "@st.freeze",
        "@st.cache_data or @st.cache_resource",
        "@st.persist",
        "@st.no_rerun"
      ],
      answer: 1,
      explanation: "`@st.cache_data` (for serializable data like DataFrames) and `@st.cache_resource` (for global objects like ML models or DB connections) cache expensive function outputs across reruns."
    },
    {
      id: "q3",
      question: "How do you place input widgets into a dedicated, collapsible left sidebar in Streamlit?",
      options: [
        "By applying CSS class `style='float: left'`",
        "By prefixing the widget call with `st.sidebar.` (e.g. `st.sidebar.slider(...)`)",
        "By placing widgets inside an HTML `<aside>` tag",
        "Streamlit does not support sidebars"
      ],
      answer: 1,
      explanation: "Prefixing UI methods with `st.sidebar.` (e.g. `st.sidebar.selectbox()`, `st.sidebar.text_input()`) pins those widgets directly into the collapsible left sidebar."
    }
  ]
};
